import { Box, Typography } from "@mui/material";
import Header from "components/Header";
import Form from "./Form";
import GridTable from "./GridTable";
import { useSelector } from "react-redux";

export default function Courses() {
    const levels = useSelector(state => state.levels);

    return (
        <Box m="10px 20px 20px 20px">
            <Header title="Courses" subtitle="Managing the courses." />
            <Box width="100%">
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }} color="secondary">
                    Create new Course.
                </Typography>
                <Form levels={levels} />
            </Box>
            <GridTable levels={levels} />
        </Box>
    )
}