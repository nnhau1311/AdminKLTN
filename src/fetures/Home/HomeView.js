import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { allHabit, allUser } from "../../api";
import backgroundHome from "../../assets/image/backgroundHome.png";
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
      <div
        style={{
          display: "flex",
          gap: "50px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={backgroundHome} alt="bg-home"></img>
        <Card
          title={
            <p style={{ fontSize: "24px", fontWeight: 600, margin: "0px 0px" }}>
              User Quantity
            </p>
          }
        >
          <p style={{ fontSize: "16px", fontWeight: 600 }}>
            there are {countUser} users on HabitChild
          </p>
        </Card>
        <Card
          title={
            <p style={{ fontSize: "24px", fontWeight: 600, margin: "0px 0px" }}>
              Habit Quantity
            </p>
          }
        >
          <p style={{ fontSize: "16px", fontWeight: 600 }}>
            there are {countHabit} habits on HabitChild
          </p>
        </Card>
      </div>
    </>
  );
}
