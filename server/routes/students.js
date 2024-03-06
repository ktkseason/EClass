import express from "express";
import { readStudents, readStudent, updateStudent, updateStudentLevel, updateStudentTestResults, updateStudentCoursesTaken } from "../controllers/students.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, readStudents); // Admin views students.
router.get("/:id", verifyToken, readStudent); // Student views profile.
router.post("/update/:id", verifyToken, updateStudent); // Student updates information.
router.post("/update/level/:id", verifyToken, updateStudentLevel); // Admin updates level, system updates level after each test.
router.post("/update/testResults/:id", verifyToken, updateStudentTestResults); // System updates test results after each test.
router.post("/update/coursestaken/:id", verifyToken, updateStudentCoursesTaken); // System updates courses taken after student checkouts for the course schedule.

export default router;