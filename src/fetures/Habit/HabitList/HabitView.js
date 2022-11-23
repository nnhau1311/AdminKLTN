import { Button, Card, Popconfirm, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { allHabit } from "../../../api";

export default function HabitView() {
  const [data, setData] = useState();

  const showPopconfirm = () => {};
  const handleOk = () => {
    console.log(123);
  };

  const columns = [
    {
      title: "Habit Name",
      dataIndex: "habitsName",
      width: "25%",
    },
    {
      title: "Habit Type",
      dataIndex: "habitsType",
      width: "20%",
    },
    {
      title: "Number Date Execute",
      dataIndex: "habitsContentList.numberDateExecute",
      width: "40%",
      render: (text, record, index) => {
        return record.habitsContentList[0].numberDateExecute;
      },
    },
    {
      title: "Implementation Content",
      dataIndex: "habitsContentList.body",
      width: "40%",
      render: (text, record, index) => {
        return record.habitsContentList[0].body;
      },
    },
    {
      title: "Action",
      width: "20%",
      render: (text, record, index) => {
        return (
          <>
            <Link type="primary" to={`/home/habit/edit/${record?.id}`}>
              Edit
            </Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => {
                handleOk(record?.id);
              }}
            >
              <Link
                type="primary"
                style={{
                  marginLeft: 20,
                }}
                onClick={showPopconfirm}
              >
                Delete
              </Link>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    allHabit().then((result) => {
      setData(result.data.Data.content);
    });
  }, []);
  console.log(data);
  return (
    <Card
      title={"Habit Manager"}
      extra={
        <>
          <Link to={"/home/habit/create"}>Add</Link>
        </>
      }
    >
      <Table
        bordered
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        pagination
        scroll={{ y: "53vh" }}
      />
    </Card>
  );
}
