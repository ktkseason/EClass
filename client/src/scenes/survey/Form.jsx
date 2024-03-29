import { Box, Button, Select, useTheme, useMediaQuery } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setEmotions, setPreps } from "state";

const validationSchema = yup.object().shape({
    emotion: yup.string().required("required"),
    prep: yup.string().required("required"),
});

const initialValues = {
    emotion: "",
    prep: "",
};

export default function Form() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const score = useSelector(state => state.totalScore);
    const emotions = useSelector(state => state.emotions);
    const preps = useSelector(state => state.preps);
    const token = useSelector(state => state.token);
    const student = useSelector(state => state.user);
    const theme = useTheme();
    const colors = theme.palette;
    const isNonMobile = useMediaQuery("(min-width:600px)");

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:3001/emotions/", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const emotions = await response.json();
            if (emotions) {
                dispatch(
                    setEmotions({
                        emotions: emotions,
                    })
                );
            }
        })();
        (async () => {
            const response = await fetch("http://localhost:3001/preps/", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const preps = await response.json();
            if (preps) {
                dispatch(
                    setPreps({
                        preps: preps,
                    })
                );
            }
        })();
    }, [])

    const handleFormSubmit = async (values) => {
        values = { ...values, score: score };
        const response = await fetch(
            `http://localhost:3001/students/update/testResults/${student._id}`,
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
        navigate(`/result`);
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
                        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                        }}
                    >
                        <FormControl sx={{ gridColumn: "span 1" }}>
                            <InputLabel id="demo-simple-select-helper-label">Preparation</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Preparation"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.prep}
                                name="prep"
                                error={
                                    Boolean(touched.prep) && Boolean(errors.prep)
                                }
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {(Array.isArray(preps) ? preps.map(({ _id, title }) => ([_id, title])) : Object.entries(preps)).map(([_id, title]) => {
                                    return (
                                        <MenuItem key={_id} value={title}>
                                            {title}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ gridColumn: "span 1" }}>
                            <InputLabel id="demo-simple-select-helper-label">Emotion</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Emotion"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.emotion}
                                name="emotion"
                                error={
                                    Boolean(touched.emotion) && Boolean(errors.emotion)
                                }
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {(Array.isArray(emotions) ? emotions.map(({ _id, title }) => ([_id, title])) : Object.entries(emotions)).map(([_id, title]) => {
                                    return (
                                        <MenuItem key={_id} value={title}>
                                            {title}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box>
                        <Button
                            type="submit"
                            sx={{
                                textAlign: "center",
                                fontSize: "14px",
                                padding: "1rem 2rem",
                                borderRadius: "7px",
                                backgroundColor: colors.secondary.main,
                                fontWeight: "bold",
                                color: colors.text.btn,
                                "&:hover": { backgroundColor: colors.secondary.light }
                            }}
                        >Submit</Button>
                    </Box>
                </form>
            )}
        </Formik>
    )
}