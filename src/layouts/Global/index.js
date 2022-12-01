import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Content from "./Content";

export default function Global() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("username")) {
      navigate("/home");
    }
  }, []);
  return (
    <div>
      <Content />
      <Outlet />
    </div>
  );
}
