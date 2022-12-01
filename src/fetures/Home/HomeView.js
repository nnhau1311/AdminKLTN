import { Card, Tabs } from "antd";
import React from "react";
import backgroundHome from "../../assets/image/backgroundHome.png";
import HabitChart from "./HabitChart";
import UserChart from "./UserChart";

export default function HomeView() {
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
        </div>
      </div>
    </>
  );
}
