import { Box, Typography, useTheme, Avatar, Divider, Button } from "@mui/material";
import { format } from "date-fns";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";

export default function Card({ schedule }) {
    const theme = useTheme();
    const colors = theme.palette;
    const navigate = useNavigate();
    const isAuth = Boolean(useSelector((state) => state.token));

    return (
        <Box
            padding="1.5rem"
            borderRadius="15px"
            backgroundColor={colors.secondary.dark}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="start"
            height="100%"
        >
            <Box width="100%">
                <Typography variant="h5" color={colors.secondary.light} fontWeight="bold">{schedule.courseTitle}</Typography>
                <Typography fontWeight="bold" fontSize="12px" color={colors.secondary.main}>{schedule.courseLevel}</Typography>
                <Box display="flex" justifyContent="center" alignItems="center" gap="0.5rem" marginTop="1.5rem" color={colors.text.default}>
                    <Typography variant="h6" >{schedule.courseDuration} <span style={{ fontSize: "10px" }}>Months</span></Typography>
                    <Typography variant="h6">-</Typography>
                    <Typography variant="h6">{schedule.coursePrice} <span style={{ fontSize: "10px" }}>MMK</span></Typography>
                </Box>
            </Box>

            <Box width="100%" marginY="1rem">
                <Box
                    display="flex"
                    justifyContent="start"
                    gap="1rem"
                    alignItems="center"
                    marginY="1rem"
                >
                    <Avatar
                        sx={{
                            width: "36px",
                            height: "36px",
                        }}
                        src={`http://localhost:3001/assets/${schedule.teacherImgPath}`}
                    />
                    <Box>
                        <Typography variant="h6" color="secondary">{schedule.teacherFirstName} {schedule.teacherLastName}</Typography>
                    </Box>
                </Box>
            </Box>

            <Divider width="99%" />

            <Box width="100%" marginY="1rem">
                <Box display="flex" justifyContent="space-between" alignItems="center" gap="1rem" marginBottom="0.5rem">
                    <Typography variant="h6" fontWeight="bold" color={colors.text.default}>{format(schedule.startDate, "MMM d, y")}</Typography>
                    <Typography fontWeight="bold" color={colors.text.default}>{schedule.time}</Typography>
                </Box>
                <Typography fontSize="12px" fontWeight="bold" color={colors.primary.main} marginBottom="1rem">{schedule.location}.</Typography>
                <Typography textAlign="center" border={`3px dashed ${colors.primary.main}`} borderRadius="7px" padding="1rem" variant="h5" color={colors.text.alt} fontWeight="medium" marginBottom="1.5rem">{schedule.studentNumbers - schedule.registeredStudents.length} Seats Left.</Typography>
                <Typography color={colors.text.default}>{schedule.description}</Typography>
            </Box>
            <Button
                onClick={() => { isAuth ? navigate("/tests/welcome") : navigate("/login") }}
                fullWidth
                sx={{
                    textAlign: "center",
                    fontSize: "14px",
                    paddingY: "1rem",
                    borderRadius: "7px",
                    backgroundColor: colors.secondary.main,
                    fontWeight: "bold",
                    color: colors.text.btn,
                    "&:hover": { backgroundColor: colors.secondary.light }
                }}
            >Register</Button>
        </Box>
    )
}