import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Components/Common/shared/Navbar";
import { useSelector } from "react-redux";
import logo from "../Assets/images/Avatar.png";
import {
  faPenToSquare,
  faFlag,
  faBuilding,
  faComment,
  faSquare,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Message from "../Assets/logo/message.svg"
import i18next from "../Assets/language/i18next";
import Footer from "../Components/Common/shared/Footer";

const MainLayout = ({ children, ...rest }) => {
  // const {t} = useTranslation();

  const { user_detail } = useSelector((state) => state.LogInfo);
  const { lang } = useSelector((state) => state.LogInfo);


  const sidebarMenu = [
    {
      label: i18next.t("overview"),
      active: false,
      to: "/overview",
      name: "overview",
      icon: faPenToSquare,
    },
    {
      label: i18next.t("action_center"),
      active: false,
      to: "/action-center/overview",
      name: "actioncenter",
      icon: faFlag,
    },
    {
      label: i18next.t("loans"),
      active: false,
      to: "/loans/overview",
      name: "loans",
      icon: faPenToSquare,
    },
    {
      label: i18next.t("billing"),
      active: false,
      to: "/billing/statement",
      name: "billing",
      icon: faBuilding,
    },
  ];
  
  let activeStyle = {
    fontWeight: "bold",
    background: "#E2E7F0",
    color:'#00B09E'
  };

  return (
    <>
      {/* Navbar */}
      <Navbar></Navbar>
      {lang === "en" || lang === "" || lang === null ? (
        <div className="main-part grid grid-cols-10">
          {/* Sidebar */}
          <div className="sidebar col-span-2 border-r-[3px] w-64 h-auto min-h-screen bg-primary-7">
           
            <ul>
              <li className="block text-xl  flex items-center gap-x-4 mx-auto p-3 text-center ">

                <div className=" ">
                  <img src={logo} alt="" className="w-10 h-10"/>
                </div>
                <div className="">
                <h4 className="text-xl font-bold ">
                    {user_detail?.company_name}
                  </h4>
                  <h4 className="text-sm font-bold text-gray-400">{user_detail?.name}</h4>
                 
                </div>
              </li>
            </ul>
            <div
              className="h-screen py-6 grid gap-4 content-between"
              style={{ height: "80vh" }}
            >
              <ul>
                {sidebarMenu.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.to}
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                      className="block text-xl cursor-pointer flex items-center gap-x-3 mx-auto hover:bg-primary-ash-300 p-3 text-center  rounded-sm"
                    >
                      <FontAwesomeIcon className="px-2 w-5 h-5" icon={item.icon} />
                      <p> {item.label}</p>
                    </NavLink>
                  </li>
                ))}
              </ul>
             
                <div className="block text-base cursor-pointer content-between gap-y-1 mx-auto   text-center  ">
                  <h3 className="font-poppins text-sm"> You’re in a team-managed project </h3>
                  <h3 className="font-poppins text-sm">  Learn more </h3>
                </div>
               
              
            </div>
          </div>

          <div className="main-body col-span-8  relative">
            {children}
            <span className="text-7xl right-0 bottom-0 fixed mr-5 mb-5 cursor-pointer">
              {/* <FontAwesomeIcon icon={faComment} /> */}
              <img src={Message} alt="message" />
            </span>
          </div>
        </div>
      ) : lang === "ar" ? (
        <div className="main-part grid grid-cols-10">
          <div className="main-body col-span-8">{children}</div>
          {/* Sidebar  */}
          <div className="sidebar col-span-2 border-l-[3px] border-borderColor h-auto min-h-screen bg-primary-ash-light">
            <div className="px-6 py-3">
              <h4 className="text-xl font-bold">{user_detail?.name}</h4>
              <h4 className="text-xl font-bold text-gray-400">
                {user_detail?.company_name}
              </h4>
            </div>
            <div className="py-6">
              <ul>
                {sidebarMenu.map((item, index) => (
                  <li
                    key={index}
                    className="py-3 px-10 cursor-pointer bg-primary-ash-300 text-lg"
                  >
                    <NavLink key={index} to={item.to}>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <Footer />
    </>
  );
};

export default MainLayout;
