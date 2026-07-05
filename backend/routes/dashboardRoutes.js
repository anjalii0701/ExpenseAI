import express from "express";

import {
    getSummary,
    getCategoryBreakdown,
    getMonthlyTrend,
} from "../controllers/dashboardController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Dashboard summary cards
router.get("/summary", getSummary);

// Expense breakdown by category
router.get("/category-breakdown", getCategoryBreakdown);

// Monthly income vs expense trend
router.get("/monthly-trend", getMonthlyTrend);

export default router;