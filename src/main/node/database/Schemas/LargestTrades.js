import mongoose from 'mongoose';
const { Schema } = mongoose;

const stockLargestTradesSchema = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
});

export default mongoose.model('stockLargestTradesModel') || mongoose.model('stockLargestTradesModel', stockLargestTradesSchema);