import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { AssetImages } from "../../../Services/Constants/imagesData";
const AuthNavbar = () => {
  const [language, setLanguage] = useState(localStorage.getItem("lng") || "en");

  const { t, i18n } = useTranslation();
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
  return (
    <div className="navbar grid grid-cols-10 border-b-[3px] border-borderColor py-4">
      <div className="col-span-2 px-10">
        <Link to="/">
          <img src={AssetImages.NavbarLogo} alt="navlogo" className="w-9/12" />
        </Link>
      </div>
      <div className="col-span-8 px-10 flex justify-end">
        <ul className="flex space-x-6">
          <li className="text-2xl px-4 py-1 font-semibold cursor-pointer">
            {language === "ar" ? (
              <span onClick={() => handleChangeLng("en")}>EN</span>
            ) : (
              <span onClick={() => handleChangeLng("ar")}> عربى </span>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AuthNavbar;
