import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            min: 9,
            max: 9,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        birthYear: {
            type: Number,
            required: true,
        },
        eduBackground: {
            type: String,
            required: true,
        },
        imgPath: {
            type: String,
            default: "",
        },
        level: {
            type: String,
            default: "",
        },
        coursesTaken: {
            type: Array,
            default: [],
        },
        testResults: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);
export default Student;