import { Box, Typography, useTheme, Avatar } from "@mui/material";

export default function Card({ teacher }) {
    const theme = useTheme();
    const colors = theme.palette;

    return (
        <Box
            padding="1.5rem"
            borderRadius="15px"
            height="100%"
        >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                gap="1rem"
                alignItems="center"
            >
                <Avatar
                    sx={{
                        width: "10rem",
                        height: "10rem"
                    }}
                    src={`http://localhost:3001/assets/${teacher.imgPath}`}
                />
                <Box textAlign="center">
                    <Typography variant="h6" color="primary">{teacher.firstName} {teacher.lastName}</Typography>
                    <Typography color={colors.text.default} fontSize="10px" fontWeight="bold">{2024 - teacher.employedYear === 0 ? "New Teacher." : 2024 - teacher.employedYear + " Year Experienced."} </Typography>
                </Box>
            </Box>
        </Box>
    )
}