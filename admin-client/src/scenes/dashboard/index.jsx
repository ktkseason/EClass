import { Box } from "@mui/material";
import Header from "components/Header";

export default function Dashboard() {
    return (
        <Box m="10px 20px 20px 20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome Admin." />
            </Box>
        </Box>
    )
}