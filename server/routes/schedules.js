import express from "express";
import { createSchedule, readSchedules, readSchedule, readLatestSchedule, updateSchedule, updateScheduleRegisteredStudents, deleteSchedule } from "../controllers/schedules.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", verifyToken, createSchedule);
router.get("/latest", readLatestSchedule);
router.get("/", readSchedules);
router.get("/:id", readSchedule);
router.post("/update/:id", verifyToken, updateSchedule);
router.post("/update/registeredStudents/:id", verifyToken, updateScheduleRegisteredStudents);
router.get("/delete/:id", verifyToken, deleteSchedule);

export default router;