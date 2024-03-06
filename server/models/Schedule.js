import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema(
    {
        courseId: {
            type: String,
            required: true,
        },
        courseTitle: {
            type: String,
            required: true,
        },
        courseLevel: {
            type: String,
            required: true,
        },
        courseDuration: {
            type: String,
            requried: true,
        },
        coursePrice: {
            type: Number,
            required: true,
        },
        teacherId: {
            type: String,
            required: true,
        },
        teacherFirstName: {
            type: String,
            requried: true,
        },
        teacherLastName: {
            type: String,
            requried: true,
        },
        teacherImgPath: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            requried: true,
        },
        time: {
            type: String,
            requried: true,
        },
        location: {
            type: String,
            required: true,
        },
        studentNumbers: {
            type: Number,
            required: true,
        },
        registeredStudents: {
            type: Array,
            default: [],
        },
        description: {
            type: String,
            default: "",
        }
    },
    { timestamps: true }
);

const Schedule = mongoose.model("Schedule", ScheduleSchema);
export default Schedule;