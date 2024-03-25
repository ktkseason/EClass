import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

export default function Login() {
    const theme = useTheme();
    const colors = theme.palette;
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
        <Box
            minHeight="92vh"
            padding="1rem"
            paddingTop="5rem"
        >
            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                margin="auto"
                borderRadius="15px"
                backgroundColor={colors.background.alt}
            >
                <Typography fontWeight="bold" variant="h5" sx={{ mb: "1.5rem" }} color="primary">
                    Welcome to EClass, student!
                </Typography>
                <Form />
            </Box>
        </Box>
    );
};
