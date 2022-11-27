import { Button, Card, Col, Form, Input, message, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { allUser, createUser, editUser } from "../../../api";

export default function UserEditView() {
  const [form] = Form.useForm();
  const location = useLocation();
  const [data, setData] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { userFullName, userAddress, userNumberPhone } = values;
    const paramsEdit = {
      userAddress,
      userFullName,
      userNumberPhone,
    };
    console.log(params);
    try {
      const result = await editUser(paramsEdit, params.id);
      console.log(result);
      if (result.status === 200 && result) {
        navigate("/home/user");
      }
    } catch (error) {
      message.error("Hệ thống không thể xử lý");
    }
  };
  useEffect(() => {
    allUser(location.state?.page, 10).then((result) => {
      const user = result.data.Data.content.find((item, index) => {
        return item.id === params.id;
      });
      setData(user);
    });
  }, []);
  console.log(data);
  return (
    data && (
      <Card title={"Create Habit"}>
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            userAddress: data?.userAddress,
            userFullName: data?.userFullName,
            userNumberPhone: data?.userNumberPhone,
          }}
        >
          <Row>
            <Col span={6} style={{ display: "flex" }}>
              User Address
            </Col>
            <Col span={18}>
              <Form.Item
                name={"userAddress"}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Input placeholder="content" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} style={{ display: "flex" }}>
              User FullName
            </Col>
            <Col span={18}>
              <Form.Item
                name={"userFullName"}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                  {
                    max: 30,
                    message: "This field maximum length is only 24 characters",
                  },
                  {
                    min: 6,
                    message: "This field minimum length is only 8 characters",
                  },
                ]}
              >
                <Input placeholder="content" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} style={{ display: "flex" }}>
              User NumberPhone
            </Col>
            <Col span={18}>
              <Form.Item
                name={"userNumberPhone"}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Input
                  placeholder="content"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="default"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </Button>
            <Button type="primary" onClick={form.submit}>
              Add
            </Button>
          </Space>
        </Form>
      </Card>
    )
  );
}
