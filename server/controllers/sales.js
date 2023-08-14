import OverallStat from "../models/OverallStat.js";

export const getSales = async (req, res) => {
  try {
    const overallStats = await OverallStat.find();	// retrieves all records/documents (there's actually only one)

		// database call returns an array, but since we only have one data point
		// we'll return it specifically:
    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};