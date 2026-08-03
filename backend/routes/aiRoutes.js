import express from "express";

import { generateSuggestions } from "../controllers/aiController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/suggestions", protect, generateSuggestions);

export default router;