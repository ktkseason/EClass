import { Box, Button, Typography, FormControl, RadioGroup, FormControlLabel, Radio, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLevels, setTotalScore, updateUser } from "state";

export default function Test() {
    const theme = useTheme();
    const colors = theme.palette;
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const student = useSelector(state => state.user);
    const levels = useSelector(state => state.levels);
    const [tests, setTests] = useState(null);
    const [testCount, setTestCount] = useState(0);
    const [time, setTime] = useState(15);
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [score, setScore] = useState(0);
    const intervalRef = useRef(null);

    const startTimer = (time) => {
        intervalRef.current = setInterval(timer, 1000);
        function timer() {
            setTime(time--);
            if (time < 0) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
                navigate(`/timeup`);
            }
        }
    }

    useEffect(() => {
        if (!tests)
            (async () => {
                const tests = await fetch(`http://localhost:3001/tests/readTestRandom`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                setTests(await tests.json());
            })();


        (async () => {
            const response = await fetch("http://localhost:3001/levels/", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const levels = await response.json();
            if (levels) {
                dispatch(
                    setLevels({
                        levels: levels,
                    })
                );
            }
        })();

        startTimer(time);
        return () => clearInterval(intervalRef.current);
    }, []);

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setError(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (tests[testCount].answers[value].right) setScore(score + 25);
        if (testCount < tests.length - 1) {
            setTestCount(testCount + 1)
        } else {
            clearInterval(intervalRef.current);
            dispatch(
                setTotalScore({
                    totalScore: score,
                })
            );
            levels.map(level => {
                (score >= level.minScore && score <= level.maxScore) &&
                    (async () => {
                        const response = await fetch(
                            `http://localhost:3001/students/update/level/${student._id}`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`
                                },
                                body: JSON.stringify({ level: level.title }),
                            }
                        );
                        dispatch(
                            updateUser({
                                user: await response.json(),
                            })
                        );
                    })();
            });
            navigate(`/survey`);
        }
        setValue('');
    };

    return (
        <Box
            minHeight="92vh"
            padding="1rem"
            paddingTop="5rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                margin="auto"
                borderRadius="15px"
                backgroundColor={colors.background.alt}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" gap="1.5rem">
                    <Typography fontWeight="medium" color={colors.text.default}>{testCount + 1} of {tests && tests.length} Questions</Typography>
                    <Typography fontWeight="medium" color={colors.text.default}>{Math.floor(time / 60)} : {time >= 60 ? time - 60 : time}</Typography>
                </Box>
                {tests &&
                    <Box
                        marginTop="2rem"
                    >
                        <Typography variant="h5" color={colors.primary.light}>{tests[testCount].question}</Typography>

                        <form onSubmit={handleSubmit}>
                            <FormControl
                                sx={{
                                    margin: "2rem 1rem 0 1rem",
                                    display: "grid",
                                    gap: "2rem"
                                }}
                                error={error}
                                variant="standard"
                            >
                                <RadioGroup
                                    aria-labelledby="demo-error-radios"
                                    name="test"
                                    value={value}
                                    onChange={handleRadioChange}
                                >
                                    <Box
                                        display="grid"
                                        gap="20px"
                                        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                                        sx={{
                                            "& > *": { gridColumn: isNonMobileScreens ? undefined : "span 2" },
                                        }}
                                    >
                                        {tests[testCount].answers && tests[testCount].answers.map((answer, key) => (
                                            <FormControlLabel sx={{ gridColumn: "span 1" }} key={key} value={key} control={<Radio />} label={answer.answer} />
                                        ))}
                                    </Box>
                                </RadioGroup>
                                {value ?
                                    <Button sx={{
                                        textAlign: "center",
                                        padding: "0.7rem 1.2rem",
                                        borderRadius: "7px",
                                        backgroundColor: colors.primary.main,
                                        fontWeight: "bold",
                                        color: colors.text.btn,
                                        justifySelf: "end",
                                        "&:hover": { backgroundColor: colors.primary.light }
                                    }} type="submit">
                                        Next
                                    </Button>
                                    :
                                    <Button sx={{
                                        textAlign: "center",
                                        padding: "0.7rem 1.2rem",
                                        borderRadius: "7px",
                                        backgroundColor: colors.primary.main,
                                        fontWeight: "bold",
                                        color: colors.text.btn,
                                        justifySelf: "end",
                                        "&:hover": { backgroundColor: colors.primary.light }
                                    }} disabled>
                                        Next
                                    </Button>
                                }
                            </FormControl>
                        </form>
                    </Box >
                }
            </Box >
        </Box>
    )
}