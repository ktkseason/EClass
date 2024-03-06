import Emotion from "../models/Emotion.js";

/* Creat */
export const createEmotion = async (req, res) => {
    try {
        const {
            title,
        } = req.body;

        const newEmotion = new Emotion({
            title,
        });

        await newEmotion.save();
        const emotions = await Emotion.find();

        res.status(201).json(emotions);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

/* Read */
export const readEmotions = async (req, res) => {
    try {
        const emotions = await Emotion.find();
        res.status(200).json(emotions);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const readEmotion = async (req, res) => {
    try {
        const { id } = req.params;
        const emotion = await Emotion.findById(id);
        res.status(200).json(emotion);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

/* Update */
export const updateEmotion = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
        } = req.body;
        const updatedEmotion = await Emotion.findByIdAndUpdate(
            id,
            {
                title,
            },
            { new: true }
        );

        res.status(200).json(updatedEmotion);

    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

/* Delete */
export const deleteEmotion = async (req, res) => {
    try {
        const { id } = req.params;
        await Emotion.findByIdAndDelete(id);
        const emotions = await Emotion.find();
        res.status(200).json(emotions);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}