import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Student from "../models/Student.js";

/* Register ( Students ) */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            password,
            birthYear,
            eduBackground,
            imgPath,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newStudent = new Student({
            firstName,
            lastName,
            email,
            phone,
            password: passwordHash,
            birthYear,
            eduBackground,
            imgPath,
        });

        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/* Login ( Admin, Students ) */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (await Admin.findOne({ email: email })) {
            const admin = await Admin.findOne({ email: email });
            const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
            delete admin.password;
            res.status(200).json({ token, admin, status: "admin" });
        } else {
            const student = await Student.findOne({ email: email });
            if (!student) return res.status(400).json({ msg: "Student does not exist." });

            const isMatch = await bcrypt.compare(password, student.password);
            if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

            const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
            delete student.password;
            res.status(200).json({ token, student, status: "student" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}