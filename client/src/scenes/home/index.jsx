import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLatestSchedule } from "state";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const isNonMobile = useMediaQuery("(min-width: 800px)");
    const theme = useTheme();
    const colors = theme.palette;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const latestSchedule = useSelector(state => state.latestSchedule);

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:3001/schedules/latest", {
                method: "GET",
            });
            const latestSchedule = await response.json();
            if (latestSchedule) {
                dispatch(
                    setLatestSchedule({
                        latestSchedule: latestSchedule,
                    })
                );
            }
        })();
    }, [])

    return (
        <Box
            display="grid"
            gridTemplateColumns="repeat(3, minmax(0, 1fr))"
            gridAutoRows="35vh"
            justifyContent="space-between"
            gap={isNonMobile ? "2rem" : "5rem"}
            padding="1rem"
            paddingTop="5rem"
            sx={{
                "& > div, button": { gridColumn: isNonMobile ? undefined : "span 3" },
            }}
        >
            <Box gridColumn="span 2" padding="2rem">
                <Typography fontWeight="bold" variant="h1" sx={{ marginBottom: "0.3rem" }} color="primary">Welcome</Typography>
                <Typography fontWeight="bold" variant="h5" sx={{ marginBottom: "1rem" }} color="secondary">EClass English Language Traing Center</Typography>
                <Typography fontWeight="medium" textAlign="justify" color={colors.text.default}>Welcome to EClass! Whether you're a novice or a seasoned learner, our engaging lessons and experienced instructors will guide you through the exciting world of English. Join us as we embark on this educational journey together!</Typography>
            </Box>

            {latestSchedule &&
                <Box
                    gridColumn="span 1"
                    gridRow="span 2"
                    backgroundColor={colors.secondary.dark}
                    color={colors.text.alt}
                    padding="1rem 2rem"
                    borderRadius="15px"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Typography
                        fontWeight="bold"
                        variant="h6"
                        color={colors.secondary.main}
                        textTransform="uppercase"
                        marginBottom="4rem"
                    >Latest Schedule</Typography>
                    <Typography
                        fontWeight="bold"
                        variant="h4"
                        color={colors.primary.light}
                        textTransform="uppercase"
                        marginBottom="0.3rem"
                    >{latestSchedule[0].courseTitle}</Typography>
                    <Typography
                        fontWeight="bold"
                        variant="h6"
                        color="primary"
                        textTransform="uppercase"
                        marginBottom="1rem"
                    >{latestSchedule[0].courseLevel}</Typography>
                    <Typography
                        fontWeight="bold"
                        textTransform="uppercase"
                        marginBottom="2rem"
                    >{latestSchedule[0].courseDuration} months</Typography>
                    <Typography
                        variant="h6"
                        padding="1rem 3rem"
                        borderRadius="10px"
                        border={`3px dashed ${colors.primary.main}`}
                        marginBottom="3rem"
                    >{latestSchedule[0].studentNumbers} Students Only</Typography>
                    <Button
                        onClick={() => navigate("/schedules")}
                        fullWidth
                        sx={{
                            textAlign: "center",
                            fontSize: "14px",
                            paddingY: "15px",
                            borderRadius: "7px",
                            backgroundColor: `${colors.secondary.main}`,
                            fontWeight: "bold",
                            color: `${colors.text.btn}`
                        }}
                    >View More</Button>
                </Box>
            }

            <Button
                onClick={() => { navigate("/teachers") }}
                fullWidth
                sx={{
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    height: "100%",
                    color: `${colors.text.btn}`,
                    backgroundColor: `${colors.secondary.main}`,
                    borderRadius: `15px`,
                    padding: "1.3rem",
                    transition: "0.5s ease",
                    "&:hover": {
                        backgroundColor: `${colors.secondary.dark}`,
                    },
                    "&:hover .header": {
                        color: `${colors.primary.light}`
                    },
                }}
            >
                <Typography
                    className="header"
                    fontWeight="bold"
                    variant="h6"
                    color={colors.primary.dark}
                    marginBottom="2rem"
                    transition="0.5s ease"
                >Meet our talented Teachers</Typography>
                <Typography
                    textAlign="start"
                    fontWeight="bold"
                    variant="h5"
                >Our well experienced teachers can bring your improved English skills and communication skills.</Typography>

            </Button>

            <Button
                onClick={() => { navigate("/courses") }}
                fullWidth
                sx={{
                    textAlign: "start",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    height: "100%",
                    color: `${colors.text.btn}`,
                    backgroundColor: `${colors.primary.main}`,
                    borderRadius: `15px`,
                    padding: "1.3rem",
                    transition: "0.5s ease",
                    "&:hover": {
                        backgroundColor: `${colors.primary.dark}`,
                    },
                    "&:hover .header": {
                        color: `${colors.secondary.light}`
                    },
                }}
            >
                <Typography
                    className="header"
                    fontWeight="bold"
                    variant="h6"
                    color={colors.secondary.dark}
                    marginBottom="2rem"
                    transition="0.5s ease"
                >Explore out brilliant courses</Typography>
                <Typography
                    fontWeight="bold"
                    variant="h5"
                >Our well defined course outlines can make your learning more interesting and effective.</Typography>

            </Button>
        </Box>
    )
}