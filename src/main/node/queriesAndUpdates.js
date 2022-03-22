import { differenceInSeconds, formatDistanceToNowStrict, fromUnixTime, isPast } from 'date-fns';

import { stockQuote, lastTenStockInsiderTrading } from '../../pages/api/iex/IEXQueries';
import StockQuoteModel from './database/models/Stocks/Quote';
import StockInsiderTradingModel from './database/models/Stocks/InsiderTrading';

// query to check if symbol exists and there is an API endpoint for it, if there is, will return data and update the db
// other queries will then run afterwards, logic will be done on [stock] page
// check if query is in db, if it's not, check API, if doesn't exist, return 404, symbol is not supported
// if stock exists, will then call lastTenStockInsiderTrading, and save api data to db
export async function queryExistsCheck(symbol) {
  const ModelSearch = await StockQuoteModel.exists({ symbol: symbol });
  if (ModelSearch) {
    return true
  }
  if (!ModelSearch) {
    console.log(symbol);
    const stockQuoteData = await apiQuery(stockQuote, symbol);
    console.log(stockQuoteData.status);
    if (!apiStatusCheck(stockQuoteData.status)) {
      return false;
    }
    const stockQuoteJson = await stockQuoteData.json();
    saveDocsInDB(stockQuoteJson, symbol, Date.now(), StockQuoteModel);
    const lastTenStockInsiderTradingAPICall = await apiQuery(lastTenStockInsiderTrading, symbol);
    const lastTenJson = await lastTenStockInsiderTradingAPICall.json()
    saveDocsInDB(lastTenJson, symbol, Date.now(), StockInsiderTradingModel);
    console.log(stockQuoteJson.symbol);
    return stockQuoteJson;
  }
  return false;
}

async function firstRunSaveAndQuery(symbol) {

}


// for queries that will be updated every 5 minutes
export async function updateAndReplace(symbol, query, model, basicQuoteBool, onceDailyBool) {
  const modelSearch = await model.exists({ symbol: symbol });
  if (!modelSearch) {
    const docsFromAPI = apiQueryBody(query, symbol);
    updateDocsInDB(docsFromAPI, symbol, Date.now(), model);
    return docsFromAPI;
  }

  const docsFromDb = getDocsFromDb(symbol, model);

  if (onceDailyBool) {
    updateOnceADayQuery(docsFromDb, symbol, query, model);
  }

  if (basicQuoteBool) {
    const startUpdatePeriod = "7:00";
    const endtUpdatePeriod = "20:00";  

    if (!lastUpdateQuery(docsFromDb, startUpdatePeriod, endtUpdatePeriod)) {
      return docsFromDb.docs;
    }
  }

  if (!basicQuoteBool) {
    const startUpdatePeriod = "9:30";
    const endtUpdatePeriod = "16:00";  

    if (!lastUpdateQuery(docsFromDb, startUpdatePeriod, endtUpdatePeriod)) {
      return docsFromDb.docs;
    }
  }

  const docsFromAPI = apiQueryBody(query, symbol);
  updateDocsInDB(docsFromAPI, symbol, Date.now(), model);
  return docsFromAPI;
}

// for queries that will be updated and added to previous docs
export async function updateOnIntervalsAndAdd(symbol, query, model, nextQuery) {
  const modelSearch = await model.exists({ symbol: symbol });
  if (!modelSearch) {
    const docsFromAPI = apiQueryBody(query, symbol);
    updateDocsInDB(docsFromAPI, symbol, Date.now(), model);
    return docsFromAPI;
  }
  const docsFromDb = getDocsFromDb(symbol, model);
  updateNext(symbol, query, docsFromDb, nextQuery, model);
}

// for functions that will not directly be updated, such as dividends
export async function findAndReturn(symbol, query, model) {
  const modelSearch = await model.exists({ symbol: symbol });
  if (!modelSearch) {
    const docsFromApi = apiQueryBody(query, symbol);
    updateDocsInDB(docsFromApi, symbol, Date.now(), model);
    return docsFromApi;
  }
  return getDocsFromDb(symbol, model).docs;
}

function getDocsFromDb(symbol, model) {
  return model.find({ symbol: symbol });
}

// create db docs
async function saveDocsInDB(docs, symbol, inputTime, model) {
  await model.create({ symbol: symbol, lastUpdated: inputTime, docs: docs });
}

// update db docs
async function updateDocsInDB(docs, symbol, inputTime, model) {
  const res = await model.updateOne({ symbol: symbol, lastUpdated: inputTime, docs: docs }, { upsert: true });
  console.log(res.acknowledged);
  console.log(res.upsertedId);
}

async function updateListInDB(symbol, query, lastUpdated, model) {
  // ?from={CURRENT DATE}}&limit=(probably 10 or 15?, can adjust based off API usage, 
  // don't want too small, but don't want too big incase it hasn't been updated in a while)
  const docsFromAPI = apiQueryBody(query, symbol, lastUpdated);
  const res = await model.updateOne({ symbol: symbol }, { lastUpdated: Date.now(), $push: { docs: docsFromAPI } });
  console.log(res.acknowledged);
  console.log(res.upsertedId);
  return getDocsFromDb(symbol, model);
}

