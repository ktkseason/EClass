import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import Form from "./Form";

export default function Contact() {
    const isNonMobile = useMediaQuery("(min-width: 500px)");
    const theme = useTheme();
    const colors = theme.palette;

    return (
        <Box minHeight="92vh">
            <Box
                padding="1rem"
                paddingTop="5rem"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="2.7rem"
            >
                <Typography variant="h3" textTransform="uppercase" textAlign="center" color={colors.primary.main} fontWeight="bold">Get in touch</Typography>
                <Box width="100%" display="flex" justifyContent="space-evenly" alignItems="start" gap="2rem" flexWrap="wrap">
                    <Box width={isNonMobile ? "30rem" : "15rem"}>
                        <Typography marginBottom="1.4rem" variant="h5" fontWeight="bold" color={colors.text.default}>Leave what you think about <span style={{ color: `${colors.primary.main}` }}>EClass</span></Typography>
                        <Form />
                    </Box>
                    <Box width={isNonMobile ? "30rem" : "15rem"}>
                        <Typography marginBottom="1.4rem" variant="h5" fontWeight="bold" color={colors.text.default}>Contact Information</Typography>
                        <Box display="flex" flexDirection="column" justifyContent="start" alignItems="start" gap="1.2rem">
                            <Box display="flex" justifyContent="start" alignItems="center" gap="1rem" color={colors.text.default}>
                                <LocalPhoneIcon sx={{ color: `${colors.primary.light}`, fontSize: "24px" }} />
                                <Typography variant="h6">+95 987654321</Typography>
                            </Box>
                            <Box display="flex" justifyContent="start" alignItems="center" gap="1rem" color={colors.text.default}>
                                <EmailIcon sx={{ color: `${colors.primary.light}`, fontSize: "24px" }} />
                                <Typography variant="h6">eclass@info.com</Typography>
                            </Box>
                            <Box display="flex" justifyContent="start" alignItems="center" gap="1rem" color={colors.text.default}>
                                <BusinessIcon sx={{ color: `${colors.primary.light}`, fontSize: "24px" }} />
                                <Typography variant="h6">No. 6, Palm Str., Mayangone.</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" marginTop="1.7rem" justifyContent="start" alignItems="center" gap="1rem">
                            <IconButton>
                                <FacebookIcon sx={{ color: `${colors.primary.main}`, fontSize: "24px" }} />
                            </IconButton>
                            <IconButton>
                                <InstagramIcon sx={{ color: `${colors.primary.main}`, fontSize: "24px" }} />
                            </IconButton>
                            <IconButton>
                                <XIcon sx={{ color: `${colors.primary.main}`, fontSize: "24px" }} />
                            </IconButton>
                            <IconButton>
                                <TelegramIcon sx={{ color: `${colors.primary.main}`, fontSize: "24px" }} />
                            </IconButton>
                        </Box>
                        <Typography marginTop="1.7rem" color={colors.text.default}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et deserunt sapiente earum quaerat distinctio, aliquam odio consectetur sed eius excepturi! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, rem.</Typography>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}