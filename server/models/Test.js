import mongoose from "mongoose";

const TestSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
        answers: {
            type: Array,
            required: true,
        },
    },
    { timestamps: true }
);

const Test = mongoose.model("Test", TestSchema);
export default Test;