import Level from "../models/Level.js";

/* Creat */
export const createLevel = async (req, res) => {
    try {
        const {
            title,
            minScore,
            maxScore
        } = req.body;

        const newLevel = new Level({
            title,
            minScore,
            maxScore
        });

        await newLevel.save();
        const levels = await Level.find();

        res.status(201).json(levels);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

/* Read */
export const readLevels = async (req, res) => {
    try {
        const levels = await Level.find();
        res.status(200).json(levels);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const readLevel = async (req, res) => {
    try {
        const { id } = req.params;
        const level = await Level.findById(id);
        res.status(200).json(level);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

/* Update */
export const updateLevel = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            minScore,
            maxScore
        } = req.body;
        const updatedLevel = await Level.findByIdAndUpdate(
            id,
            {
                title,
                minScore,
                maxScore
            },
            { new: true }
        );

        res.status(200).json(updatedLevel);

    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

/* Delete */
export const deleteLevel = async (req, res) => {
    try {
        const { id } = req.params;
        await Level.findByIdAndDelete(id);
        const levels = await Level.find();
        res.status(200).json(levels);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}