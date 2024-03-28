import { Box, Button, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TestFrame({ tests, scheduleId }) {
    const navigate = useNavigate();
    const [testCount, setTestCount] = useState(0);
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [score, setScore] = useState(0);

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setError(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (tests[testCount].answers[value].right) setScore(score + 10);
        testCount < tests.length - 1 ? setTestCount(testCount + 1) : navigate(`/survey/${scheduleId}/${score}`);
        setValue('');
    };

    return (
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
                    <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                        Next
                    </Button>
                </FormControl>
            </form>
        </Box >

    )
}