import { Box, IconButton, useTheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { setMode } from "state";
import { useDispatch } from "react-redux";

export default function Topbar() {
    const dispatch = useDispatch();
    const theme = useTheme();

    return (
        <Box display="flex" justifyContent="end" >
            <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                    <DarkModeOutlinedIcon />
                ) : (
                    <LightModeOutlinedIcon />
                )}
            </IconButton>
        </Box>
    )
}