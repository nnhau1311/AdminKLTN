import { Card, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { allHabit, allUser } from "../../api";
import backgroundHome from "../../assets/image/backgroundHome.png";
import HabitChart from "./HabitChart";
import UserChart from "./UserChart";

export default function HomeView() {
  const [countHabit, setCountHabit] = useState();
  const [countUser, setCountUser] = useState();
  useEffect(() => {
    allHabit(0, 10).then((result) => {
      setCountHabit(result.data.Data.totalElements);
    });
    allUser(0, 10).then((result) => {
      setCountUser(result.data.Data.totalElements);
    });
  }, []);
  return (
    <>
      <p
        style={{
          textAlign: "center",
          color: "orange",
          fontSize: "36px",
          fontWeight: "800",
        }}
      >
        Welcome to HabitChild
      </p>
      <div>
        <Card title="Statistical" className="chart-card">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="User Statistical" key="1">
              <UserChart />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Habit Statistical" key="2">
              <HabitChart />
            </Tabs.TabPane>
          </Tabs>
        </Card>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <img src={backgroundHome} alt="bg-home" />
          <Card
            style={{ marginLeft: "12px" }}
            title={
              <p
                style={{ fontSize: "24px", fontWeight: 600, margin: "0px 0px" }}
              >
                User Quantity
              </p>
            }
          >
            <p style={{ fontSize: "16px", fontWeight: 600 }}>
              There are {countUser} users on HabitChild
            </p>
          </Card>
          <Card
            style={{ marginLeft: "12px" }}
            title={
              <p
                style={{ fontSize: "24px", fontWeight: 600, margin: "0px 0px" }}
              >
                Habit Quantity
              </p>
            }
          >
            <p style={{ fontSize: "16px", fontWeight: 600 }}>
              There are {countHabit} habits on HabitChild
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}