// add docs to array in db
// maybe use addToSet?
// The $addToSet operator adds a value to an array unless the value is already present, in which case $addToSet does nothing to that array.
async function addDocsInDB(docs, symbol, inputTime, model) {
  const res = await model.updateOne({ symbol: symbol }, { lastUpdated: inputTime, $push: { docs: docs } } )
  console.log(res.acknowledged);
  console.log(res.upsertedId);
}

// checking to see when db was last updated for certain information
// if it's been updated between Friday 4:06pm and Monday 9:29AM, don't do anything 
// if it's after M/T/W/R 4:06PM and has been updated, don't do anything
// if it's before T/W/R/F 9:30AM and has been updated, don't do anything
// otherwise, if it's been more than 5 minutes since it's been updated, call api, update db, return data
function updatedLessThanFiveMinutesCheck(dbLastUpdated) {
  const lastUpdatedToNow = differenceInSeconds(formatDistanceToNowStrict(dbLastUpdated.lastUpdated, { includeSeconds: true, addSuffix: true }))
  if (lastUpdatedToNow <= 300) {
    return false;
  }
  return true;
}
    
// need to do a check for basic quote, which will update max of every 5 mins, til 8pm, and other queries which will stop updating at 4:06pm
// endUpdatePeriod = 8pm for basicQuote Mon-Thurs or 4:05pm for the rest of stock info
// startUpdatePeriod = 7am for basicQuote, or 9:30 for rest of stock info, commodities, and treasuries
// crypto will update every 5 mins
function lastUpdateQuery(docs, startUpdatePeriod, endtUpdatePeriod) {  
  const formattedLastUpdated = fromUnixTime(docs.lastUpdated);
  const weekends = ['Sat', 'Sun']
  if (weekends.includes(formattedLastUpdated)) {
    return false;
  }

  const weekdays = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri']
  if (weekdays.includes(formattedLastUpdated)) {
    if (endtUpdatePeriod >= docs.lastUpdated.getHours() >= startUpdatePeriod) {
      return false;
    }
    updatedLessThanFiveMinutesCheck(docs.lastUpdated);
  }
  return true;
}
    
// need to do a check for basic quote, which will update max of every 5 mins, til 8pm, and other queries which will stop updating at 4:06pm
// endUpdatePeriod = 8pm for basicQuote Mon-Thurs or 4:05pm for the rest of stock info
// startUpdatePeriod = 7am for basicQuote, or 9:30 for rest of stock info, commodities, and treasuries
// crypto will update every 5 mins
function updateOnceADayQuery(docsFromDb, symbol, query, model) {  
  const formattedLastUpdated = fromUnixTime(docsFromDb.lastUpdated);
  const formattedLastUpdateInHours = parseInt(formatDistanceToNowStrict(docsFromDb.lastUpdated, {unit: 'hour'}).split(" ")[0]);
  
  if (formattedLastUpdateInHours > 12){
    const weekends = ['Sat', 'Sun']
    if (weekends.includes(formattedLastUpdated)) {
      return docsFromDb.docs;
    }

    const weekdays = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri']
    if (weekdays.includes(formattedLastUpdated)) {
      updateListInDB(symbol, query, formattedLastUpdated, model);
    }
  }
  return docsFromDb.docs;
}

// checking to see if data to be periodically (monthly/quartly/yearly... etc...) needs to be updated. 
// Input will be string from db doc that has been parsed
// change variable names to something along the lines off, addNewDocToStack
// EXAMPLE
// will add nextDividend to previousDividends, once date passes and there is a new nextDividend
// will then query the new nextDividend, and update nextDividend endpoint in db
function updateNext(symbol, query, docs, listOfPreviousQuery, model) {
  const formattedLastUpdateInHours = parseInt(formatDistanceToNowStrict(docs.lastUpdated, {unit: 'hour'}).split(" ")[0])

  if (isPast(docs.lastUpdated) && formattedLastUpdateInHours > 24) {
    const currentTime = Date.now()
    addDocsInDB(docs, listOfPreviousQuery, symbol, currentTime, model);
    const docsFromAPI = apiQueryBody(query, symbol);
    updateDocsInDB(docsFromAPI, symbol, currentTime, model);
    return docsFromAPI.body;
  }
  return docs.docs;
}

async function apiQuery(query, symbol, lastUpdated) {
  return await fetch(query(symbol, lastUpdated));
}
  
// res.headers('HTTP/2') or res.statusCode
// unsure on the .statusCode for nextjs
// check api status, if it's not between 200 and 299, return notFound: true, which sends a 404 page
// look into customizing this later for response
// add logging for header response to see on backend
function apiStatusCheck(apiStatus) {
  if (apiStatus >= 300 || apiStatus < 200) {
    console.log(apiStatus);
    return false;
  }
  return true;
}



// return notFound: true to return a 404 error page
function returnNotFound() {
  return {
    notFound: true
  }
}