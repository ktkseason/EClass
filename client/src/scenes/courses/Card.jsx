import { Box, Typography, useTheme } from "@mui/material";

export default function Card({ course }) {
    const theme = useTheme();
    const colors = theme.palette;

    return (
        <Box
            padding="1.5rem"
            borderRadius="15px"
            border={`1px solid ${colors.primary.main}`}
            height="100%"
        >
            <Typography noWrap variant="h5" color={colors.primary.light} fontWeight="bold">{course.title}</Typography>
            <Typography fontWeight="bold" fontSize="12px" color={colors.primary.main}>{course.level}</Typography>
            <Box display="flex" justifyContent="center" alignItems="center" gap="0.5rem" margin="1.5rem 0 1rem 0" color={colors.text.default}>
                <Typography variant="h6" >{course.duration} <span style={{ fontSize: "10px" }}>Months</span></Typography>
                <Typography variant="h6">-</Typography>
                <Typography variant="h6">{course.price} <span style={{ fontSize: "10px" }}>MMK</span></Typography>
            </Box>
            <Typography color={colors.text.default}>{course.description}</Typography>
        </Box>
    )
}