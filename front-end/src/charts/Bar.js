import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

export default function Bar({ chartObjectArray, arrayLength }) {
  const [chartData, setChartData] = React.useState(chartObjectArray);

  return (
    <Paper>
      <Chart data={chartData}>
        <ArgumentAxis />
        <ValueAxis max={arrayLength} />
        <BarSeries valueField="studentsNo" argumentField="name" />
        <Title text="Number of Students Per class" />
        <Animation />
      </Chart>
    </Paper>
  );
}

// [
// { name: "class1", studentsNo: 2.525, age: 30 },
// { name: "class2", studentsNo: 3.018 },
// // { year: "1970", population: 3.682 },
// // { year: "1980", population: 4.44 },
// // { year: "1990", population: 5.31 },
// // { year: "2000", population: 6.127 },
// // { year: "2010", population: 6.93 },
// ]
