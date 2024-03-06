import express from "express";
import { createLevel, readLevels, readLevel, updateLevel, deleteLevel } from "../controllers/levels.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", verifyToken, createLevel);
router.get("/", verifyToken, readLevels);
router.get("/:id", verifyToken, readLevel);
router.post("/update/:id", verifyToken, updateLevel);
router.get("/delete/:id", verifyToken, deleteLevel);

export default router;