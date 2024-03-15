import Teacher from "../models/Teacher.js";

/* Create */
export const createTeacher = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            employedYear,
            birthYear,
            imgPath
        } = req.body;

        console.log(firstName, lastName, email, phone, employedYear, birthYear, imgPath);
        const newTeacher = new Teacher({
            firstName,
            lastName,
            email,
            phone,
            employedYear,
            birthYear,
            imgPath
        });

        await newTeacher.save();

        const teachers = await Teacher.find();

        res.status(201).json(teachers);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

/* Read */
export const readTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const readTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await Teacher.findById(id);
        res.status(200).json(teacher);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

/* Update */
export const updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            firstName,
            lastName,
            email,
            phone,
            employedYear,
            birthYear,
            imgPath
        } = req.body;

        const updatedTeacher = await Teacher.findByIdAndUpdate(
            id,
            {
                firstName,
                lastName,
                email,
                phone,
                employedYear,
                birthYear,
                imgPath
            },
            { new: true }
        );

        res.status(200).json(updatedTeacher);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

/* Delete */
export const deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        await Teacher.findByIdAndDelete(id);
        const teachers = await Teacher.find();

        res.status(200).json(teachers);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}