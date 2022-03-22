import mongoose from 'mongoose';
const { Schema } = mongoose;

const treasuryQuote = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
})

export default mongoose.model('TreasuryQuoteModel') || mongoose.model('TreasuryQuoteModel', treasuryQuote);