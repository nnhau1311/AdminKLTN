import { Button, Card, Col, Form, Input, message, Row, Space } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { createHabit } from "../../../api";

export default function HabitCreateView() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { habitsName, habitsType, numberDateExecute, body } = values;
    const params = {
      habitsContentList: [
        {
          body,
          numberDateExecute,
          totalCourse: "string",
          typeContent: "string",
          typeOfFinishCourse: "string",
        },
      ],
      habitsName,
      habitsType,
      totalCourse: "string",
      typeOfFinishCourse: "string",
    };
    console.log(params);
    try {
      const result = await createHabit(params);
      if (result.status === 200 && result) {
        navigate("/home/habit");
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
            Habit Name
          </Col>
          <Col span={18}>
            <Form.Item
              name={"habitsName"}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
                {
                  max: 100,
                  message: "This field maximum length is only 24 characters",
                },
                {
                  min: 8,
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
            Habit Type
          </Col>
          <Col span={18}>
            <Form.Item
              name={"habitsType"}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
                {
                  max: 100,
                  message: "This field maximum length is only 24 characters",
                },
                {
                  min: 8,
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
            Number Date Execute
          </Col>
          <Col span={18}>
            <Form.Item
              name={"numberDateExecute"}
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
        <Row>
          <Col span={6} style={{ display: "flex" }}>
            Implementation Content
          </Col>
          <Col span={18}>
            <Form.Item
              name={"body"}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
                {
                  max: 100,
                  message: "This field maximum length is only 24 characters",
                },
                {
                  min: 8,
                  message: "This field minimum length is only 8 characters",
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
