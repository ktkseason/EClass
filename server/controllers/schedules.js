import Schedule from "../models/Schedule.js";
import Course from "../models/Course.js";
import Teacher from "../models/Teacher.js";

/* Create */
export const createSchedule = async (req, res) => {
    try {
        const {
            courseId,
            teacherId,
            startDate,
            time,
            location,
            studentNumbers,
            description
        } = req.body;

        const course = await Course.findById(courseId);
        const teacher = await Teacher.findById(teacherId);

        const newSchedule = new Schedule({
            courseId,
            courseTitle: course.title,
            courseLevel: course.level,
            courseDuration: course.duration,
            coursePrice: course.price,
            teacherId,
            teacherFirstName: teacher.firstName,
            teacherLastName: teacher.lastName,
            teacherImgPath: teacher.imgPath,
            startDate,
            time,
            location,
            studentNumbers,
            description
        });

        await newSchedule.save();

        const schedules = await Schedule.find();
        res.status(201).json(schedules);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

/* Read */
export const readSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.status(200).json(schedules);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const readSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const schedule = await Schedule.findById(id);
        res.status(200).json(schedule);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const readLatestSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.find().sort({ createdAt: -1 }).limit(1);
        res.status(200).json(schedule);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

/* Update */
export const updateSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            courseId,
            teacherId,
            startDate,
            time,
            location,
            studentNumbers,
            description
        } = req.body;

        const course = await Course.findById(courseId);
        const teacher = await Teacher.findById(teacherId);

        const updatedSchedule = await Schedule.findByIdAndUpdate(
            id,
            {
                courseId,
                courseTitle: course.title,
                courseLevel: course.level,
                courseDuration: course.duration,
                coursePrice: course.price,
                teacherId,
                teacherFirstName: teacher.firstName,
                teacherLastName: teacher.lastName,
                teacherImgPath: teacher.imgPath,
                startDate,
                time,
                location,
                studentNumbers,
                description
            },
            { new: true }
        );

        res.status(200).json(updatedSchedule);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

export const updateScheduleRegisteredStudents = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            StudentId,
            StudentFirstName,
            StudentLastName,
        } = req.body;

        const updatedSchedule = await Schedule.findByIdAndUpdate(
            id,
            {
                registeredStudents: [
                    ...
                    {
                        StudentId,
                        StudentFirstName,
                        StudentLastName,
                    }
                ]
            },
            { new: true }
        );
        res.status(200).json(updatedSchedule);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

/* Delete */
export const deleteSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        await Schedule.findByIdAndDelete(id);

        const schedules = await Schedule.find();
        res.status(200).json(schedules);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}