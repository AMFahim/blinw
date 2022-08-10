import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import logo from "../../../Assets/logo/logo_bildnw.svg";
import OverviewMenus from "../../../Services/Constants/NavbarData";
import ActionCenter from "../../../Services/Constants/NavbarData";
import Loans from "../../../Services/Constants/NavbarData";
import Billing from "../../../Services/Constants/NavbarData";
import Account from "../../../Services/Constants/NavbarData";
import "../../../Assets/Styles/css/Navbar.css";
import axios from "../../../Config/axios";
import { useDispatch, useSelector } from "react-redux";
// testing language
import { useTranslation } from "react-i18next";
import { NotificationsInfo } from "../../../Services/Actions/Shared/ActionNavbar";


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [navMenus, setNavMenus] = useState([]);
  const [isActive, setIsActive] = useState("");
  const [language, setLanguage] = useState(localStorage.getItem("lng") || "en");
  const { t, i18n } = useTranslation();


  const { client_details } = useSelector((state) => state.LogInfo);
  const { all_notifications } = useSelector((state) => state.SharedInfo);
  const clientDetails = client_details.client_details;

  const handleChangeLng = (lng) => {
    i18n.changeLanguage(lng);
    if (lng === "en") {
      localStorage.setItem("lng", "en");
      document.body.dir = "ltr";
      setLanguage("en");
    } else if (lng === "ar") {
      setLanguage("ar");
      localStorage.setItem("lng", "ar");
      document.body.dir = "rtl";
      setLanguage("ar");
    }
  };
  
  const getNotifications = (clientID) => {
    dispatch(NotificationsInfo(clientID))
  };

  useEffect(() => {

    getNotifications(clientDetails?.id)
    if (location.pathname === "/overview") {
      setNavMenus(OverviewMenus?.OverviewMenus);
    } else if (
      location.pathname === "/action-center/overview" ||
      location.pathname === "/action-center/documentation" ||
      location.pathname === "/action-center/company-info" ||
      location.pathname === "/action-center/apply-credit" ||
      location.pathname === "/action-center/purchase"
    ) {
      setNavMenus(ActionCenter?.ActionCenter);
    } else if (
      location.pathname === "/loans/overview" ||
      location.pathname === "/loans/credit-line" ||
      location.pathname === "/loans/all-loans"
    ) {
      setNavMenus(Loans?.Loans);
    } else if (
      location.pathname === "/billing/statement" ||
      location.pathname === "/billing/payments"
    ) {
      setNavMenus(Billing?.Billing);
    } else if (
      location.pathname === "/profile" ||
      location.pathname === "/company-details"
    ) {
      setNavMenus(Account?.Account);
    }
  }, [location.pathname]);

  let activeStyle = {
    // textDecoration: "underline",
    borderBottom: "4px solid #FFFFFF",
    paddingTop: "5px",
    paddingBottom: "8px",
    
  };

  const signout = (e) => {
    e.preventDefault();
    axios.defaults.headers.common["Authorization"] = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("persist:root");
    dispatch({
      type: "LOGIN_SUCCES_MESSAGE_CLEAR",
    });
    navigate("/");
  };

  return (
    <div className="navbar bg-primary-1 text-white grid grid-cols-10 border-b-[3px]  py-4 h-20">
    <div className="col-span-2 px-10">
      <Link to="/overview">
        <img src={logo} alt="" className="w-9/12 " />
      </Link>
    </div>
    <div className="col-span-8 px-10 flex justify-between items-center">
      <div>
        <ul className="flex space-x-8">
          {navMenus.map((menu, index) => (
            <li
              key={index}
              className={`py-2 text-lg font-medium cursor-pointer ${
                menu.title == isActive && "underline"
              }`}
            >
              <NavLink
                to={menu.to}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="text-xl cursor-pointer flex items-center gap-x-1 mx-auto  p-1 text-center"
              >
                    <FontAwesomeIcon className="px-2 w-5 h-5" icon={menu.icon} />
              <p className=" text-primary-text">  {t(`${menu.title}`)}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul className="flex items-center space-x-4">
          <li className="text-xl px-4 py-1 font-medium cursor-pointer text-primary-text">
            {language === "ar" ? (
              <span onClick={() => handleChangeLng("en")}>EN</span>
            ) : (
              <span onClick={() => handleChangeLng("ar")}> عربى </span>
            )}
          </li>

          <li className="text-2xl px-4 py-1 font-semibold relative notification">
            <span className="cursor-pointer text-primary-text">
              <FontAwesomeIcon
                icon={faBell}
              />
              {/* {notification?.length} */}
            </span>
            <ul className="notification-menu absolute hidden z-10 bg-white shadow-xl right-0 w-96 h-40 py-2 rounded border-2">
              {
                all_notifications.slice(0, 5).map((item, index) => (
                  
                    <Link to="#" key={index}>
                      <li className="flex justify-between text-primary-text">
                        <span className="text-base">
                          {t(`${item?.event_code}`)}
                        </span>{" "}
                        <span className="text-base">{new Date(item?.created_at).toDateString()}</span>
                      </li>
                    </Link>
                  
                ))
              }
              
            </ul>
          </li>
          <li className="text-2xl px-4 py-1 font-semibold relative account">
            <span className="cursor-pointer text-primary-text">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <ul className="account-menu absolute z-10 hidden bg-white shadow-xl right-0 w-64 py-4 rounded border-2">
              <Link to="/profile">
                <li>{t("profile")}</li>
              </Link>
              <Link to="/company-details">
                <li>{t('company_details_profile')}</li>
              </Link>

              <li onClick={signout}>{t('sign_out')}</li>
            </ul>
          </li>
          {/* <li className="text-2xl px-4 py-4font-semibold cursor-pointer">
            <span>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </span>
          </li> */}
        </ul>
      </div>
    </div>
  </div>
  );
};

export default Navbar;
