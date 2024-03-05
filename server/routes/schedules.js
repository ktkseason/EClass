import express from "express";
import { createSchedule, readSchedules, readSchedule, updateSchedule, deleteSchedule } from "../controllers/schedules.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", verifyToken, createSchedule);
router.get("/", readSchedules);
router.get("/:id", readSchedule);
router.post("/update/:id", verifyToken, updateSchedule);
router.get("/delete/:id", verifyToken, deleteSchedule);

export default router;