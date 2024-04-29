import { Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TimeUp() {
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
            <Typography variant="h3" fontWeight="bold" color="primary">Time is up.</Typography>
            <Button
                onClick={() => { navigate(`/test`) }}
                sx={{
                    textAlign: "center",
                    fontSize: "14px",
                    padding: "1rem 2rem",
                    borderRadius: "7px",
                    backgroundColor: colors.primary.main,
                    fontWeight: "bold",
                    color: colors.text.btn,
                    "&:hover": { backgroundColor: colors.secondary.light }
                }}
            >Retake Test</Button>
        </Box>
    )
}