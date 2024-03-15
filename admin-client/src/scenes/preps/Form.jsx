import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";

const validationSchema = yup.object().shape({
    title: yup.string().required("required"),
});

const initialValues = {
    title: "",
};

export default function Form() {
    const token = useSelector(state => state.token);
    const theme = useTheme();
    const colors = theme.palette;

    const handleFormSubmit = async (values, onSubmitProps) => {
        const response = await fetch(
            "http://localhost:3001/preps/create",
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
                            Create Preparation
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    )
}