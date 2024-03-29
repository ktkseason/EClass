import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";

export default function TestWelcome() {
    const navigate = useNavigate();
    const schedule = useSelector(state => state.schedule);
    const theme = useTheme();
    const colors = theme.palette;

    return (
        <Box
            minHeight="92vh"
            paddingTop="7rem"
            textAlign="center"
            maxWidth="30rem"
            margin="auto"
        >
            <Typography marginBottom="2rem" variant="h3" fontWeight="bold" color="primary">Welcome to Test</Typography>
            <Typography color={colors.text.default} variant="h6" fontWeight="medium">You are taking placement test for <span style={{ color: colors.secondary.main, fontWeight: "bold" }}>{schedule.courseTitle}</span> taught by Teacher <span style={{ color: colors.primary.main, fontWeight: "bold" }}>{schedule.teacherFirstName} {schedule.teacherLastName}</span> which will start on <span style={{ color: colors.secondary.light, fontWeight: "bold" }}>{schedule.startDate}</span>. By taking the test, you will able to register the class when you qualify for the level of the course. No matter what, the result of the test will be attached to your profile whether you qualify or not to the class. Enjoy your test. Good Luck. </Typography>
            <Box display="flex" justifyContent="center" alignItems="center" gap="2.7rem" marginTop="2.7rem">
                <Button
                    onClick={() => { navigate("/schedules") }}
                    sx={{
                        flex: 1,
                        textAlign: "center",
                        fontSize: "14px",
                        paddingY: "1rem",
                        borderRadius: "7px",
                        backgroundColor: colors.secondary.dark,
                        fontWeight: "bold",
                        color: colors.text.btn,
                        "&:hover": { color: colors.text.default }
                    }}
                >Go Back</Button>
                <Button
                    onClick={() => { navigate(`/test`) }}
                    sx={{
                        flex: 1,
                        textAlign: "center",
                        fontSize: "14px",
                        paddingY: "1rem",
                        borderRadius: "7px",
                        backgroundColor: colors.secondary.main,
                        fontWeight: "bold",
                        color: colors.text.btn,
                        "&:hover": { backgroundColor: colors.secondary.light }
                    }}
                >Start Test</Button>
            </Box>
        </Box>
    )
}