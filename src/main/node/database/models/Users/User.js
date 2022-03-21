import mongoose from 'mongoose';
const { Schema } = mongoose;

const User = new Schema({
    username: String,
    uuid: String,
    userLists: { type: Map, of: Array }
})