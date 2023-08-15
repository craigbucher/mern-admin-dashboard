import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getAdmins = async (req, res) => {
  try {
    const roles = ['admin', 'superadmin'];
		// get all users with role of 'admin' or 'superadmin' but do not return the password field
    const admins = await User.find({ role: roles }).select("-password");
    res.status(200).json(admins);	// return the result
  } catch (error) {
		// in real-world app, should provide more detail:
    res.status(404).json({ message: error.message });
  }
};

// uses MongoDB 'aggregate calls' = similar to SQL table joins
// https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/
export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;  // destructure 'id' from request params
    // query database for users
    const userWithStats = await User.aggregate([
      // where database user '_id' equals 'id' from params
      { $match: { _id: new mongoose.Types.ObjectId(id) } }, // 'new mongoose.Types.ObjectId(id)' = convert params id to mongoose id format
      {
        // combine affiliatestats associated with user with normal user information:
        // compare with 'products' where we first got all products, then mapped
        // through and found productStats associated with each
        $lookup: {
          from: "affiliatestats", // from a different collection
          localField: "_id",    // field in users             --| JOIN
          foreignField: "userId", // field in affiliatestats  --| JOIN
          as: "affiliateStats", // property added to userWithStats
        },
      },
      { $unwind: "$affiliateStats" }, // "flattens the returned information" ?????
    ]);

    const saleTransactions = await Promise.all(
      // userWithStats = defined above
      // .affiliateStats = generated above
      // .affiliateSales = property of affiliatesales
      // map through by id
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        // and return transactions associated with id
        return Transaction.findById(id);
      })
    );

    // "I havent figured a way to do this natively in mongoose"
    // filter out 'null' transactions
    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null   // transactions that aren't null
    );

    res
      .status(200)
      // return user info and associated transactions
      .json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};