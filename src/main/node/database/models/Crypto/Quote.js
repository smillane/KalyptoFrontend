import mongoose from 'mongoose';
const { Schema } = mongoose;

const cryptoQuote = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
})