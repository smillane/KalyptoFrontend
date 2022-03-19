const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${MONGO_URI}`);
      console.log(`MongoDB connect: ${conn.connection.host}`);
  } catch (err) {
    console.err(err);
    process.exit(1);
  }
}

export default connectDB