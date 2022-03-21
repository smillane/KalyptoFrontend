import mongoose from 'mongoose';
const { Schema } = mongoose;

const stockLargestTrades = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
});

function stockLargestTradesModel() { mongoose.models.StockLargestTradesModel || mongoose.model('StockLargestTradesModel', stockLargestTrades) }
