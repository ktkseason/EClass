import express from "express";
import { readTeachers, readTeacher, deleteTeacher } from "../controllers/teachers.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", readTeachers);
router.get("/:id", readTeacher);
router.get("/delete/:id", verifyToken, deleteTeacher);

export default router;
