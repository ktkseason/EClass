import { Box, IconButton, useTheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import { setMode } from "state";
import { useDispatch } from "react-redux";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = theme.palette;

    return (
        <Box display="flex" justifyContent="end">
            <Box width="100%" position="fixed" zIndex="5" padding="0.5rem 1rem" display="flex" justifyContent="end" alignItems="center" gap="0.5rem" backgroundColor={colors.background.default}>
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton onClick={() => { dispatch(setLogout()); navigate("/") }}>
                    <LogoutIcon sx={{ fontSize: "24px" }} />
                </IconButton>
            </Box>
        </Box>
    )
}