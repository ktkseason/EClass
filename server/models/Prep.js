import mongoose from "mongoose";

const PrepSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Prep = mongoose.model("Prep", PrepSchema);
export default Prep;