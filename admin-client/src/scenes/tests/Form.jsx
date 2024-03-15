import { Box, Button, TextField, useTheme, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";

const validationSchema = yup.object().shape({
    question: yup.string().required("required"),
    rightAnswer: yup.string().required("required"),
    wrongAnswer1: yup.string().required("required"),
    wrongAnswer2: yup.string().required("required"),
    wrongAnswer3: yup.string().required("required"),
});

const initialValues = {
    question: "",
    rightAnswer: "",
    wrongAnswer1: "",
    wrongAnswer2: "",
    wrongAnswer3: "",
};

export default function Form() {
    const token = useSelector(state => state.token);
    const theme = useTheme();
    const colors = theme.palette;
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = async (values, onSubmitProps) => {
        const response = await fetch(
            "http://localhost:3001/tests/create",
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
                            label="Question"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.question}
                            name="question"
                            error={
                                Boolean(touched.question) && Boolean(errors.question)
                            }
                            helperText={touched.question && errors.question}
                            sx={{ gridColumn: "span 4" }}
                        />

                        <TextField
                            label="Right Answer"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.rightAnswer}
                            name="rightAnswer"
                            error={
                                Boolean(touched.rightAnswer) && Boolean(errors.rightAnswer)
                            }
                            helperText={touched.rightAnswer && errors.rightAnswer}
                            sx={{ gridColumn: "span 2" }}
                        />

                        <TextField
                            label="Wrong Answer 1"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.wrongAnswer1}
                            name="wrongAnswer1"
                            error={
                                Boolean(touched.wrongAnswer1) && Boolean(errors.wrongAnswer1)
                            }
                            helperText={touched.wrongAnswer1 && errors.wrongAnswer1}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            label="Wrong Answer 2"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.wrongAnswer2}
                            name="wrongAnswer2"
                            error={
                                Boolean(touched.wrongAnswer2) && Boolean(errors.wrongAnswer2)
                            }
                            helperText={touched.wrongAnswer2 && errors.wrongAnswer2}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            label="Wrong Answer 3"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.wrongAnswer3}
                            name="wrongAnswer3"
                            error={
                                Boolean(touched.wrongAnswer3) && Boolean(errors.wrongAnswer3)
                            }
                            helperText={touched.wrongAnswer3 && errors.wrongAnswer3}
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
                            Create Test
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    )
}