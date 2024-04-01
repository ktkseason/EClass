import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
    email: yup.string().required("required"),
    subject: yup.string().required("required"),
    content: yup.string().required("required"),
});

const initialValues = {
    name: "",
    email: "",
    subject: "",
    content: ""
};

export default function Form() {
    const theme = useTheme();
    const colors = theme.palette;

    const handleFormSubmit = async (values, onSubmitProps) => {
        const response = await fetch(
            "http://localhost:3001/feedbacks/create",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }
        );
        await response.json();
        onSubmitProps.resetForm();
        alert("Feedback sent.");
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
                        display="flex"
                        flexDirection="column"
                        justifyContent="start"
                        alignItems="start"
                        gap="1rem"
                    >

                        <TextField
                            label="Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                            name="name"
                            error={
                                Boolean(touched.name) && Boolean(errors.name)
                            }
                            helperText={touched.name && errors.name}
                            sx={{ width: "100%" }}
                        />
                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={
                                Boolean(touched.email) && Boolean(errors.email)
                            }
                            helperText={touched.email && errors.email}
                            sx={{ width: "100%" }}
                        />
                        <TextField
                            label="Subject"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.subject}
                            name="subject"
                            error={
                                Boolean(touched.subject) && Boolean(errors.subject)
                            }
                            helperText={touched.subject && errors.subject}
                            sx={{ width: "100%" }}
                        />
                        <TextField
                            label="Content"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.content}
                            name="content"
                            error={
                                Boolean(touched.content) && Boolean(errors.content)
                            }
                            helperText={touched.content && errors.content}
                            sx={{ width: "100%" }}
                            multiline
                            rows={4}
                        />
                    </Box>

                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                fontWeight: "bold",
                                m: "1rem 0",
                                p: "1rem",
                                backgroundColor: colors.primary.main,
                                color: colors.background.default,
                                "&:hover": { backgroundColor: `${colors.primary.light}` },
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    )
}