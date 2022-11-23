import { Button, Card, Col, Form, Input, message, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { allHabit, editHabit } from "../../../api";

export default function HabitEditView() {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const params = useParams();
  const { id: IDParams } = params;
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
      habitsId: IDParams.id,
      habitsName,
      habitsType,
      typeOfFinishCourse: "string",
    };
    try {
      const result = await editHabit(params, IDParams);
      if (result.status === 200 && result) {
        navigate("/home/habit");
      }
    } catch (error) {
      message.error("Hệ thống không thể xử lý");
    }
  };
  useEffect(() => {
    allHabit().then((result) => {
      const habit = result.data.Data.content.find((item, index) => {
        return item.id === params.id;
      });
      setData(habit);
    });
  }, []);
  console.log(data);
  return (
    <>
      {data && (
        <Card title={"Edit Habit"}>
          <Form
            form={form}
            onFinish={onFinish}
            initialValues={{
              habitsName: data?.habitsName,
              habitsType: data?.habitsType,
              numberDateExecute: data?.habitsContentList[0]?.numberDateExecute,
              body: data?.habitsContentList[0]?.body,
            }}
          >
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
                  <Input placeholder="content" />
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
                Edit
              </Button>
            </Space>
          </Form>
        </Card>
      )}
    </>
  );
}
