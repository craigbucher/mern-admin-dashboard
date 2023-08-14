import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
} from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);   // getProducts = function in controllers/client.js
router.get("/customers", getCustomers); // getCustomers = function in controllers/client.js
router.get("/transactions", getTransactions); // getTransactions = function in controllers/client.js
router.get("/geography", getGeography); // getGeography = function in controllers/client.js

export default router;