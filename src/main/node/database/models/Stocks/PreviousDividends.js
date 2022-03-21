import mongoose from 'mongoose';
const { Schema } = mongoose;

const stockPreviousDividends = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Array
});


function stockPreviousDividendsModel() { mongoose.models.StockPreviousDividendsModel || mongoose.model('StockPreviousDividendsModel', stockPreviousDividends) }