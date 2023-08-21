import express from "express";
import { getSales } from "../controllers/sales.js"
import ensureAuth from "../middleware/auth.js";

// this works with the OverallStat.js model

const router = express.Router();

// 4 pages will use this same endpoint:
// // getSales = function in controllers/management.js
router.get("/sales", ensureAuth, getSales)	// requires authentication

export default router;