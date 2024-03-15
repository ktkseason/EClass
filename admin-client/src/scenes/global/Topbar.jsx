import { Box, IconButton, useTheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { setMode } from "state";
import { useDispatch } from "react-redux";

export default function Topbar() {
    const dispatch = useDispatch();
    const theme = useTheme();

    return (
        <Box display="flex" justifyContent="end" height="50px" >
            <IconButton sx={{ position: "fixed", background: `${theme.palette.background.default}`, zIndex: 5, m: "10px 10px 0 0" }} onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                    <DarkModeOutlinedIcon />
                ) : (
                    <LightModeOutlinedIcon />
                )}
            </IconButton>
        </Box>
    )
}