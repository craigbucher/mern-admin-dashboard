import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();
console.log("🚀 ~ file: database.js:6 ~ connectDB ~ process.env.MONGO_URL", process.env.MONGO_URL)

// establish connection to Mongo database:
const connectDB = async () => {
  mongoose.set('strictQuery', true);  // needed to suppress deprication warning
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

export default connectDB