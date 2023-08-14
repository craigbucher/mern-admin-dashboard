import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();	// grab all product info

		// create an array of objects; each object = stats for specific product
    // this will be slow, since has to cycle through entire collection of products (every time it's called)
		const productsWithStats = await Promise.all(
      products.map(async (product) => {				// make api call for every product
        const stat = await ProductStat.find({	// grab ProductStat info
          productId: product._id,							// essentially a foreign key (product._id = "products" collection; productId = "productstats" collection)
        });
        return {
          ...product._doc,	// when using 'Promise.all', mongo also returns 'products._doc', so need to include it
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);	// return to frontend, formatted as json
  } catch (error) {
		// ** real-world app should provide more detailed error information
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    // get 'users' with role of 'user' = customers; don't include 'password' field:
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Different from others because using server-side pagination, so have to
// determine the subset of all transactions to return to the frontend:
export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"} (from front end)
    // set defaults:
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    console.log(search)
    // formatted sort should look like { userId: -1 } (for mongoDB)
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);  // parse into json object
      const sortFormatted = {   // create correctly formatted object:
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1), // '1' if sort.Parsed.sort = "asc"; otherwise, '-1'
      };

      return sortFormatted;
    };
    // if 'sort' exists, call 'generateSort'; otherwise don't do anything
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    // query for subset of transactions to return to frontend (= pageSize)
    const transactions = await Transaction.find({
      $or: [    // search multiple fields
        { cost: { $regex: new RegExp(search, "i") } },  // search 'cost' field based on 'search' term deconstructed above
                                                        // regex "i" = case insensitive
        { userId: { $regex: new RegExp(search, "i") } },  // search 'userId' field based on 'search' term deconstructed above
      ],
    })
      .sort(sortFormatted)  // correctly-formatted sort parameter, created above
      .skip(page * pageSize)  // skip to the proper page
      .limit(pageSize);   // limit number of response to pageSize

      // calculate total number of transactions (to send back to frontend)
      const total = await Transaction.countDocuments({
        // name: { $regex: search, $options: "i" },   // Ed's original filter (doesn't work with newest mongoose)
        $or: [
            {
                cost: { $regex: new RegExp(search, "i")}  // "i" = case insensitive
            },
            {
                userId: { $regex: new RegExp(search, "i")}
            },
        ],
    });

    // return both 'transactions' and 'total' formatted as json:
    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();  // pull user info from database

    // acc = accumulator = tally count for each country; destructure { country } from user info
    const mappedLocations = users.reduce((acc, { country }) => {
      // 2-digit country code to 3-digit
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;   // if country code doesn't already exist, establish the key with value '0'
      }
      acc[countryISO3]++; // increment country code count
      return acc;
    }, {});     // start with empty object
    // end result = object with key/count for each country code

    // format data into what nivo charts expects
    // map through 'mappedLocations' *entries* (key and value)
    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count }; // format for nivo
      }
    );

    res.status(200).json(formattedLocations);   // send to frontend
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};