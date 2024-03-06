import mongoose from "mongoose";

const EduBackgroundSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const EduBackground = mongoose.model("EduBackground", EduBackgroundSchema);
export default EduBackground;