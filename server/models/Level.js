import mongoose from "mongoose";

const LevelSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        minScore: {
            type: Number,
            required: true,
        },
        maxScore: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
);

const Level = mongoose.model("Level", LevelSchema);
export default Level;
