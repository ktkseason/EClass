import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";

export default function PieChart() {
  const theme = useTheme();
  const colors = theme.palette;
  const students = useSelector(state => state.students);
  const levels = useSelector(state => state.levels);

  const data = levels.map(level => {
    let value = 0;
    students.map(student => student.level === level.title && value++);
    return ({ id: level.title, label: level.title, value: value })
  });

  return (
    <ResponsivePie
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
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.primary.light}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: colors.text.default,
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: colors.text.default,
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: colors.primary.light,
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: colors.secondary.light,
              },
            },
          ],
        },
      ]}
    />
  );
};
