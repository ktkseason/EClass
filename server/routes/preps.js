import express from "express";
import { createPrep, readPreps, readPrep, updatePrep, deletePrep } from "../controllers/preps.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", verifyToken, createPrep);
router.get("/", verifyToken, readPreps);
router.get("/:id", verifyToken, readPrep);
router.post("/update/:id", verifyToken, updatePrep);
router.get("/delete/:id", verifyToken, deletePrep);

export default router;