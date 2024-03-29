import Student from "../models/Student.js";

/* Read */
export const readStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const readStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        res.status(200).json(student);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

/* Update */
export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            firstName,
            lastName,
            email,
            phone,
            birthYear,
            eduBackground,
            imgPath,
        } = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            {
                firstName,
                lastName,
                email,
                phone,
                birthYear,
                eduBackground,
                imgPath,
            },
            { new: true }
        );

        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

export const updateStudentLevel = async (req, res) => {
    try {
        const { id } = req.params;
        const { level } = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { level },
            { new: true }
        );
        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

export const updateStudentTestResults = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            emotion,
            prep,
            score,
        } = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            {
                testResults: [
                    ...
                    {
                        emotion,
                        prep,
                        score
                    }
                ],
            },
            { new: true }
        );
        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

export const updateStudentCoursesTaken = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            scheduleId,
            courseTitle,
            courseLevel,
            teacherFirstName,
            teacherLastName,
            scheduleStartDate,
        } = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            {
                testResults: [
                    ...
                    {
                        scheduleId,
                        courseTitle,
                        courseLevel,
                        teacherFirstName,
                        teacherLastName,
                        scheduleStartDate,
                    }
                ]
            },
            { new: true }
        );
        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}
