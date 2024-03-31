import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { setEduBackgrounds } from "state";
import { useEffect } from "react";
import { updateUser } from "state";

export default function Form({ edit, setEdit }) {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const student = useSelector(state => state.user);
    const eduBackgrounds = useSelector(state => state.eduBackgrounds);
    const theme = useTheme();
    const colors = theme.palette;
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const validationSchema = yup.object().shape({
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        email: yup.string().email("invalid email").required("required"),
        phone: yup.string().required("required"),
        password: yup.string().required("required"),
        birthYear: yup.number().required("required"),
        eduBackground: yup.string().required("required"),
        picture: yup.string().required("required"),
    });

    const initialValues = {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phone: student.phone,
        password: student.password,
        birthYear: student.birthYear,
        eduBackground: student.eduBackground,
        picture: student.imgPath,
    };

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:3001/eduBackgrounds/", {
                method: "GET",
            });
            const eduBackgrounds = await response.json();
            if (eduBackgrounds) {
                dispatch(
                    setEduBackgrounds({
                        eduBackgrounds: eduBackgrounds,
                    })
                );
            }
        })();
    }, []);

    const handleFormSubmit = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("imgPath", values.picture.name || values.picture);
        const response = await fetch(
            `http://localhost:3001/students/update/${student._id}`,
            {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            }
        );
        const user = await response.json();

        if (user) {
            dispatch(
                updateUser({
                    user: user,
                })
            );
        }

        setEdit(!edit);
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
                            label="Birth Year"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.birthYear}
                            name="birthYear"
                            error={Boolean(touched.birthYear) && Boolean(errors.birthYear)}
                            helperText={touched.birthYear && errors.birthYear}
                            sx={{ gridColumn: "span 2" }}
                        />

                        <FormControl sx={{ gridColumn: "span 2" }}>
                            <InputLabel id="demo-simple-select-helper-label">Education Background</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Education Background"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.eduBackground}
                                name="eduBackground"
                                error={
                                    Boolean(touched.eduBackground) && Boolean(errors.eduBackground)
                                }
                            >
                                {(Array.isArray(eduBackgrounds) ? eduBackgrounds.map(({ _id, title }) => ([_id, title])) : Object.entries(eduBackgrounds)).map(([_id, title]) => {
                                    return (
                                        <MenuItem key={_id} value={title}>
                                            {title}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

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
                                            <p>Add Picture Here</p>
                                        ) : (
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <Typography>{values.picture.name || values.picture}</Typography>
                                                <EditOutlinedIcon />
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
                        </Box>

                        <TextField
                            label="Phone"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.phone}
                            name="phone"
                            error={Boolean(touched.phone) && Boolean(errors.phone)}
                            helperText={touched.phone && errors.phone}
                            sx={{ gridColumn: "span 4" }}
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
                            Update Information
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    )
}