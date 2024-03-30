import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";

export default function TestWelcome() {
    const navigate = useNavigate();
    const student = useSelector(state => state.user);
    const schedule = useSelector(state => state.schedule);
    const theme = useTheme();
    const colors = theme.palette;

    return (
        <Box
            minHeight="92vh"
            paddingTop="5rem"
            textAlign="center"
            maxWidth="30rem"
            margin="auto"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Typography marginBottom="2rem" variant="h3" fontWeight="bold" color="primary">Welcome to <span style={{ color: colors.secondary.main }}>{schedule.courseTitle}</span></Typography>
            <Typography color={colors.text.default} variant="h6" fontWeight="medium">The course will begin on <span style={{ color: colors.secondary.main, fontWeight: "bold" }}>{format(schedule.startDate, "MMM d, y")}</span> at <span style={{ color: colors.secondary.main, fontWeight: "bold" }}>{schedule.time}</span> and <span style={{ color: colors.secondary.main, fontWeight: "bold" }}>{schedule.location}</span>. Further classroom information will be sent to <span style={{ color: colors.secondary.main, fontWeight: "bold" }}>{student.email}</span> so, stay tune.</Typography>
            <Box display="flex" justifyContent="center" alignItems="center" marginTop="2.7rem">
                <Button
                    onClick={() => { navigate(`/`) }}
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
                >Back To Home</Button>
            </Box>
        </Box>
    )
}