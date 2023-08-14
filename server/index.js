import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
// cross-origin because going between two servers (even though both are running on same machine):
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));	// other options = 'same-orgin' (default if not specified	) and 'same-site'
app.use(morgan("common"));	// logs api requests & responses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);	// 'Client' links in dashboard sidebar
app.use("/general", generalRoutes);	// main dashboard content
app.use("/management", managementRoutes);	// 'Management' links in dashboard sidebar
app.use("/sales", salesRoutes);	// 'Sales' links in dashboard sidebar

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;	// 'PORT' from .env, or 9000 if can't be read
mongoose
  .connect(process.env.MONGO_URL, {	// connect to MondoDB Atlas
    useNewUrlParser: true,		// Atlas default configs:
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));	// create server on port 'PORT'

    /* ONLY ADD DATA ONE TIME - pushes to database */
    // AffiliateStat.insertMany(dataAffiliateStat); ✅
    // OverallStat.insertMany(dataOverallStat); ✅  (only data for 2021)
    // Product.insertMany(dataProduct); ✅
    // ProductStat.insertMany(dataProductStat); ✅
    // Transaction.insertMany(dataTransaction); ✅
    // User.insertMany(dataUser);  ✅
  })
  .catch((error) => console.log(`${error} - did not connect`));
