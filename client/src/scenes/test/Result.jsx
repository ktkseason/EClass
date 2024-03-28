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
            <Typography variant="h1" fontWeight="bold" color="secondary">You are done with score {score}.</Typography>
            <Button
                onClick={() => { navigate(`/test/${id}`) }}
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
            >Retake Test</Button>
        </Box>
    )
}