import { Layout } from "antd";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
const {
  Header: HeaderLayout,
  Footer: FooterLayout,
  Content: ContentLayout,
} = Layout;

export default function Private() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeKey =
    (location.pathname.includes("habit") && "habit") ||
    (location.pathname.includes("user") && "user") ||
    "none";
  console.log(activeKey);
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/");
    }
  }, []);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderLayout
        style={{ backgroundColor: "white", borderBottom: "3px solid orange" }}
      >
        <Header />
      </HeaderLayout>
      <Layout>
        <Sidebar activeKey={activeKey} />
        <Layout>
          <ContentLayout
            style={{
              margin: "20px",
            }}
          >
            <Content />
            <Outlet />
          </ContentLayout>
          <FooterLayout>
            <Footer />
          </FooterLayout>
        </Layout>
      </Layout>
    </Layout>
  );
}
