import express from "express";
import { createEmotion, readEmotions, readEmotion, updateEmotion, deleteEmotion } from "../controllers/emotions.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", verifyToken, createEmotion);
router.get("/", verifyToken, readEmotions);
router.get("/:id", verifyToken, readEmotion);
router.post("/update/:id", verifyToken, updateEmotion);
router.get("/delete/:id", verifyToken, deleteEmotion);

export default router;