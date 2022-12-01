import { Button, Checkbox, Form, Input, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import habitChild from "../../assets/image/habit-child.png";
import { login } from "../../api";
export default function LoginView() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onSignIn = async (values) => {
    const { username, password } = values;
    const params = {
      username,
      password,
    };
    try {
      const result = await login(params);
      console.log(result);
      console.log(result.data.StatusCode);
      if (result.data.StatusCode == 200) {
        console.log(1);
        localStorage.setItem("username", JSON.stringify(username));
        localStorage.setItem(
          "accessToken",
          JSON.stringify(result.data?.Data?.accessToken)
        );
        navigate("/home");
      }
    } catch (error) {
      message.error("Thông tin đăng nhập không chính xác");
    }
  };
  return (
    <div className="login__content">
      <img src={habitChild} width={"300px"} alt="Habit-Child" />
      <div className="login__form">
        <p className="login__form__title">Login to HabitChild</p>
        <Form form={form} onFinish={onSignIn}>
          <Form.Item name={"username"}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            ></Input>
          </Form.Item>
          <Form.Item name={"password"} className={"login__content__password"}>
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>

          <Button
            type="primary"
            className="login__form__button"
            onClick={form.submit}
          >
            Sign In
          </Button>
          <div className="login__form__forgot">
            <Link>Forgot Password</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
