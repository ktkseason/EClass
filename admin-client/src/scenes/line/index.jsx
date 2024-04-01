import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

const Line = () => {
  return (
    <Box
      padding="1rem"
      paddingTop="5rem"
    >
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="70vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
