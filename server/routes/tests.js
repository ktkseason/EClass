import express from "express";
import { createTest, readTests, readTest, readTestRandom, updateTest, deleteTest } from "../controllers/tests.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", verifyToken, createTest);
router.get("/readTestRandom", verifyToken, readTestRandom);
router.get("/", verifyToken, readTests);
router.get("/:id", verifyToken, readTest);
router.post("/update/:id", verifyToken, updateTest);
router.get("/delete/:id", verifyToken, deleteTest);

export default router;