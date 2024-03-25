import { useState } from "react";
import {
    Box,
    IconButton,
    Button,
    Typography,
    useTheme,
    useMediaQuery,
    Avatar,
} from "@mui/material";
import {
    Login,
    DarkMode,
    LightMode,
    Menu,
    Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "state";
import { useNavigate } from "react-router-dom";

export default function Nav() {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = Boolean(useSelector((state) => state.token));
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();
    const colors = theme.palette;

    return (
        <Box position="fixed" width="100%" display="flex" justifyContent="space-between" alignItems="center" padding="0.7rem 1rem" backgroundColor={colors.background.alt} zIndex="9">
            <Box>
                <Typography
                    fontWeight="bold"
                    variant="h3"
                    color="primary"
                    onClick={() => { navigate("/"); isMobileMenuToggled && setIsMobileMenuToggled(!isMobileMenuToggled) }}
                    sx={{
                        "&:hover": {
                            color: colors.secondary.main,
                            cursor: "pointer",
                        },
                    }}
                >
                    EClass
                </Typography>
            </Box>

            {isNonMobileScreens ? (
                <Box display="flex" justifyContent="space-between" alignContent="center" gap="0.7rem"
                    sx={{
                        "& > button:hover": { backgroundColor: colors.background.alt }
                    }}
                >

                    <Button
                        onClick={() => navigate("/about")}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            color: colors.text.default,
                            "&:hover": {
                                color: colors.secondary.main,
                                cursor: "pointer",
                            },
                        }}
                    >
                        <Typography variant="h6">About</Typography>
                    </Button>
                    <Button
                        onClick={() => navigate("/schedules")}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            color: colors.text.default,
                            "&:hover": {
                                color: colors.secondary.main,
                                cursor: "pointer",
                            },
                        }}
                    >
                        <Typography variant="h6">Schedules</Typography>
                    </Button>
                    <Button
                        onClick={() => navigate("/courses")}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            color: colors.text.default,
                            "&:hover": {
                                color: colors.secondary.main,
                                cursor: "pointer",
                            },
                        }}
                    >
                        <Typography variant="h6">Courses</Typography>
                    </Button >
                    <Button
                        onClick={() => navigate("/teachers")}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            color: colors.text.default,
                            "&:hover": {
                                color: colors.secondary.main,
                                cursor: "pointer",
                            },
                        }}
                    >
                        <Typography variant="h6">Teachers</Typography>
                    </Button >
                    <Button
                        onClick={() => navigate("/contact")}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            color: colors.text.default,
                            "&:hover": {
                                color: colors.secondary.main,
                                cursor: "pointer",
                            },
                        }}
                    >
                        <Typography variant="h6">Contact</Typography>
                    </Button >

                    {
                        isAuth ?
                            <IconButton onClick={() => navigate("/profile")}>
                                {/* I guess */}
                                <Avatar
                                    sx={{
                                        width: "24px",
                                        height: "24px"
                                    }}
                                    src={`http://localhost:3001/assets/${user.imgPath}`}
                                />
                            </IconButton >
                            :
                            <IconButton onClick={() => navigate("/login")}>
                                <Login />
                            </IconButton>
                    }

                    <IconButton onClick={() => dispatch(setMode())}>
                        {colors.mode === "dark" ? (
                            <LightMode sx={{ fontSize: "24px" }} />
                        ) : (
                            <DarkMode sx={{ fontSize: "24px" }} />
                        )}
                    </IconButton>

                </Box >
            ) : (
                <IconButton
                    onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                    <Menu />
                </IconButton>
            )
            }

            {
                !isNonMobileScreens && isMobileMenuToggled && (
                    <Box
                        position="fixed"
                        right="0"
                        bottom="0"
                        height="100%"
                        zIndex="10"
                        maxWidth="500px"
                        minWidth="300px"
                        backgroundColor={colors.background.alt}
                    >
                        {/* CLOSE ICON */}
                        <Box display="flex" justifyContent="flex-end" p="1rem">
                            <IconButton
                                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                            >
                                <Close />
                            </IconButton>
                        </Box>

                        {/* MENU ITEMS */}
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            gap="1rem"
                        >

                            <Button
                                fullWidth
                                onClick={() => { navigate("/about"); setIsMobileMenuToggled(!isMobileMenuToggled) }}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    color: colors.text.default,
                                    py: "1rem",
                                    "&:hover": {
                                        color: colors.secondary.main,
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                <Typography variant="h6">About</Typography>
                            </Button>
                            <Button
                                fullWidth
                                onClick={() => { navigate("/schedules"); setIsMobileMenuToggled(!isMobileMenuToggled) }}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    color: colors.text.default,
                                    py: "1rem",
                                    "&:hover": {
                                        color: colors.secondary.main,
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                <Typography variant="h6">Schedules</Typography>
                            </Button>
                            <Button
                                fullWidth
                                onClick={() => { navigate("/courses"); setIsMobileMenuToggled(!isMobileMenuToggled) }}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    color: colors.text.default,
                                    py: "1rem",
                                    "&:hover": {
                                        color: colors.secondary.main,
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                <Typography variant="h6">Courses</Typography>
                            </Button >
                            <Button
                                fullWidth
                                onClick={() => { navigate("/teachers"); setIsMobileMenuToggled(!isMobileMenuToggled) }}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    color: colors.text.default,
                                    py: "1rem",
                                    "&:hover": {
                                        color: colors.secondary.main,
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                <Typography variant="h6">Teachers</Typography>
                            </Button >
                            <Button
                                fullWidth
                                onClick={() => { navigate("/contact"); setIsMobileMenuToggled(!isMobileMenuToggled) }}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    color: colors.text.default,
                                    py: "1rem",
                                    "&:hover": {
                                        color: colors.secondary.main,
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                <Typography variant="h6">Contact</Typography>
                            </Button >

                            {
                                isAuth ?
                                    <IconButton onClick={() => {
                                        navigate(`students/${user._id
                                            }`); setIsMobileMenuToggled(!isMobileMenuToggled)
                                    }}>
                                        {/* I guess */}
                                        <Avatar src={`http://localhost:3001/assets/${user.imgPath}`} />
                                    </IconButton >
                                    :
                                    <IconButton onClick={() => { navigate("/login"); setIsMobileMenuToggled(!isMobileMenuToggled) }}>
                                        <Login />
                                    </IconButton>
                            }

                            <IconButton
                                onClick={() => { dispatch(setMode()); setIsMobileMenuToggled(!isMobileMenuToggled) }}
                            >
                                {theme.palette.mode === "dark" ? (
                                    <LightMode sx={{ fontSize: "28px" }} />
                                ) : (
                                    <DarkMode sx={{ fontSize: "28px" }} />
                                )}
                            </IconButton>
                        </Box >
                    </Box >
                )
            }
        </Box >
    )
}