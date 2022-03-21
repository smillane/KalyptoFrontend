import mongoose from 'mongoose';
const { Schema } = mongoose;

const treasuryQuote = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
})