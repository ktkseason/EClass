import express from "express";
import { createEduBackground, readEduBackgrounds, readEduBackground, updateEduBackground, deleteEduBackground } from "../controllers/eduBackgrounds.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", verifyToken, createEduBackground);
router.get("/", verifyToken, readEduBackgrounds);
router.get("/:id", verifyToken, readEduBackground);
router.post("/update/:id", verifyToken, updateEduBackground);
router.get("/delete/:id", verifyToken, deleteEduBackground);

export default router;