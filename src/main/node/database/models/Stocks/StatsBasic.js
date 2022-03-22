import mongoose from 'mongoose';
const { Schema } = mongoose;

const stockStatsBasic = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
});

export default mongoose.model('StockStatsBasicModel') || mongoose.model('StockStatsBasicModel', stockStatsBasic);