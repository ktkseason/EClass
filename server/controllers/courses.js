import Course from "../models/Course.js";

/* Create */
export const createCourse = async (req, res) => {
    try {
        const {
            title,
            level,
            duration,
            price,
            description,
        } = req.body;

        const newCourse = new Course({
            title,
            level,
            duration,
            price,
            description,
        });

        await newCourse.save();

        const courses = await Course.find();

        res.status(201).json(courses);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

/* Read */
export const readCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export const readCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        res.status(200).json(course);
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

/* Update */
export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            level,
            duration,
            price,
            description,
        } = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            {
                title,
                level,
                duration,
                price,
                description,
            },
            { new: true }
        );

        res.status(200).json(updatedCourse);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

/* Delete */
export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        await Course.findByIdAndDelete(id);
        const courses = await Course.find();

        res.status(200).json(courses);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}