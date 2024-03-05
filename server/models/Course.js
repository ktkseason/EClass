import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        level: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);
export default Course;