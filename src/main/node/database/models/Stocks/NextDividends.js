import mongoose from 'mongoose';
const { Schema } = mongoose;

const stockNextDividends = new Schema({
    symbol: String,
    nextUpdate: Number,
    lastUpdated: Number,
    docs: Object
});

function stockNextDividendsModel() { mongoose.models.StockNextDividendsModel || mongoose.model('stockNextDividendsModel', stockNextDividends) }