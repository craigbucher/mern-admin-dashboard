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
import cookieParser from 'cookie-parser';
import session from "express-session";
import MongoStore from 'connect-mongo';
import connectDB from "./config/database.js";
import passport from "passport";

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
// app.use(cors());

// restrict requests to/from frontend:
app.use(
  cors({
    origin: process.env.FRONT_END,
    // "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", # <== options
    // origin: 'http://localhost:3000', # must be fqdn?
    credentials: true,
  })
);

//Passport config
import passportFunction from './config/passport.js';
console.log("🚀 ~ file: index.js:43 ~ passportFunction:", passportFunction)

// passes 'passport' module imported above into config/passport.js:
passportFunction(passport)
// console.log("🚀 ~ file: index.js:43 ~ a:")

// exported database connection function:
connectDB();

// initialize cookie parser:
// https://www.npmjs.com/package/cookie-parser
app.use(cookieParser(process.env.COOKIE_SECRET))
// console.log(process.env.COOKIE_SECRET)

// initialize sessions:
// https://www.npmjs.com/package/express-session
app.use(
  session({                   // "express-session" module
    secret: process.env.COOKIE_SECRET,   // cookie secret
    resave: true,             // save the session data on every request
    saveUninitialized: true,  // save the session data even if it is not initialized
    // maxAge: 200000,
    proxy: true,   // Trust the reverse proxy when setting secure cookies (via the "X-Forwarded-Proto" header); default = 'undefined' (Uses the "trust proxy" setting from express)
    cookie: {
      sameSite: process.env.ENV == "production" ? 'none' : 'lax', // value for the SameSite Set-Cookie attribute. By default, this is false.
      // 'none' = set the SameSite attribute to None for an explicit cross-site cookie
      // 'lax' = set the SameSite attribute to Lax for lax same site enforcement
      secure: process.env.ENV == "production" ? true : "", // value for the Secure Set-Cookie attribute
      // *** be careful when setting this to true, as compliant clients will not send the cookie back to the server in the future if the browser does not have an HTTPS connection
    },
    // store = session store instance, defaults to a new MemoryStore instance
    // MongoStore from "connect-mongo" module
    store: new MongoStore({ mongooseConnection: mongoose.connection,
      mongoUrl: process.env.MONGO_URL 
    }),
  })
);

// Passport middleware
app.use(passport.initialize()); // // init passport on every route call
app.use(passport.session());    // allow passport to use "express-session"

/* ROUTES */
app.use("/client", clientRoutes);	// 'Client' links in dashboard sidebar
app.use("/general", generalRoutes);	// main dashboard content
app.use("/management", managementRoutes);	// 'Management' links in dashboard sidebar
app.use("/sales", salesRoutes);	// 'Sales' links in dashboard sidebar

/* MONGOOSE SETUP */
// const PORT = process.env.PORT || 9000;	// 'PORT' from .env, or 9000 if can't be read
// mongoose
//   .connect(process.env.MONGO_URL, {	// connect to MondoDB Atlas
//     useNewUrlParser: true,		// Atlas default configs:
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));	// create server on port 'PORT'

// run the webserver:
app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);

    /* ONLY ADD DATA ONE TIME - pushes to database */
    // AffiliateStat.insertMany(dataAffiliateStat); ✅
    // OverallStat.insertMany(dataOverallStat); ✅  (only data for 2021)
    // Product.insertMany(dataProduct); ✅
    // ProductStat.insertMany(dataProductStat); ✅
    // Transaction.insertMany(dataTransaction); ✅
    // User.insertMany(dataUser);  
    // ------------------------------------------------------
    // Loop through each user record and use save method so that it triggers 
    // the password hashing process. Now, hashed password is saved for each 
    // user ✅

    // dataUser.forEach(user => {
    //   let currentUser = new User(user)
    //   currentUser.save()
    // })
// -------------------------------------------------------
  })
  // .catch((error) => console.log(`${error} - did not connect`));
