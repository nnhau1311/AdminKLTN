import { FileOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { color } from "@mui/system";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom/dist";
const { Sider } = Layout;
export default function Sidebar({ activeKey }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  function getItem(label, key, icon, path, children) {
    return {
      key,
      icon,
      children,
      label,
      path,
    };
  }
  const items = [
    getItem("User Manager", "user", <UserOutlined />, "home"),
    getItem("Habit Manager", "habit", <FileOutlined />),
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={300}
      className={"sidebar__sider"}
    >
      <Menu
        items={items}
        selectedKeys={[activeKey]}
        onClick={(e) => {
          navigate(`/home/${e.key}`);
        }}
      />
    </Sider>
  );
}
