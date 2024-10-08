import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

export default function LoginPage() {
    const theme = useTheme();
    const colors = theme.palette;
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    return <Box>
        <Box width="100%" backgroundColor={colors.background.alt} p="1rem 6%" textAlign="center">
            <Typography
                fontWeight="bold"
                fontSize="clamp(1rem, 2rem, 2.25rem)"
                color="primary">
                EClass
            </Typography>
        </Box>
        <Box width={isNonMobileScreens ? "50%" : "93%"} p="2rem" m="2rem auto" borderRadius="1.5rem" backgroundColor={colors.background.alt} >
            <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }} color="secondary">
                Welcome Admin. Please Log in.
            </Typography>
            <Form />
        </Box>
    </Box>
}