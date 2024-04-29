import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

export default function Bar() {

  return (
    <Box
      padding="1rem"
      paddingTop="4rem"
    >
      <Header title="Bar Chart" subtitle="Student Level Analysis on Background Education." />
      <Box height="70vh">
        <BarChart />
      </Box>
    </Box>
  );
}
