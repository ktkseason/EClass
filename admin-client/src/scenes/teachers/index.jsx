import { Box, Typography } from "@mui/material";
import Header from "components/Header";
import Form from "./Form";
import GridTable from "./GridTable";

export default function Teachers() {

    return (
        <Box m="10px 20px 20px 20px">
            <Header title="Teachers" subtitle="Managing the teachers." />
            <Box width="100%">
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }} color="secondary">
                    Create new Teacher.
                </Typography>
                <Form />
            </Box>
            <GridTable />
        </Box>
    )
}