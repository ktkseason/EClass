import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setEduBackgrounds } from "state";
import Dropzone from "react-dropzone";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phone: yup.string().required("required"),
    password: yup.string().required("required"),
    birthYear: yup.number().required("required"),
    eduBackground: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    birthYear: "",
    eduBackground: "",
    picture: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};

export default function Form() {
    const [pageType, setPageType] = useState("login");
    const theme = useTheme();
    const colors = theme.palette;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const eduBackgrounds = useSelector(state => state.eduBackgrounds);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    useEffect(() => {
        if (!eduBackgrounds) {
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
        }
    }, []);

    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("imgPath", values.picture.name);

        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login");
        }
    };

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.student,
                    token: loggedIn.token,
                })
            );
            navigate("/");
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
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
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >
                        {isRegister && (
                            <>
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

                                <FormControl sx={{ gridColumn: "span 4" }}>
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
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {(Array.isArray(eduBackgrounds) ? eduBackgrounds.map(({ _id, title }) => ([_id, title])) : Object.entries(eduBackgrounds)).map(([_id, title]) => {
                                            return (
                                                <MenuItem key={_id} value={title}>
                                                    {title}
                                                </MenuItem>
                                            )
                                        })} // some bug here
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
                                                        <Typography>{values.picture.name}</Typography>
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
                            </>
                        )}

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
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
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
                                color: colors.background.alt,
                                "&:hover": { backgroundColor: colors.primary.light },
                            }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: colors.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: colors.primary.light,
                                },
                            }}
                        >
                            {isLogin
                                ? "New student? Register here."
                                : "Old student? Login here."}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    );
};
