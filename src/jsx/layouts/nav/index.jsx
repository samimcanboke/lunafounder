"use client";

import { Fragment, useState } from "react";
import SideBar from "./SideBar";
import NavHader from "./NavHader";
import Header from "./Header";
import ChatBox from "../ChatBox";

const JobieNav = ({ title, onClick: ClickToAddEvent, onClick2, onClick3 }) => {
  const [toggle, setToggle] = useState("");
  const [menuToggle, setMenuToggle] = useState(false);
  const onClick = (name) => setToggle(toggle === name ? "" : name);

  return (
    <Fragment>
      <NavHader menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
      <SideBar
        onClick={() => onClick2()}
        onClick3={() => onClick3()}
        menuToggle={menuToggle}
      />
      <Header
        onNote={() => onClick("chatbox")}
        onNotification={() => onClick("notification")}
        onProfile={() => onClick("profile")}
        toggle={toggle}
        title={title}
        onBox={() => onClick("box")}
        onClick={() => ClickToAddEvent()}
      />
      <ChatBox onClick={() => onClick("chatbox")} toggle={toggle} />
    </Fragment>
  );
};

export default JobieNav;
