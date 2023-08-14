import express from "express";
import { getUser, getDashboardStats } from "../controllers/general.js";

const router = express.Router();

router.get("/user/:id", getUser);		// 'getUser' = function in /controllers/general.js
router.get("/dashboard", getDashboardStats);	// 'getDashboardStats' = function in /controllers/general.jss

export default router;