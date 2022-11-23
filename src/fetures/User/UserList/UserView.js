import { Button, Card, Pagination, Popconfirm, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { allHabit, allUser } from "../../../api";
export default function UserCreateView() {
  const [data, setData] = useState();
  const [dataCount, setDataCount] = useState();
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
    },
    {
      title: "UserNumberPhone",
      dataIndex: "userNumberPhone",
      width: "40%",
    },
    // {
    //   title: "Action",
    //   width: "20%",
    //   render: (text, record, index) => {
    //     return (
    //       <>
    //         <Link type="primary" to={`/home/habit/edit/${record?.id}`}>
    //           Edit
    //         </Link>
    //         <Popconfirm
    //           title="Sure to delete?"
    //           onConfirm={() => {
    //             handleOk(record?.id);
    //           }}
    //         >
    //           <Link
    //             type="primary"
    //             style={{
    //               marginLeft: 20,
    //             }}
    //             onClick={showPopconfirm}
    //           >
    //             Delete
    //           </Link>
    //         </Popconfirm>
    //       </>
    //     );
    //   },
    // },
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
          });
        }}
        current={1}
        total={dataCount}
        className="userview__pagination"
      />
    </Card>
  );
}
