import express from "express";
import { getAdmins, getUserPerformance } from "../controllers/management.js"
import ensureAuth from "../middleware/auth.js";

const router = express.Router();

router.get("/admins", ensureAuth, getAdmins)	// requires authentication
router.get("/performance/:id", ensureAuth, getUserPerformance)	// requires authentication

export default router;