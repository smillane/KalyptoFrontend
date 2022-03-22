import mongoose from 'mongoose';
const { Schema } = mongoose;

const upcomingIPOs = new Schema({
    symbol: String,
    lastUpdated: Number,
    docs: Object
})

export default mongoose.model('UpcomingIPOs') || mongoose.model('UpcomingIPOs', upcomingIPOs);