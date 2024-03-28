import { Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export default function Result() {
    const { id, score } = useParams();
    const navigate = useNavigate();
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
            <Typography variant="h1" fontWeight="bold" color="secondary">Survey Time!</Typography>
        </Box>
    )
}