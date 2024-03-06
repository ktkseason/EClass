import EduBackground from "../models/EduBackground.js";

/* Creat */
export const createEduBackground = async (req, res) => {
    try {
        const {
            title,
        } = req.body;

        const newEduBackground = new EduBackground({
            title,
        });

        await newEduBackground.save();
        const eduBackgrounds = await EduBackground.find();

        res.status(201).json(eduBackgrounds);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

/* Read */
export const readEduBackgrounds = async (req, res) => {
    try {
        const eduBackgrounds = await EduBackground.find();
        res.status(200).json(eduBackgrounds);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const readEduBackground = async (req, res) => {
    try {
        const { id } = req.params;
        const eduBackground = await EduBackground.findById(id);
        res.status(200).json(eduBackground);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

/* Update */
export const updateEduBackground = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
        } = req.body;
        const updatedEduBackground = await EduBackground.findByIdAndUpdate(
            id,
            {
                title,
            },
            { new: true }
        );

        res.status(200).json(updatedEduBackground);

    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

/* Delete */
export const deleteEduBackground = async (req, res) => {
    try {
        const { id } = req.params;
        await EduBackground.findByIdAndDelete(id);
        const eduBackgrounds = await EduBackground.find();
        res.status(200).json(eduBackgrounds);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}