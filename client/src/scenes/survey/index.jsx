import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Form from "./Form";

export default function Survey() {
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
                    Survey Here.
                </Typography>
                <Form />
            </Box>
        </Box>
    )
}