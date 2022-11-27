import { Button, Card, Pagination, Popconfirm, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { activeHabit, allHabit, disableHabit } from "../../../api";

export default function HabitView() {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [dataCount, setDataCount] = useState();
  const [current, setCurrent] = useState(1);
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
      title: "Lock/Unlock",
      width: "20%",
      render: (text, record, index) => {
        return (
          <>
            {record.status == 0 && (
              <Popconfirm
                title="Lock this user ?"
                onConfirm={async () => {
                  await disableHabit(record.id);
                  await allHabit(current - 1, 10).then((result) => {
                    setData(result.data.Data.content);
                    setDataCount(result.data.Data.totalElements);
                  });
                }}
              >
                <Link>Lock</Link>
              </Popconfirm>
            )}
            {record.status == -1 && (
              <Popconfirm
                title="Unlock this user ?"
                onConfirm={async () => {
                  await activeHabit(record.id);
                  await allHabit(current - 1, 10).then((result) => {
                    setData(result.data.Data.content);
                    setDataCount(result.data.Data.totalElements);
                  });
                }}
              >
                <Link>Unlock</Link>
              </Popconfirm>
            )}
          </>
        );
      },
    },
    {
      title: "Action",
      width: "20%",
      render: (text, record, index) => {
        return (
          <>
            <Link
              type="primary"
              to={`/home/habit/edit/${record?.id}`}
              state={{ page: current - 1 }}
            >
              Edit
            </Link>
            {/* <Popconfirm
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
            </Popconfirm> */}
          </>
        );
      },
    },
  ];
  useEffect(() => {
    allHabit(0, 10).then((result) => {
      setData(result.data.Data.content);
      setDataCount(result.data.Data.totalElements);
    });
  }, []);
  console.log(data);
  return (
    <Card
      title={"Habit Manager"}
      extra={
        <>
          <Link to={"/home/habit/create"} state={current}>
            Add
          </Link>
        </>
      }
    >
      <Table
        bordered
        dataSource={data}
        columns={columns}
        pagination={false}
        rowClassName="editable-row"
        scroll={{ y: "53vh" }}
      />
      <Pagination
        onChange={(e) => {
          allHabit(e - 1).then((result) => {
            setData(result.data.Data.content);
            setCurrent(e);
          });
        }}
        current={current}
        total={dataCount}
        className="userview__pagination"
      />
    </Card>
  );
}
