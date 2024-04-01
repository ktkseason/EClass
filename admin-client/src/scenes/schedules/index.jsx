import { Box, Typography } from "@mui/material";
import Header from "components/Header";
import Form from "./Form";
import GridTable from "./GridTable";

export default function Schedules() {

    return (
        <Box
            padding="1rem"
            paddingTop="4rem"
        >
            <Header title="Schedules" subtitle="Managing the schedules." />
            <Box width="100%">
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }} color="secondary">
                    Create new Schedule.
                </Typography>
                <Form />
            </Box>
            <GridTable />
        </Box>
    )
}