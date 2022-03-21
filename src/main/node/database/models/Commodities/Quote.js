import mongoose from 'mongoose';
const { Schema } = mongoose;

const commodityQuote = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
})