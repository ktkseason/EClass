import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";

const validationSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phone: yup.string().required("required"),
    employedYear: yup.number().required("required"),
    birthYear: yup.number().required("required"),
    picture: yup.string().required("required"),
});

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    employedYear: "",
    birthYear: "",
    picture: "",
};

export default function Form() {
    const token = useSelector(state => state.token);
    const theme = useTheme();
    const colors = theme.palette;
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("imgPath", values.picture.name);
        const response = await fetch(
            "http://localhost:3001/teachers/create",
            {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
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
                            label="First Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.firstName}
                            name="firstName"
                            error={
                                Boolean(touched.firstName) && Boolean(errors.firstName)
                            }
                            helperText={touched.firstName && errors.firstName}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            label="Last Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lastName}
                            name="lastName"
                            error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            label="Employed Year"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.employedYear}
                            name="employedYear"
                            error={Boolean(touched.employedYear) && Boolean(errors.employedYear)}
                            helperText={touched.employedYear && errors.employedYear}
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            label="Birth Year"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.birthYear}
                            name="birthYear"
                            error={
                                Boolean(touched.birthYear) && Boolean(errors.birthYear)
                            }
                            helperText={touched.birthYear && errors.birthYear}
                            sx={{ gridColumn: "span 1" }}
                        />

                        <TextField
                            label="Phone Number"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.phone}
                            name="phone"
                            error={Boolean(touched.phone) && Boolean(errors.phone)}
                            helperText={touched.phone && errors.phone}
                            sx={{ gridColumn: "span 2" }}
                        />

                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />

                        <Box
                            gridColumn="span 4"
                            border={`1px solid ${colors.primary.main}`}
                            borderRadius="5px"
                            p="1rem"
                        >
                            <Dropzone
                                acceptedFiles=".jpg,.jpeg,.png"
                                multiple={false}
                                onDrop={(acceptedFiles) =>
                                    setFieldValue("picture", acceptedFiles[0])
                                }
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <Box
                                        {...getRootProps()}
                                        border={`2px dashed ${colors.primary.main}`}
                                        borderRadius="5px"
                                        sx={{ "&:hover": { cursor: "pointer" } }}
                                        p="1rem"
                                    >
                                        <input {...getInputProps()} />
                                        {!values.picture ? (
                                            <p style={{ textAlign: "center", margin: 0, padding: 0 }}>Add Picture Here</p>
                                        ) : (
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <Typography>{values.picture.name}</Typography>
                                                <EditOutlinedIcon />
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
                        </Box>


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
                            Create Teacher
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
        // <Formik
        //     onSubmit={ }
        //     initialValues={initialValues}
        //     validationSchema={validationSchema}
        // >
        //     {({
        //         values,
        //         errors,
        //         touched,
        //         handleBlur,
        //         handleChange,
        //         handleSubmit,
        //         setFieldValue,
        //         resetForm,
        //     }) => (
        //         <form onSubmit={handleSubmit}>
        //             <Box
        //                 display="grid"
        //                 gap="20px"
        //                 gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        //                 sx={{
        //                     "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        //                 }}
        //             >

        //                 <TextField
        //                     label="First Name"
        //                     onBlur={handleBlur}
        //                     onChange={handleChange}
        //                     value={values.firstName}
        //                     name="firstName"
        //                     error={
        //                         Boolean(touched.firstName) && Boolean(errors.firstName)
        //                     }
        //                     helperText={touched.firstName && errors.firstName}
        //                     sx={{ gridColumn: "span 2" }}
        //                 />
        //                 <TextField
        //                     label="Last Name"
        //                     onBlur={handleBlur}
        //                     onChange={handleChange}
        //                     value={values.lastName}
        //                     name="lastName"
        //                     error={Boolean(touched.lastName) && Boolean(errors.lastName)}
        //                     helperText={touched.lastName && errors.lastName}
        //                     sx={{ gridColumn: "span 2" }}
        //                 />
        //                 <TextField
        //                     label="Employed Year"
        //                     onBlur={handleBlur}
        //                     onChange={handleChange}
        //                     value={values.employedYear}
        //                     name="employedYear"
        //                     error={Boolean(touched.employedYear) && Boolean(errors.employedYear)}
        //                     helperText={touched.employedYear && errors.employedYear}
        //                     sx={{ gridColumn: "span 1" }}
        //                 />
        //                 <TextField
        //                     label="Birth Year"
        //                     onBlur={handleBlur}
        //                     onChange={handleChange}
        //                     value={values.birthYear}
        //                     name="birthYear"
        //                     error={
        //                         Boolean(touched.birthYear) && Boolean(errors.birthYear)
        //                     }
        //                     helperText={touched.birthYear && errors.birthYear}
        //                     sx={{ gridColumn: "span 1" }}
        //                 />
        //                 <Box
        //                     gridColumn="span 2"
        //                     border={`1px solid ${colors.primary.main}`}
        //                     borderRadius="5px"
        //                 >
        //                     <Dropzone
        //                         acceptedFiles=".jpg,.jpeg,.png"
        //                         multiple={false}
        //                         onDrop={(acceptedFiles) =>
        //                             setFieldValue("picture", acceptedFiles[0])
        //                         }
        //                     >
        //                         {({ getRootProps, getInputProps }) => (
        //                             <Box
        //                                 {...getRootProps()}
        //                                 p="0.2rem"
        //                                 sx={{ "&:hover": { cursor: "pointer" } }}
        //                             >
        //                                 <input {...getInputProps()} />
        //                                 {!values.picture ? (
        //                                     <p style={{ textAlign: "center" }}>Add Picture Here</p>
        //                                 ) : (
        //                                     <Box display="flex" justifyContent="space-between" alignItems="center">
        //                                         <Typography>{values.picture.name}</Typography>
        //                                         <EditOutlinedIcon />
        //                                     </Box>
        //                                 )}
        //                             </Box>
        //                         )}
        //                     </Dropzone>
        //                 </Box>
        //                 <TextField
        //                     label="Email"
        //                     onBlur={handleBlur}
        //                     onChange={handleChange}
        //                     value={values.email}
        //                     name="email"
        //                     error={Boolean(touched.email) && Boolean(errors.email)}
        //                     helperText={touched.email && errors.email}
        //                     sx={{ gridColumn: "span 4" }}
        //                 />
        //                 <TextField
        //                     label="Phone Number"
        //                     onBlur={handleBlur}
        //                     onChange={handleChange}
        //                     value={values.phone}
        //                     name="phone"
        //                     error={Boolean(touched.phone) && Boolean(errors.phone)}
        //                     helperText={touched.phone && errors.phone}
        //                     sx={{ gridColumn: "span 4" }}
        //                 />
        //             </Box>

        //             <Box>
        //                 <Button
        //                     fullWidth
        //                     type="submit"
        //                     sx={{
        //                         m: "2rem 0",
        //                         p: "1rem",
        //                         backgroundColor: colors.primary.main,
        //                         color: colors.background.default,
        //                         "&:hover": { color: colors.primary.main },
        //                     }}
        //                 >
        //                     LOGIN
        //                 </Button>
        //             </Box>
        //         </form >
        //     )
        //     }
        // </Formik >
    )
}