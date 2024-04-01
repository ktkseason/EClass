import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";

export default function Pie() {

  return (
    <Box
      padding="1rem"
      paddingTop="4rem"
    >
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="70vh">
        <PieChart />
      </Box>
    </Box>
  );
};
