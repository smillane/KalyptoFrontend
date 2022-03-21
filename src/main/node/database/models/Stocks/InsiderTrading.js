import mongoose from 'mongoose';
const { Schema } = mongoose;

const stockInsiderTrading = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Array
});

function stockInsiderTradingModel() { mongoose.models.StockInsiderTradingModel || mongoose.model('StockInsiderTradingModel', stockInsiderTrading) }