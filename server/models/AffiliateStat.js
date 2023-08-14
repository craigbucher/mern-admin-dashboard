import mongoose from "mongoose";

const AffiliateStatSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" }, // one-to-one
    affiliateSales: {
      type: [mongoose.Types.ObjectId],  // array of ObjectIds (one-to-many)
      ref: "Transaction", // 'ref' = which data model it's referring to
    },
  },
  { timestamps: true }
);

const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatSchema);
export default AffiliateStat;