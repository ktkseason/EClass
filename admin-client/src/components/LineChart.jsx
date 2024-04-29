import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";

export default function LineChart({ isDashboard = false }) {
  const theme = useTheme();
  const colors = theme.palette;
  const students = useSelector(state => state.students);
  const preps = useSelector(state => state.preps);
  const emotions = useSelector(state => state.emotions);

  const data = preps.map(prep => {
    const data = emotions.map(emotion => {
      let score = 0;
      let count = 1;
      students.map(student => student.testResults.map(test => {
        if (test.emotion === emotion.title && test.prep === prep.title && test.score !== '') {
          score += test.score;
          count++;
        }
      }));
      return ({ x: emotion.title, y: count ? Math.floor(score / count) : score });
    });
    return ({ id: prep.title, data: data });
  });

  return (
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.primary.light,
            },
          },
          legend: {
            text: {
              fill: colors.primary.light,
            },
          },
          ticks: {
            line: {
              stroke: colors.primary.light,
              strokeWidth: 1,
            },
            text: {
              fill: colors.primary.light,
            },
          },
        },
        legends: {
          text: {
            fill: colors.primary.light,
          },
        },
        tooltip: {
          container: {
            color: colors.primary.main,
          },
        },
      }}
      colors={{ scheme: "nivo" }}
      margin={{ top: 50, right: 200, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      // curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Emotions",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Score",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};
