import mongoose from 'mongoose';
const { Schema } = mongoose;

const stockLargestTradesSchema = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
});

export default stockLargestTradesSchema;