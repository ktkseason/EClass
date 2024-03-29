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
                onClick={() => { navigate(`/welcome/${id}`) }}
                // at welcome <= welcome to the course, the course will begin on {} at {} and {online}. classroom information will be sent to {user.email} so, stay tune. and call to action will be {back to home}
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
            >Register</Button>
            {/* This will later become checkout button which will redirect to payment options page and payment process. */}
        </Box>
    )
}