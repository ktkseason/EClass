import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema(
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
            max: 50,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        employedYear: {
            type: Number,
            required: true,
        },
        birthYear: {
            type: Number,
            required: true,
        },
        imgPath: {
            type: String,
            default: "",
        }
    },
    { timestamps: true },
);

const Teacher = mongoose.model("Teacher", TeacherSchema);
export default Teacher;