import { Pie } from "@ant-design/charts";
import React, { useEffect, useState } from "react";
import { getHabitChart } from "../../api";

export default function HabitChart() {
  const [habitChart, setHabitChart] = useState();

  useEffect(() => {
    getHabitChart().then((result) => {
      setHabitChart(result?.data?.Data);
    });
  }, []);
  console.log(habitChart);
  const data = [
    {
      type: `Active Habits ${habitChart?.numberHabitsActive}`,
      value: habitChart?.numberHabitsActive,
    },
    {
      type: `Disable Habits ${habitChart?.numberHabitsDisable}`,
      value: habitChart?.numberHabitsDisable,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
}
