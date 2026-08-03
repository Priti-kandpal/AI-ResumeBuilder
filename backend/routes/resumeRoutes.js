import express from "express";

import {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from "../controllers/resumeController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, createResume)
  .get(protect, getAllResumes);

router.route("/:id")
  .get(protect, getResumeById)
  .put(protect, updateResume)
  .delete(protect, deleteResume);

export default router;