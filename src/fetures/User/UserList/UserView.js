import { Card, Pagination, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { activeUser, allUser, disableUser } from "../../../api";
export default function UserCreateView() {
  const [data, setData] = useState();
  const [dataCount, setDataCount] = useState();
  const [current, setCurrent] = useState(1);
  const [open, setOpen] = useState(false);

  const showPopconfirm = () => {};
  const handleOk = () => {
    console.log(123);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      width: "25%",
    },
    {
      title: "UserFullName",
      dataIndex: "userFullName",
      width: "20%",
    },
    {
      title: "UserAddress",
      dataIndex: "userAddress",
      width: "40%",
      render: (text, record) => text || "Chưa cập nhật",
    },
    {
      title: "UserNumberPhone",
      dataIndex: "userNumberPhone",
      width: "40%",
      render: (text, record) => text || "Chưa cập nhật",
    },
    {
      title: "Lock/Unlock",
      width: "20%",
      render: (text, record, index) => {
        return (
          <>
            {record.status == 1 && (
              <Popconfirm
                title="Lock this user ?"
                onConfirm={async () => {
                  await disableUser(record.id);
                  await allUser(current - 1, 10).then((result) => {
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
                  await activeUser(record.id);
                  await allUser(current - 1, 10).then((result) => {
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
              to={`/home/user/edit/${record?.id}`}
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
    allUser(0, 10).then((result) => {
      setData(result.data.Data.content);
      setDataCount(result.data.Data.totalElements);
    });
  }, []);
  console.log(data);
  console.log(dataCount);
  return (
    <Card
      title={"User Manager"}
      extra={
        <>
          <Link to={"/home/user/create"}>Add</Link>
        </>
      }
    >
      <Table
        bordered
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        scroll={{ y: "53vh" }}
        pagination={false}
      />
      <Pagination
        onChange={(e) => {
          allUser(e - 1).then((result) => {
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
