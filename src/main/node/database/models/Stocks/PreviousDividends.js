import mongoose from 'mongoose';
const { Schema } = mongoose;

const stockPreviousDividends = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Array
});


export default mongoose.model('StockPreviousDividendsModel') || mongoose.model('StockPreviousDividendsModel', stockPreviousDividends);