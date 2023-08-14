import User from "../models/User.js";	// unlike frontend, have to add '.js' extension
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";

export const getUser = async (req, res) => {	 // 'req' = params, body; 'res' = response from destination
  try {
    const { id } = req.params;		// get id from params (/user/:id)
    const user = await User.findById(id);	// query database for 'user' with 'id'
    // console.log(user)
    res.status(200).json(user);		// return user info in json format
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    /* Recent Transactions */
    const transactions = await Transaction.find() // api call for transactions
      .limit(50)  // most recent 50 transactions
      .sort({ createdOn: -1 }); // most recent first

    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear });  // api call for overallstats

    const {
      totalCustomers,   // deconstruct from overallstat, above
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    // get this month's (as defined above) monthly data:
    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    // get today's (as defined above) daily data:
    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({    // return all this stuff in json format:
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};