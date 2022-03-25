import mongoose from 'mongoose';
const { Schema } = mongoose;

const stockStatsBasicSchema = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
});

export default stockStatsBasicSchema;