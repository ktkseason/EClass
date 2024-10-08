import { Box, Typography, Button, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "state";

export default function Result() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.token);
    const student = useSelector(state => state.user);
    const score = useSelector(state => state.totalScore);
    const schedule = useSelector(state => state.schedule);
    const levels = useSelector(state => state.levels);
    const theme = useTheme();
    const colors = theme.palette;

    return (
        <Box
            minHeight="92vh"
            padding="1rem"
            paddingTop="5rem"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="4rem"
        >
            <Box
                maxWidth="30rem"
                textAlign="center"
            >
                <Typography variant="h3" fontWeight="bold" color="secondary" marginBottom="1rem">Your score is {score}.</Typography>
                {levels.map(level => level.title === schedule.courseLevel && level.minScore).filter(score => score === 0 || score && score)[0] > levels.map(level => level.title === student.level && level.minScore).filter(score => score === 0 || score && score)[0] &&
                    <Typography variant="h6" color={colors.text.alt}>We are sorry. The score of the test is not qualified for the course. Please try again.</Typography>
                }
            </Box>
            {levels.map(level => level.title === schedule.courseLevel && level.minScore).filter(score => score === 0 || score && score)[0] <= levels.map(level => level.title === student.level && level.minScore).filter(score => score === 0 || score && score)[0] ?
                <Button
                    onClick={() => {
                        (async () => {
                            const values = {
                                scheduleId: schedule._id,
                                courseTitle: schedule.courseTitle,
                                courseLevel: schedule.courseLevel,
                                teacherFirstName: schedule.teacherFirstName,
                                teacherLastName: schedule.teacherLastName,
                                scheduleStartDate: schedule.startDate,
                            };
                            const response = await fetch(
                                `http://localhost:3001/students/update/coursestaken/${student._id}`,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": `Bearer ${token}`
                                    },
                                    body: JSON.stringify(values),
                                }
                            );
                            dispatch(
                                updateUser({
                                    user: await response.json(),
                                })
                            );
                        })();
                        (async () => {
                            const values = {
                                studentId: student._id,
                                studentFirstName: student.firstName,
                                studentLastName: student.lastName
                            };
                            const response = await fetch(
                                `http://localhost:3001/schedules/update/registeredStudents/${schedule._id}`,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": `Bearer ${token}`
                                    },
                                    body: JSON.stringify(values),
                                }
                            );
                            await response.json();
                        })();
                        navigate(`/welcome`);
                    }}
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
                >Register</Button>
                :
                <Button
                    onClick={() => { navigate(`/schedules`) }}
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
                >Back To Schedules</Button>
            }
            {/* This will later become checkout button which will redirect to payment options page and payment process. */}
        </Box>
    )
}