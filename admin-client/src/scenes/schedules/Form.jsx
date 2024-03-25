import { Box, Button, TextField, Select, useTheme, useMediaQuery } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const validationSchema = yup.object().shape({
    courseTitle: yup.string().required("required"),
    teacherFirstName: yup.string().required("required"),
    startDate: yup.string().required("required"),
    time: yup.string().required("required"),
    location: yup.string().required("required"),
    studentNumbers: yup.number().required("required"),
    description: yup.string().required("required"),
});

const initialValues = {
    courseTitle: "",
    teacherFirstName: "",
    startDate: "",
    time: "",
    location: "",
    studentNumbers: "",
    description: "",
};

export default function Form() {
    const courses = useSelector(state => state.courses);
    const teachers = useSelector(state => state.teachers)
    const token = useSelector(state => state.token);
    const [courseId, setCourseId] = useState("");
    const [teacherId, setTeacherId] = useState("");
    const [courseInfo, setCourseInfo] = useState({});
    const [teacherInfo, setTeacherInfo] = useState({});
    const theme = useTheme();
    const colors = theme.palette;
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const getCourse = async (_id) => {
        const response = await fetch(`http://localhost:3001/courses/${_id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const course = await response.json();
        if (course) {
            setCourseInfo(course);
        }
    }

    const getTeacher = async (_id) => {
        const response = await fetch(`http://localhost:3001/teachers/${_id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const teacher = await response.json();
        if (teacher) {
            setTeacherInfo(teacher);
        }
    }

    useEffect(() => {
        if (courseId)
            getCourse(courseId);
        else setCourseInfo({});
        if (teacherId)
            getTeacher(teacherId);
        else setTeacherInfo({});
    }, [courseId, teacherId]);

    const handleFormSubmit = async (values, onSubmitProps) => {
        let appendData = {
            "courseId": courseInfo._id,
            "courseLevel": courseInfo.level,
            "courseDuration": courseInfo.duration,
            "coursePrice": courseInfo.price,
            "teacherId": teacherInfo._id,
            "teacherLastName": teacherInfo.lastName,
            "teacherImgPath": teacherInfo.imgPath,
        }

        const inputData = { ...values, ...appendData };
        const response = await fetch(
            "http://localhost:3001/schedules/create",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(inputData),
            }
        );
        await response.json();
        setCourseId("");
        setTeacherId("");
        onSubmitProps.resetForm();
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="20px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >
                        <FormControl sx={{ gridColumn: "span 4" }}>
                            <InputLabel id="demo-simple-select-helper-label">Course Title</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Course Title"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={courseInfo.title ? courseInfo.title : ""}
                                name="courseTitle"
                                error={
                                    Boolean(touched.courseTitle) && Boolean(errors.courseTitle)
                                }
                            >
                                <MenuItem value="" onClick={() => { setCourseId(""); setCourseInfo(""); }}>
                                    <em>None</em>
                                </MenuItem>
                                {(Array.isArray(courses) ? courses.map(({ _id, title }) => ([_id, title])) : Object.entries(courses)).map(([_id, title]) => {
                                    return (
                                        <MenuItem key={_id} value={title} onClick={() => { setCourseId(_id) }}>
                                            {title}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Course ID"
                            InputProps={{
                                readOnly: true,
                            }}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={courseInfo._id ? courseInfo._id : ""}
                            name="courseId"
                            error={
                                Boolean(touched.courseId) && Boolean(errors.courseId)
                            }
                            helperText={touched.courseId && errors.courseId}
                            sx={{ gridColumn: "span 2" }}
                        />

                        <TextField
                            label="Course Level"
                            InputProps={{
                                readOnly: true,
                            }}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={courseInfo.level ? courseInfo.level : ""}
                            sx={{ gridColumn: "span 2" }}
                        />

                        <TextField
                            label="Course Duration"
                            InputProps={{
                                readOnly: true,
                            }}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={courseInfo.duration ? courseInfo.duration : ""}
                            sx={{ gridColumn: "span 2" }}
                        />

                        <TextField
                            label="Course Price"
                            InputProps={{
                                readOnly: true,
                            }}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={courseInfo.price ? courseInfo.price : ""}
                            sx={{ gridColumn: "span 2" }}
                        />

                        <FormControl sx={{ gridColumn: "span 4" }}>
                            <InputLabel id="demo-simple-select-helper-label">Teacher's First Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Teacher's First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={teacherInfo.firstName ? teacherInfo.firstName : ""}
                                name="teacherFirstName"
                                error={
                                    Boolean(touched.teacherFirstName) && Boolean(errors.teacherFirstName)
                                }
                            >
                                <MenuItem value="" onClick={() => { setTeacherId(""); setTeacherInfo(""); }}>
                                    <em>None</em>
                                </MenuItem>
                                {/* Some bug here */}
                                {(Array.isArray(teachers) ? teachers.map(({ _id, firstName, lastName }) => ([_id, firstName, lastName])) : Object.entries(teachers)).map(([_id, firstName, lastName]) => {
                                    return (
                                        <MenuItem key={_id} value={firstName} onClick={() => { setTeacherId(_id) }}>
                                            {firstName} {lastName}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Teacher ID"
                            InputProps={{
                                readOnly: true,
                            }}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={teacherInfo._id ? teacherInfo._id : ""}
                            sx={{ gridColumn: "span 2" }}
                        />

                        <TextField
                            label="Teacher's Last Name"
                            InputProps={{
                                readOnly: true,
                            }}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={teacherInfo.lastName ? teacherInfo.lastName : ""}
                            sx={{ gridColumn: "span 2" }}
                        />

                        <TextField
                            label="Teacher's Picture Path"
                            disabled
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={teacherInfo.imgPath ? teacherInfo.imgPath : ""}
                            sx={{ gridColumn: "span 4" }}
                        />

                        <TextField
                            label="Start Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.startDate}
                            name="startDate"
                            error={
                                Boolean(touched.startDate) && Boolean(errors.startDate)
                            }
                            helperText={touched.startDate && errors.startDate}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            label="Time"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.time}
                            name="time"
                            error={
                                Boolean(touched.time) && Boolean(errors.time)
                            }
                            helperText={touched.time && errors.time}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            label="Location"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.location}
                            name="location"
                            error={
                                Boolean(touched.location) && Boolean(errors.location)
                            }
                            helperText={touched.location && errors.location}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            label="Number of Students"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.studentNumbers}
                            name="studentNumbers"
                            error={
                                Boolean(touched.studentNumbers) && Boolean(errors.studentNumbers)
                            }
                            helperText={touched.studentNumbers && errors.studentNumbers}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            label="Description"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.description}
                            name="description"
                            error={
                                Boolean(touched.description) && Boolean(errors.description)
                            }
                            helperText={touched.description && errors.description}
                            sx={{ gridColumn: "span 4" }}
                        />
                    </Box>

                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: colors.primary.main,
                                color: colors.background.default,
                                "&:hover": { color: colors.primary.main },
                            }}
                        >
                            Create Schedule
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    )
}