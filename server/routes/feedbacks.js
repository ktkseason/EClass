import express from "express";
import { createFeedback, readFeedbacks } from "../controllers/feedbacks.js";

const router = express.Router();

router.post("/create", createFeedback);
router.get("/", readFeedbacks);

export default router;