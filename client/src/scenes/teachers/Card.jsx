import { Box, Typography, useTheme, Avatar } from "@mui/material";

export default function Card({ teacher }) {
    const theme = useTheme();
    const colors = theme.palette;

    return (
        <Box
            padding="1.5rem"
            borderRadius="15px"
            backgroundColor={colors.secondary.dark}
            height="100%"
        >
            <Box
                display="flex"
                justifyContent="start"
                gap="1rem"
                alignItems="end"
            >
                <Avatar
                    sx={{
                        width: "78px",
                        height: "78px"
                    }}
                    src={`http://localhost:3001/assets/${teacher.imgPath}`}
                />
                <Box>
                    <Typography variant="h6" color="primary">{teacher.firstName} {teacher.lastName}</Typography>
                    <Typography color={colors.text.default} fontSize="10px" fontWeight="bold">{2024 - teacher.employedYear === 0 ? "New Teacher." : 2024 - teacher.employedYear + " Year Experienced."} </Typography>
                </Box>
            </Box>
        </Box>
    )
}