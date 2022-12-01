import { Pie } from "@ant-design/charts";
import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { getUserChart } from "../../api";

export default function UserChart() {
  const [userChart, setUserChart] = useState();

  useEffect(() => {
    getUserChart().then((result) => {
      setUserChart(result?.data?.Data);
    });
  }, []);
  const data = [
    {
      type: `Active User ${userChart?.numberUserActive}`,
      value: userChart?.numberUserActive,
    },
    {
      type: `Disable User ${userChart?.numberUserDisable}`,
      value: userChart?.numberUserDisable,
    },
    {
      type: `InActive User ${userChart?.numberUserInActive} `,
      value: userChart?.numberUserInActive,
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
