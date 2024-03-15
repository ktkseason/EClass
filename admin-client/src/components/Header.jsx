import { Typography, Box, useTheme } from "@mui/material"


export default function Header({ title, subtitle }) {
    const theme = useTheme();
    const colors = theme.palette;
    return <Box mb="30px">
        <Typography
            variant="h4"
            color={colors.primary.main}
            fontWeight="bold"
        >{title}</Typography>
        <Typography
            variant="" color={colors.secondary.light}>{subtitle}</Typography>
    </Box>
}