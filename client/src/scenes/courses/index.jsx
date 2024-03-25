import { Box, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCourses } from "state";
import Card from "./Card";

export default function Courses() {
    const isNonMobile = useMediaQuery("(min-width: 1200px)");
    const isBigMobile = useMediaQuery("(min-width: 600px)");
    const dispatch = useDispatch();
    const courses = useSelector(state => state.courses);

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:3001/courses", {
                method: "GET",
            });
            const courses = await response.json();
            if (courses) {
                dispatch(
                    setCourses({
                        courses: courses,
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
                <Typography variant="h4" textTransform="uppercase" textAlign="center" color="primary" fontWeight="bold">Explore Our Courses</Typography>
                {courses && courses.map((course) => <Card key={course._id} course={course} />)}
            </Box>
        </Box>
    )
}