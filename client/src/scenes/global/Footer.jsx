import { Box, Typography, useTheme } from "@mui/material";

export default function Footer() {
    const theme = useTheme();
    const colors = theme.palette;

    return (
        <Box display="flex" justifyContent="center" alignItems="center" padding="0.7rem" backgroundColor={colors.background.alt}>
            <Typography><Typography color="primary" fontWeight="bold" variant="h6" display="inline">EClass</Typography> copyright &copy; 2024.</Typography>
        </Box >
    )
}