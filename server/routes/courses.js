import express from "express";
import { createCourse, readCourses, readCourse, updateCourse, deleteCourse } from "../controllers/courses.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


router.post("/create", verifyToken, createCourse);
router.get("/", readCourses);
router.get("/:id", readCourse);
router.post("/update/:id", verifyToken, updateCourse);
router.get("/delete/:id", verifyToken, deleteCourse);

export default router;