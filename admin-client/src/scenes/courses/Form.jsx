import { Box, Button, TextField, Select, useTheme, useMediaQuery } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";

const validationSchema = yup.object().shape({
    title: yup.string().required("required"),
    level: yup.string().required("required"),
    duration: yup.number().required("required"),
    price: yup.number().required("required"),
    description: yup.string().required("required"),
});

const initialValues = {
    title: "",
    level: "",
    duration: "",
    price: "",
    description: ""
};

export default function Form() {
    const levels = useSelector(state => state.levels);
    const token = useSelector(state => state.token);
    const theme = useTheme();
    const colors = theme.palette;
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = async (values, onSubmitProps) => {
        const response = await fetch(
            "http://localhost:3001/courses/create",
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
                            label="Title"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.title}
                            name="title"
                            error={
                                Boolean(touched.title) && Boolean(errors.title)
                            }
                            helperText={touched.title && errors.title}
                            sx={{ gridColumn: "span 4" }}
                        />

                        <FormControl sx={{ gridColumn: "span 4" }}>
                            <InputLabel id="demo-simple-select-helper-label">Level</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Level"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.level}
                                name="level"
                                error={
                                    Boolean(touched.level) && Boolean(errors.level)
                                }
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {(Array.isArray(levels) ? levels.map(({ title }) => ([title])) : Object.entries(levels)).map(([title]) => {
                                    return (
                                        <MenuItem key={title} value={title}>
                                            {title}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Duration"
                            type="number"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.duration}
                            name="duration"
                            error={
                                Boolean(touched.duration) && Boolean(errors.duration)
                            }
                            helperText={touched.duration && errors.duration}
                            sx={{ gridColumn: "span 2" }}
                        />

                        <TextField
                            label="Price"
                            type="number"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.price}
                            name="price"
                            error={
                                Boolean(touched.price) && Boolean(errors.price)
                            }
                            helperText={touched.price && errors.price}
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
                            Create Course
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    )
}