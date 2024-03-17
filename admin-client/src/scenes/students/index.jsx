import { Box, Typography } from "@mui/material";
import Header from "components/Header";
import GridTable from "./GridTable";

export default function Students() {

    return (
        <Box m="10px 20px 20px 20px">
            <Header title="Students" subtitle="Managing the students." />
            <GridTable />
        </Box>
    )
}