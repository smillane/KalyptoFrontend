import mongoose from 'mongoose';
const { Schema } = mongoose;

const stockInsiderTradingSchema = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Array
});

export default stockInsiderTradingSchema;