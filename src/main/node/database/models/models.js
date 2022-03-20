import mongoose from 'mongoose';
const { Schema } = mongoose;

// STOCKS
const stockQuoteSchema = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
});

const stockQuote = mongoose.models.stockQuoteModel || mongoose.model('stockQuoteModel', stockQuoteSchema);
export function stockQuoteModel() { return mongoose.models.stockQuoteModel || mongoose.model('stockQuoteModel', stockQuoteSchema) }

const stockStatsBasic = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
});

export function stockStatsBasicModel() { mongoose.models.stockStatsBasicModel || mongoose.model('stockStatsBasicModel', stockStatsBasic); }

const stockLargestTrades = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
});

export function stockLargestTradesModel() { mongoose.models.stockLargestTradesModel || mongoose.model('stockLargestTradesModel', stockLargestTrades); }

const stockInsiderTrading = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Array
});

export function stockInsiderTradingModel() { mongoose.models.stockInsiderTradingModel || mongoose.model('stockInsiderTradingModel', stockInsiderTrading); }

const stockPreviousDividends = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Array
});


export function stockPreviousDividendsModel() { mongoose.models.stockPreviousDividendsModel || mongoose.model('stockPreviousDividendsModel', stockPreviousDividends); }

const stockNextDividends = new Schema({
    symbol: String,
    nextUpdate: Number,
    lastUpdated: Number,
    docs: Object
});

export function stockNextDividendsModel() { mongoose.models.stockNextDividendsModel || mongoose.model('stockNextDividendsModel', stockNextDividends); }

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