import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLevels } from "state";

export default function Test() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const student = useSelector(state => state.user);
    const levels = useSelector(state => state.levels);
    const { id } = useParams(); // schedule id
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
                navigate(`/timeup/${id}`);
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
        if (tests[testCount].answers[value].right) setScore(score + 10);
        if (testCount < tests.length - 1) {
            setTestCount(testCount + 1)
        } else {
            clearInterval(intervalRef.current);
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
                    })();
            });
            navigate(`/survey/${id}/${score}`);
        }
        setValue('');
    };

    return (
        <Box
            paddingTop="5rem"
            minHeight="92vh"
        >
            {Math.floor(time / 60)} : {time >= 60 ? time - 60 : time}
            {tests &&
                <Box>
                    <Typography>{tests[testCount].question}</Typography>

                    <form onSubmit={handleSubmit}>
                        <FormControl sx={{ m: 3 }} error={error} variant="standard">
                            <RadioGroup
                                aria-labelledby="demo-error-radios"
                                name="test"
                                value={value}
                                onChange={handleRadioChange}
                            >
                                {tests[testCount].answers && tests[testCount].answers.map((answer, key) => (
                                    <FormControlLabel key={key} value={key} control={<Radio />} label={answer.answer} />
                                ))}
                            </RadioGroup>
                            {value ?
                                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                                    Next
                                </Button>
                                :
                                <Button sx={{ mt: 1, mr: 1 }} disabled>
                                    Next
                                </Button>
                            }
                        </FormControl>
                    </form>
                </Box >
            }
        </Box >
    )
}