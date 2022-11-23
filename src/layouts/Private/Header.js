import { Dropdown, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/image/avatar.png";
export default function Header() {
  const handleLogout = (e) => {
    localStorage.removeItem("username");
  };
  const menu = (
    <Menu
      items={[
        {
          label: (
            <Link to="/" onClick={handleLogout}>
              Sign Out
            </Link>
          ),
          key: "1",
        },
      ]}
    />
  );
  return (
    <div className="header__content">
      <Link to={"/home"} className="header__content__logo">
        HabitChild
      </Link>
      <Dropdown overlay={menu} trigger={["click"]}>
        <div className="header__content__icon">
          <p className="header__content__icon__name">
            {JSON.parse(localStorage.getItem("username"))}
          </p>
          <img
            src={avatar}
            alt="avatar"
            className="header__content__icon__avatar"
          ></img>
        </div>
      </Dropdown>
    </div>
  );
}
