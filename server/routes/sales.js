import express from "express";
import { getSales } from "../controllers/sales.js";

// this works with the OverallStat.js model

const router = express.Router();

// 4 pages will use this same endpoint:
router.get("/sales", getSales);		// getSales = function in controllers/management.js

export default router;