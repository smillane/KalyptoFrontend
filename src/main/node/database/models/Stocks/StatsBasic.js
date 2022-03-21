import mongoose from 'mongoose';
const { Schema } = mongoose;

const stockStatsBasic = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
});

function stockStatsBasicModel() { mongoose.models.StockStatsBasicModel || mongoose.model('StockStatsBasicModel', stockStatsBasic) }
