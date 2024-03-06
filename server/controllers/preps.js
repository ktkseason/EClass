import Prep from "../models/Prep.js";

/* Creat */
export const createPrep = async (req, res) => {
    try {
        const {
            title,
        } = req.body;

        const newPrep = new Prep({
            title,
        });

        await newPrep.save();
        const preps = await Prep.find();

        res.status(201).json(preps);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

/* Read */
export const readPreps = async (req, res) => {
    try {
        const preps = await Prep.find();
        res.status(200).json(preps);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const readPrep = async (req, res) => {
    try {
        const { id } = req.params;
        const prep = await Prep.findById(id);
        res.status(200).json(prep);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

/* Update */
export const updatePrep = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
        } = req.body;
        const updatedPrep = await Prep.findByIdAndUpdate(
            id,
            {
                title,
            },
            { new: true }
        );

        res.status(200).json(updatedPrep);

    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

/* Delete */
export const deletePrep = async (req, res) => {
    try {
        const { id } = req.params;
        await EduBackground.findByIdAndDelete(id);
        const eduBackgrounds = await EduBackground.find();
        res.status(200).json(eduBackgrounds);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}