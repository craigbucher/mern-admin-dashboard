import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId: String,
    cost: String,   // would probably be number in real-world app
    products: {
      type: [mongoose.Types.ObjectId],  // mongoose generates ID?????
      of: Number,
    },
  },
  { timestamps: true }  // "always good to enable timestamps"
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;