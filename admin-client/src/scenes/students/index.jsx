import { Box } from "@mui/material";
import Header from "components/Header";
import GridTable from "./GridTable";

export default function Students() {

    return (
        <Box
            padding="1rem"
            paddingTop="4rem"
        >
            <Header title="Students" subtitle="Managing the students." />
            <GridTable />
        </Box>
    )
}