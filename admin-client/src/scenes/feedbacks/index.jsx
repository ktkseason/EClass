import { Box } from "@mui/material";
import Header from "components/Header";
import GridTable from "./GridTable";

export default function Feedbacks() {

    return (
        <Box
            padding="1rem"
            paddingTop="4rem"
        >
            <Header title="Feedbacks" subtitle="Viewing Feedbacks" />
            <GridTable />
        </Box>
    )
}