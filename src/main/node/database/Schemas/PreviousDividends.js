import mongoose from 'mongoose';
const { Schema } = mongoose;

const stockPreviousDividendSchema = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Array
});

export default stockPreviousDividendSchema;