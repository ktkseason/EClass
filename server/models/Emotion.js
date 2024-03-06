import mongoose from "mongoose";

const EmotionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Emotion = mongoose.model("Emotion", EmotionSchema);
export default Emotion;