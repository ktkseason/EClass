import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { useSelector } from "react-redux";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = theme.palette;
  const levels = useSelector(state => state.levels);
  const eduBackgrounds = useSelector(state => state.eduBackgrounds);
  const students = useSelector(state => state.students);

  const keys = levels.map(level => level.title);

  const data = eduBackgrounds.map(eduBackground => {
    const lvls = students.filter(student => student.eduBackground === eduBackground.title).map(arr => arr.level);
    const levels = keys.map(level => {
      let value = 0;
      lvls.map(lvl => lvl === level && value++);
      return ({ [level]: value });
    }).reduce(function (result, item) {
      var key = Object.keys(item)[0];
      result[key] = item[key];
      return result;
    }, {});
    const results = { eduBackground: eduBackground.title, ...levels };
    return results;
  });

  return (
    <ResponsiveBar
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
      keys={keys}
      indexBy="eduBackground"
      margin={{ top: 50, right: 200, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
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
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Education Background",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Level",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in education background: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
