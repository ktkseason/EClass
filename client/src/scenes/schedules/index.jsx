import { Box, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSchedules } from "state";
import Card from "./Card";

export default function Schedules() {
    const isNonMobile = useMediaQuery("(min-width: 1200px)");
    const isBigMobile = useMediaQuery("(min-width: 600px)");
    const dispatch = useDispatch();
    const schedules = useSelector(state => state.schedules);

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:3001/schedules", {
                method: "GET",
            });
            const schedules = await response.json();
            if (schedules) {
                dispatch(
                    setSchedules({
                        schedules: schedules,
                    })
                );
            }
        })();
    }, []);

    return (
        <Box
            minHeight="92vh"
            padding="1rem"
            paddingTop="5rem"
        >
            <Typography marginBottom="2rem" variant="h4" textTransform="uppercase" textAlign="center" color="primary" fontWeight="bold">Course schedules</Typography>
            <Box
                display="grid"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                justifyContent="space-between"
                alignItems="start"
                gap="1rem"
                sx={{
                    "& > div, h4": { gridColumn: isNonMobile ? undefined : isBigMobile ? "span 2" : "span 4" },
                }}
            >
                {schedules && schedules.map((schedule) => schedule.studentNumbers - schedule.registeredStudents.length && <Card key={schedule._id} schedule={schedule} />)}
            </Box>
        </Box>
    )
}