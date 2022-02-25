import { mongoose } from "mongoose";

// for queries that will be updated every 5 minutes
export function updateAndReplace(symbol, query, basicQuote) {
  if (basicQuote) {
    const startUpdatePeriod = "7:00";
    const endtUpdatePeriod = "20:00";
  }

  if (!basicQuote) {
    const startUpdatePeriod = "9:30";
    const endtUpdatePeriod = "16:00";
  }

  const Model = CreateMongooseModel(query);

  if (!dbQueryExistsCheck(symbol, query, Model)) {
    returnNotFound();
  }

  const docsFromDb = getDocsFromDb(symbol, Model);

  if (!lastUpdateQuery(docsFromDb, startUpdatePeriod, endtUpdatePeriod)) {
    return docsFromDb.docs;
  }

  const docsFromAPI = apiQuery(query, symbol).data;
  updateDocsInDB(docsFromAPI, query, symbol, Date.now());
  return docsFromAPI.body;
}

// for queries that will be updated and added to previous docs
export function updateAndAdd(symbol, query, nextSymbol, nextQuery) {
  const Model = CreateMongooseModel(query);

  if (!dbQueryExistsCheck(symbol, query, Model)) {
    returnNotFound();
  }

  const docsFromDb = getDocsFromDb(symbol, Model);

  updateNext(symbol, query, docsFromDb, nextSymbol, nextQuery);
}

// for functions that will not directly be updated, such as dividends
export function findAndReturn(symbol, query) {
  const Model = CreateMongooseModel(query);

  if (!dbQueryExistsCheck(symbol, query, Model)) {
    returnNotFound();
  }

  return getDocsFromDb(symbol, Model).docs;
}



//create mongoose model for queries,updates, etc
function CreateMongooseModel(query) {
  return mongoose.model(query, `${query}Schema`);
}

function getDocsFromDb(symbol, model) {
  return model.find({ symbol: symbol });
}

// check if query is in db, if it's not, check API, if doesn't exist, return 404, symbol is not supported
function dbQueryExistsCheck(symbol, query, model) {
  if (!model.exists({ 'symbol': symbol }).exec()) {
    console.log(symbol)
    apiStatusCheck(apiQuery(query, symbol).statusCode);
  }
  return true;
}

// update db docs
async function updateDocsInDB(docs, query, symbol, inputTime) {
  const queryModel = CreateMongooseModel(query);
  const res = await queryModel.updateOne({ symbol: symbol }, { lastUpdated: inputTime, docs: docs }, { upsert: true });
  console.log(res.acknowledged);
  console.log(res.upsertedId);
}

// add db docs
async function addDocsInDB(docs, query, symbol, inputTime) {
  const queryModel = CreateMongooseModel(query);
  console.log(res.acknowledged);
  console.log(res.upsertedId);
}

// checking to see when db was last updated for certain information
// if it's been updated between Friday 4:06pm and Monday 9:29AM, don't do anything 
// if it's after M/T/W/R 4:06PM and has been updated, don't do anything
// if it's before T/W/R/F 9:30AM and has been updated, don't do anything
// otherwise, if it's been more than 5 minutes since it's been updated, call api, update db, return data
function updatedLessThanFiveMinutesCheck(dbQueryResponse) {
  const lastUpdatedToNow = differenceInSeconds(formatDistanceToNowStrict(dbQueryResponse.lastUpdated, { includeSeconds: true, addSuffix: true }))
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
  const lastUpdatedUnixTime = fromUnixTime(docs.lastUpdated);

  if (lastUpdatedUnixTime.indexOf('Sat') || lastUpdatedUnixTime.indexOf('Sun')) {
    return false;
  }

  if (lastUpdatedUnixTime.indexOf('Mon') || lastUpdatedUnixTime.indexOf('Tues') || lastUpdatedUnixTime.indexOf('Wed') || lastUpdatedUnixTime.indexOf('Thurs') || lastUpdatedUnixTime.indexOf('Fri')) {
    if (endtUpdatePeriod >= docs.lastUpdated.getHours() >= startUpdatePeriod) {
      return false;
    }
    updatedLessThanFiveMinutesCheck(docs.lastUpdated);
  }
  return true;
}

// checking to see if data to be periodically (monthly/quartly/yearly... etc...) needs to be updated. 
// Input will be string from db doc that has been parsed
// change variable names to something along the lines off, addNewDocToStack
function updateNext(symbol, query, docs, nextSymbol, nextQuery) {
  const inputUnixTime = fromUnixTime(docs.nextUpdate);
  const formatedLastUpdateCheck = parseInt(formatDistanceToNowStrict(docs.lastUpdated.getHours(), {unit: 'hour'}.split(" ")))
  if (isPast(inputUnixTime) && formatedLastUpdateCheck > 24) {
    addDocsInDB(docs, nextQuery, nextSymbol);
    const docsFromAPI = apiQuery(query, symbol).data;
    updateDocsInDB(docsFromAPI, query, symbol, Date.now());
    return docsFromAPI.body;
  }
  return docs.docs;
}



// query api, and return data
function apiQuery(query, symbol) {
  return fetch(query(symbol));
}
  
// res.headers('HTTP/2') or res.statusCode
// unsure on the .statusCode for nextjs
// check api status, if it's not between 200 and 209, return notFound: true, which sends a 404 page
// look into customizing this later for response
// add logging for header response to see on backend
function apiStatusCheck(statusCode) {
  if (statusCode >= 300 || statusCode < 200) {
    console.log(statusCode);
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