import mongoose from "mongoose";

// very similar to ProductStat.js

const OverallStatSchema = new mongoose.Schema(
  {
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [    // nesting an object in an array
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    salesByCategory: {
      type: Map,  // creates object in mongoose
      of: Number,
    },
  },
  { timestamps: true }  // "always good to have timestamps"
);

const OverallStat = mongoose.model("OverallStat", OverallStatSchema);
export default OverallStat;