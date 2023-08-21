import express from "express";
import { getUser, getDashboardStats } from "../controllers/general.js";
import  { logout, postLogin, test }  from "../controllers/auth.js";

const router = express.Router();

router.post("/login", postLogin);	// run authentication/login functions
router.get("/test", test);
router.get("/logout", logout);	// run logout function
router.get("/user/:id", getUser);		// 'getUser' = function in /controllers/general.js
router.get("/dashboard", getDashboardStats);	// 'getDashboardStats' = function in /controllers/general.jss

export default router;