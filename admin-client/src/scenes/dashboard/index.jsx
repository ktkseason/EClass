import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "components/StatBox";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PieChart from "components/PieChart";
import { useSelector } from "react-redux";

export default function Dashboard() {
    const theme = useTheme();
    const colors = theme.palette;
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const isBigMobile = useMediaQuery("(min-width: 800px)");
    const teachers = useSelector(state => state.teachers);
    const students = useSelector(state => state.students);
    const courses = useSelector(state => state.courses);
    const schedules = useSelector(state => state.schedules);

    return (
        <Box
            padding="1rem"
            paddingTop="4rem"
        >
            <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start">
                <Header title="DASHBOARD" subtitle="Welcome Admin." />

                <Box
                    display="grid"
                    gridTemplateColumns="repeat(4, 1fr)"
                    gridAutoRows="8rem"
                    gap="1rem"
                    width="100%"
                    sx={{
                        // "& > div": { gridColumn: isNonMobile ? undefined : isBigMobile ? "span 2" : "span 4" },
                    }}
                >

                    <Box
                        gridColumn="span 2"
                        gridRow="span 2"
                        backgroundColor={colors.background.alt}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="600"
                            sx={{ padding: "30px 30px 0 30px" }}
                        >
                            Student Levels and Number of Students
                        </Typography>
                        <Box height="250px" mt="-20px">
                            <PieChart isDashboard={true} />
                        </Box>
                    </Box>

                    <StatBox
                        gridColumn="span 1"
                        title={teachers.length}
                        subtitle="Teachers"
                        progress={teachers.length / 100}
                        icon={
                            <GroupsOutlinedIcon
                                sx={{ color: colors.secondary.light, fontSize: "26px" }}
                            />
                        }
                    />

                    <StatBox
                        gridColumn="span 1"
                        title={students.length}
                        subtitle="Students"
                        progress={students.length / 100}
                        icon={
                            <GroupsOutlinedIcon
                                sx={{ color: colors.secondary.light, fontSize: "26px" }}
                            />
                        }
                    />

                    <StatBox
                        gridColumn="span 1"
                        title={courses.length}
                        subtitle="Courses"
                        progress={courses.length / 100}
                        icon={
                            <GroupsOutlinedIcon
                                sx={{ color: colors.secondary.light, fontSize: "26px" }}
                            />
                        }
                    />

                    <StatBox
                        gridColumn="span 1"
                        title={schedules.length}
                        subtitle="Schedules"
                        progress={schedules.length / 100}
                        icon={
                            <GroupsOutlinedIcon
                                sx={{ color: colors.secondary.light, fontSize: "26px" }}
                            />
                        }
                    />

                    <Box
                        gridColumn="span 4"
                        gridRow="span 2"
                        backgroundColor={colors.background.alt}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="600"
                            sx={{ padding: "30px 30px 0 30px" }}
                        >
                            Background Educations and Student Levels
                        </Typography>
                        <Box height="250px" mt="-20px">
                            <BarChart isDashboard={true} />
                        </Box>
                    </Box>

                    <Box
                        gridColumn="span 4"
                        gridRow="span 2"
                        backgroundColor={colors.background.alt}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="600"
                            sx={{ padding: "30px 30px 0 30px" }}
                        >
                            Student Preparations, Emotions and Scores
                        </Typography>
                        <Box height="250px" mt="-20px">
                            <LineChart isDashboard={true} />
                        </Box>
                    </Box>

                </Box>
            </Box>
        </Box>
    )
}

