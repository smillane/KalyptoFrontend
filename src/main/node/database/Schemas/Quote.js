import mongoose from 'mongoose';
const { Schema } = mongoose;

// STOCKS
const StockQuoteSchema = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
});

export default StockQuoteSchema;