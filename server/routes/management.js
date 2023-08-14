import express from "express";
import { getAdmins, getUserPerformance } from "../controllers/management.js";

const router = express.Router();

router.get("/admins", getAdmins);		// getAdmins = function in controllers/management.js
router.get("/performance/:id", getUserPerformance);	// pass 'id' to get performance for particular user

export default router;