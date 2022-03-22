import mongoose from 'mongoose';
const { Schema } = mongoose;

const stockNextDividends = new Schema({
    symbol: String,
    nextUpdate: Number,
    lastUpdated: Number,
    docs: Object
});

export default mongoose.model('StockNextDividendsModel') || mongoose.model('StockNextDividendsModel', stockNextDividends);