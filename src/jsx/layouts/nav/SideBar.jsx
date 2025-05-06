"use client";

import { useContext, useReducer, useState } from "react";
import MrLuna3 from "../../../images/MRLuna3.png";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MenuList } from "./Menu";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import useUserStore from "../../../store/userStore";

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active: "",
  activeSubmenu: "",
};

const SideBar = ({ onClick, onClick3, menuToggle }) => {
  const { user } = useUserStore();
  const isAdmin = user?.role === "admin";
  var d = new Date();
  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
    ChangeIconSidebar,
  } = useContext(ThemeContext);

  const [state, setState] = useReducer(reducer, initialState);

  const [hideOnScroll, setHideOnScroll] = useState(true);
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll]
  );

  const handleMenuActive = (status) => {
    setState({ active: status });
    if (state.active === status) {
      setState({ active: "" });
    }
  };
  const handleSubmenuActive = (status) => {
    setState({ activeSubmenu: status });
    if (state.activeSubmenu === status) {
      setState({ activeSubmenu: "" });
    }
  };

  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  return (
    <div
      onMouseEnter={() => ChangeIconSidebar(true)}
      onMouseLeave={() => ChangeIconSidebar(false)}
      style={{ zIndex: 99 }}
      className={`deznav border-right ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? hideOnScroll > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      <PerfectScrollbar className="deznav-scroll ">
        <ul className="metismenu" id="menu">
          {MenuList.filter((item) => !item.adminOnly || isAdmin).map(
            (data, index) => {
              const menuClass = data.classsChange;
              if (menuClass === "menu-title") {
                return (
                  <li className={menuClass} key={index}>
                    {data.title}
                  </li>
                );
              } else {
                return (
                  <li
                    className={` ${
                      state.active === data.title ? "mm-active" : ""
                    }`}
                    key={index}
                  >
                    {data.content && data.content.length > 0 ? (
                      <Link
                        to={"#"}
                        className="has-arrow"
                        onClick={() => {
                          handleMenuActive(data.title);
                        }}
                      >
                        {data.iconStyle}{" "}
                        <span className="nav-text">
                          {data.title}
                          {data.update && data.update.length > 0 ? (
                            <span className="badge badge-xs badge-danger ms-2">
                              {data.update}
                            </span>
                          ) : (
                            ""
                          )}
                        </span>
                      </Link>
                    ) : (
                      <Link to={data.to}>
                        {data.iconStyle}{" "}
                        <span className="nav-text">
                          {data.title}
                          {data.update && data.update.length > 0 ? (
                            <span className="badge badge-xs badge-danger ms-2">
                              {data.update}
                            </span>
                          ) : (
                            ""
                          )}
                        </span>
                      </Link>
                    )}
                    <Collapse in={state.active === data.title ? true : false}>
                      <ul
                        className={`${
                          menuClass === "mm-collapse" ? "mm-show" : ""
                        }`}
                      >
                        {data.content &&
                          data.content.map((data, index) => {
                            return (
                              <li
                                key={index}
                                className={`${
                                  state.activeSubmenu === data.title
                                    ? "mm-active"
                                    : ""
                                }`}
                              >
                                {data.content && data.content.length > 0 ? (
                                  <>
                                    <Link
                                      to={data.to}
                                      className={
                                        data.hasMenu ? "has-arrow" : ""
                                      }
                                      onClick={() => {
                                        handleSubmenuActive(data.title);
                                      }}
                                    >
                                      {data.title}
                                    </Link>
                                    <Collapse
                                      in={
                                        state.activeSubmenu === data.title
                                          ? true
                                          : false
                                      }
                                    >
                                      <ul
                                        className={`${
                                          menuClass === "mm-collapse"
                                            ? "mm-show"
                                            : ""
                                        }`}
                                      >
                                        {data.content &&
                                          data.content.map((data, index) => {
                                            return (
                                              <>
                                                <li key={index}>
                                                  <Link
                                                    className={`${
                                                      path === data.to
                                                        ? "mm-active"
                                                        : ""
                                                    }`}
                                                    to={data.to}
                                                  >
                                                    {data.title}
                                                  </Link>
                                                </li>
                                              </>
                                            );
                                          })}
                                      </ul>
                                    </Collapse>
                                  </>
                                ) : (
                                  <Link to={data.to}>{data.title}</Link>
                                )}
                              </li>
                            );
                          })}
                      </ul>
                    </Collapse>
                  </li>
                );
              }
            }
          )}
        </ul>

        {!menuToggle && (
          <div className="d-flex justify-content-center align-items-center d-none d-lg-flex mt-1">
            <img src={MrLuna3} alt="MrLuna" />
          </div>
        )}

        <div className="copyright">
          <p className="fs-13 font-w200">
            <strong className="font-w400">Luna Founder</strong> ©{" "}
            {d.getFullYear()} All Rights Reserved
          </p>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
