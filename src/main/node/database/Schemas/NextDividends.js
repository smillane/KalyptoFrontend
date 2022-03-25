import mongoose from 'mongoose';
const { Schema } = mongoose;

const stockNextDividendsSchema = new Schema({
    symbol: String,
    nextUpdate: Number,
    lastUpdated: Number,
    docs: Object
});

export default mongoose.model('stockNextDividendsModel') || mongoose.model('stockNextDividendsModel', stockNextDividendsSchema);