import mongoose from 'mongoose';
const { Schema } = mongoose;

const stockLargestTrades = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
});

export default mongoose.model('StockLargestTradesModel') || mongoose.model('StockLargestTradesModel', stockLargestTrades);