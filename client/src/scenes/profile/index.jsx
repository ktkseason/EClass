import { useTheme } from "@emotion/react";
import { Avatar, Box, Typography, IconButton } from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { useSelector } from "react-redux";

export default function Profile() {
    const student = useSelector(state => state.user);
    const theme = useTheme();
    const colors = theme.palette;
    return (
        <Box
            minHeight="92vh"
            padding="1rem"
            paddingTop="5rem"
        >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="1rem"
                textAlign="center"
            >
                <Avatar
                    src={`http://localhost:3001/assets/${student.imgPath}`}
                    sx={{
                        width: "10rem",
                        height: "10rem"
                    }}
                />
                <Box>
                    <Typography variant="h6" fontSize="12px" fontWeight="bold" color={colors.secondary.light}>{student.level} Student</Typography>
                    <Box display="flex" justifyContent="center" alignItems="end" gap="0.5rem">
                        <Typography variant="h3" color="primary" fontWeight="bold">{student.firstName} {student.lastName}</Typography>
                        <Typography variant="h6" fontSize="12px" color={colors.text.default}>/ {student.birthYear} Born</Typography>
                    </Box>
                    <Typography fontSize="12px" fontWeight="medium" color={colors.text.default} >{student.eduBackground} Education</Typography>
                    <Box marginTop="1rem" color={colors.text.alt}>
                        <Box display="flex" justifyContent="start" alignItems="center" gap="1rem" color={colors.text.default}>
                            <LocalPhoneIcon sx={{ color: colors.secondary.light, fontSize: "18px" }} />
                            <Typography variant="h6">{student.phone}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="start" alignItems="center" gap="1rem" color={colors.text.default}>
                            <EmailIcon sx={{ color: colors.secondary.light, fontSize: "18px" }} />
                            <Typography variant="h6">{student.email}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Typography>Courses Taken</Typography>
            </Box>
            <Box>
                <Typography>Test Results</Typography>
            </Box>
        </Box>
    )
}