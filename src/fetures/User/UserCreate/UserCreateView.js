import { Button, Card, Col, Form, Input, message, Row, Space } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../api";

export default function UserView() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { userName, userPassword, userFullName, email } = values;
    const params = {
      userName,
      userPassword,
      userFullName,
      email,
      role: "staff",
    };
    console.log(params);
    try {
      const result = await createUser(params);
      console.log(result);
      if (result.status === 200 && result) {
        navigate("/home/user");
      }
    } catch (error) {
      message.error("Hệ thống không thể xử lý");
    }
  };

  return (
    <Card title={"Create Habit"}>
      <Form form={form} onFinish={onFinish}>
        <Row>
          <Col span={6} style={{ display: "flex" }}>
            User Name
          </Col>
          <Col span={18}>
            <Form.Item
              name={"userName"}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
                {
                  validator: (__, value) => {
                    console.log(value);
                    if (
                      new RegExp(
                        "^([" +
                          "àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ" +
                          "\n" +
                          "]+$)"
                      ).test(value) &&
                      value
                    ) {
                      console.log(123);
                      return Promise.reject("This field is malformed");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="content" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6} style={{ display: "flex" }}>
            User Password
          </Col>
          <Col span={18}>
            <Form.Item
              name={"userPassword"}
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
              ]}
            >
              <Input placeholder="content" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6} style={{ display: "flex" }}>
            User Email
          </Col>
          <Col span={18}>
            <Form.Item
              name={"email"}
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
  );
}
