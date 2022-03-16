import mongoose from 'mongoose';
const { Schema } = mongoose;

// STOCKS
const stockQuote = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
})

export const stockQuoteModel = mongoose.model('stockQuote', stockQuote)

const stockStatsBasic = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
})

export const stockStatsBasicModel = mongoose.model('stockStatsBasic', stockStatsBasic)

const stockLargestTrades = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
})

export const stockLargestTradesModel = mongoose.model('stockLargestTrades', stockLargestTrades)

const stockInsiderTrading = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Array
})

export const stockInsiderTradingModel = mongoose.model('stockInsiderTrading', stockInsiderTrading)

const stockPreviousDividends = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Array
})

export const stockPreviousDividendsModel = mongoose.model('stockPreviousDividends', stockPreviousDividends)

const stockNextDividends = new Schema({
    symbol: String,
    nextUpdate: Number,
    lastUpdated: Number,
    docs: Object
})

export const stockNextDividendsModel = mongoose.model('stockNextDividends', stockNextDividends)



// UPCOMING IPOs
const upcomingIPOs = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
})



// CRYPTO
const cryptoQuote = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
})



// TREASURIES
const treasuryQuote = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
})



// COMMODITIES
const commodityQuote = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
})



// USER
const User = new Schema({
    username: String,
    uuid: String,
    userLists: { type: Map, of: Array }
})