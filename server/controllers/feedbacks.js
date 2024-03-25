import Feedback from "../models/Feedback.js";

/* Creat */
export const createFeedback = async (req, res) => {
    try {
        const {
            name,
            email,
            subject,
            content
        } = req.body;

        const newFeedback = new Feedback({
            name,
            email,
            subject,
            content
        });

        await newFeedback.save();
        const feedbacks = await Feedback.find();

        res.status(201).json(feedbacks);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

/* Read */
export const readFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}