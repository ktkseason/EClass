import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TestFrame from "./TestFrame";

export default function Test() {
    const navigate = useNavigate();
    const token = useSelector(state => state.token);
    const { id } = useParams(); // schedule id
    const [tests, setTests] = useState(null);
    const [time, setTime] = useState(10);

    function startTimer(time) {
        let counter = setInterval(timer, 1000);
        function timer() {
            setTime(time--);
            if (time < 0) {
                clearInterval(counter);
                navigate(`/timeup/${id}`);
            }
        }
    }

    useEffect(() => {
        (async () => {
            const tests = await fetch(`http://localhost:3001/tests/readTestRandom`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            setTests(await tests.json());
            // startTimer(time);
        })();
    }, []);


    return (
        <Box
            paddingTop="5rem"
            minHeight="92vh"
        >
            {Math.floor(time / 60)} : {time >= 60 ? time - 60 : time}
            {tests && <TestFrame tests={tests} scheduleId={id} />}
        </Box >
    )
}