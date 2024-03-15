import { Box, Button, TextField, Select, useTheme, useMediaQuery } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import state from "state";
import { useEffect, useState } from "react";

const validationSchema = yup.object().shape({
    courseId: yup.string().required("required"),
    courseTitle: yup.string().required("required"),
    courseLevel: yup.string().required("required"),
    courseDuration: yup.number().required("required"),
    coursePrice: yup.number().required("required"),
    teacherId: yup.string().required("required"),
    teacherFirstName: yup.string().required("required"),
    teacherLastName: yup.string().required("required"),
    teacherImgPath: yup.string().required("required"),
    startDate: yup.string().required("required"),
    time: yup.string().required("required"),
    location: yup.string().required("required"),
    studentNumbers: yup.number().required("required"),
    description: yup.string().required("required"),
});

const initialValues = {
    courseId: "",
    courseTitle: "",
    courseLevel: "",
    courseDuration: "",
    coursePrice: "",
    teacherId: "",
    teacherFirstName: "",
    teacherLastName: "",
    teacherImgPath: "",
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
    const [courseInfo, setCourseInfo] = useState({});
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

    useEffect(() => {
        getCourse(courseId);
        console.log(courseInfo);
    }, [courseId]);

    const handleFormSubmit = async (values, onSubmitProps) => {
        const response = await fetch(
            "http://localhost:3001/schedules/create",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(values),
            }
        );
        await response.json();
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

                        <TextField
                            disabled
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={courseInfo._id}
                            placeholder="Course ID"
                            name="courseId"
                            error={
                                Boolean(touched.courseId) && Boolean(errors.courseId)
                            }
                            helperText={touched.courseId && errors.courseId}
                            sx={{ gridColumn: "span 4" }}
                        />

                        <FormControl sx={{ gridColumn: "span 4" }}>
                            <InputLabel id="demo-simple-select-helper-label">Course Title</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Course Title"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.courseTitle}
                                name="courseTitle"
                                error={
                                    Boolean(touched.courseTitle) && Boolean(errors.courseTitle)
                                }
                            >
                                <MenuItem value="" onClick={() => { setCourseId("") }}>
                                    <em>None</em>
                                </MenuItem>
                                {(Array.isArray(courses) ? courses.map(({ _id, title }) => ([_id, title])) : Object.entries(courses)).map(([_id, title]) => {
                                    return (
                                        <MenuItem key={title} value={title} onClick={() => { setCourseId(_id) }}>
                                            {title}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <TextField
                            disabled
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={courseInfo.level}
                            name="courseLevel"
                            error={
                                Boolean(touched.courseLevel) && Boolean(errors.courseLevel)
                            }
                            helperText={touched.courseLevel && errors.courseLevel}
                            sx={{ gridColumn: "span 2" }}
                        />

                        <TextField
                            disabled
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={courseInfo.duration}
                            name="courseDuration"
                            error={
                                Boolean(touched.courseDuration) && Boolean(errors.courseDuration)
                            }
                            helperText={touched.courseDuration && errors.courseDuration}
                            sx={{ gridColumn: "span 2" }}
                        />

                        <TextField
                            disabled
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={courseInfo.price}
                            name="coursePrice"
                            error={
                                Boolean(touched.coursePrice) && Boolean(errors.coursePrice)
                            }
                            helperText={touched.coursePrice && errors.coursePrice}
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
                            Create course
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    )
}