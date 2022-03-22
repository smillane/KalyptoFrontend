import mongoose from 'mongoose';
const { Schema } = mongoose;

const commodityQuote = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
})

export default mongoose.model('CommodityQuoteModel') || mongoose.model('CommodityQuoteModel', commodityQuote);