import mongoose from 'mongoose';
const { Schema } = mongoose;

const stockInsiderTrading = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Array
});

export default mongoose.model('StockInsiderTradingModel') || mongoose.model('StockInsiderTradingModel', stockInsiderTrading);