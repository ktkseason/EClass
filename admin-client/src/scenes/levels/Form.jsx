import { Box, Button, TextField, useTheme, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";

const validationSchema = yup.object().shape({
    title: yup.string().required("required"),
    minScore: yup.number().required("required"),
    maxScore: yup.number().required("required"),
});

const initialValues = {
    title: "",
    minScore: "",
    maxScore: ""
};

export default function Form() {
    const token = useSelector(state => state.token);
    const theme = useTheme();
    const colors = theme.palette;
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = async (values, onSubmitProps) => {
        const response = await fetch(
            "http://localhost:3001/levels/create",
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

                        <TextField
                            label="Minimun Score"
                            type="number"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.minScore}
                            name="minScore"
                            error={
                                Boolean(touched.minScore) && Boolean(errors.minScore)
                            }
                            helperText={touched.minScore && errors.minScore}
                            sx={{ gridColumn: "span 2" }}
                        />

                        <TextField
                            label="Maximum Score"
                            type="number"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.maxScore}
                            name="maxScore"
                            error={
                                Boolean(touched.maxScore) && Boolean(errors.maxScore)
                            }
                            helperText={touched.maxScore && errors.maxScore}
                            sx={{ gridColumn: "span 2" }}
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
                            Create Level
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    )
}