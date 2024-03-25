import { Box, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTeachers } from "state";
import Card from "./Card";

export default function Teachers() {
    const isNonMobile = useMediaQuery("(min-width: 1200px)");
    const isBigMobile = useMediaQuery("(min-width: 600px)");
    const dispatch = useDispatch();
    const teachers = useSelector(state => state.teachers);

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:3001/teachers", {
                method: "GET",
            });
            const teachers = await response.json();
            if (teachers) {
                dispatch(
                    setTeachers({
                        teachers: teachers,
                    })
                );
            }
        })();
    }, []);

    return (
        <Box minHeight="92vh">
            <Box
                display="grid"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                justifyContent="space-between"
                alignItems="center"
                gap="1rem"
                padding="1rem"
                paddingTop="5rem"
                sx={{
                    "& > div, h4": { gridColumn: isNonMobile ? undefined : isBigMobile ? "span 2" : "span 4" },
                }}
            >
                <Typography variant="h4" textTransform="uppercase" textAlign="center" color="primary" fontWeight="bold">Meet Our Teachers</Typography>
                {teachers && teachers.map((teacher) => <Card key={teacher._id} teacher={teacher} />)}
            </Box>
        </Box>
    )
}