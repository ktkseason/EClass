import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import { createTeacher, updateTeacher } from "./controllers/teachers.js";
import { updateStudent } from "./controllers/students.js";
import teacherRoutes from "./routes/teachers.js";
import scheduleRoutes from "./routes/schedules.js";
import testRoutes from "./routes/tests.js";
import eduBackgroundRoutes from "./routes/eduBackgrounds.js";
import levelRoutes from "./routes/levels.js";
import prepRoutes from "./routes/preps.js";
import emotionRoutes from "./routes/emotions.js";
import studentRoutes from "./routes/students.js";
import feedbackRoutes from "./routes/feedbacks.js";
import { verifyToken } from "./middleware/auth.js";

/* Configuration */
/* Middleware */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

/* Routes with files */
app.post("/auth/register", upload.single("picture"), register);
app.post("/students/update/:id", verifyToken, upload.single("picture"), updateStudent); // Student updates information.
app.post("/teachers/create", verifyToken, upload.single("picture"), createTeacher);
app.post("/teachers/update/:id", verifyToken, upload.single("picture"), updateTeacher);


/* Routes */
app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/teachers", teacherRoutes);
app.use("/schedules", scheduleRoutes);
app.use("/tests", testRoutes);
app.use("/eduBackgrounds", eduBackgroundRoutes);
app.use("/levels", levelRoutes);
app.use("/preps", prepRoutes);
app.use("/emotions", emotionRoutes);
app.use("/students", studentRoutes);
app.use("/feedbacks", feedbackRoutes);

/* Mongoose setup */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    })
    .catch(error => console.log(`${error} did not connect.`));