import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MainLayout from "../../../../Layout/MainLayout";
import logo from "../../../../Assets/images/Avatar.png";

import { useSelector} from 'react-redux';

import { useTranslation } from "react-i18next";
import UiInput from "../../../../Components/Common/ui/UiInput";
import UiButton from "../../../../Components/Common/ui/UiButton";
const Profile = () => {
  const { userDetails } = useSelector(state => state.LogInfo);
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordMatched, setPasswordmatched] = useState(false);
  const [passwordSet, setPasswordSet] = useState("");
  const [confirmPasswordSet, setConfirmPasswordSet] = useState("");
  const [updatePassword, setUpdatePassword] = useState({});

  // language
  const {t, i18n} = useTranslation()
  const handlePasswordUpdate = (e) => {
    const { name, value } = e.target;
    setUpdatePassword((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (e.target.name === "new_password") {
      setPasswordSet(e.target.value);
    }
    if (e.target.name === "retype_password") {
      setConfirmPasswordSet(e.target.value);
    }
    if (passwordSet === confirmPasswordSet) {
      setPasswordmatched(true);
    }
  };

  const changePassword = (e) => {
    e.preventDefault();
    const Authtoken = localStorage.getItem("token");
    const changePasswordPayload = {
      old_password: updatePassword.old_password,
      new_password: updatePassword.retype_password,
    };
    if (passwordMatched) {
      axios
        .post("/users/change/password", changePasswordPayload, {
          headers: { Authorization: `JWT ${Authtoken}` },
        })
        .then((res) => {
            setSuccessMessage("Password changed successfully")
        })
        .catch((err) => {
          console.log('err', err)
        })
    }
  };
  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("user_details"));
  //   setUserDetails(userInfo);
  // }, []);
  return (
    <MainLayout>
     
      <div className=" px-12 py-4">
        <div className=" flex gap-5" >
          <div className="mb-4 border-2 shadow-lg shadow-gray-300 h-72">
            <div className="flex gap-8 justify-between items-center px-8 py-4 ">
              <h3 className="text-2xl font-semibold text-gray-600">{t('details')}</h3>
            
              <ul>
              <li className="text-xl  flex items-center gap-x-2 mx-auto  text-center ">

                <div className=" ">
                  <img src={logo} alt="" className="w-10 h-10"/>
                </div>
                <div className="">
                <h4 className="text-xl font-bold text-gray-400">
                    Password Company
                  </h4>
                  <h4 className="text-sm font-bold text-gray-400">Zihadul Islam</h4>
                 
                </div>
              </li>
            </ul>
             
            </div>
            <div className="px-6 py-2">
              <div className="flex justify-between py-2">
               
               
              </div>
              <p className="py-2 text-lg">{t('name')}: &nbsp; {userDetails.name}</p>
              <p className="py-2 text-lg">
                {t('position')}: &nbsp; {userDetails.position}{" "}
              </p>
              <p className="py-2 text-lg">
                {t('number')}: &nbsp; {userDetails.number}
              </p>
              <p className="py-2 text-lg">{t('email')}: &nbsp; {userDetails.email}</p>
            </div>
          </div>

          <div className="mb-4 border-2 shadow-lg shadow-gray-300  min-h-96">
            <div className="px-8 py-2 ">
              <h3 className="text-2xl font-semibold text-slate-600">
                {t('change_password')}
              </h3>
            </div>
            <div className="px-6 py-2 ">
              <form onSubmit={changePassword} >
                <UiInput
                  label={t('old_password')}
                  type="password"
                  name="old_password"
                  placeholder={t('old_password_place')}
                  onChange={handlePasswordUpdate}
                ></UiInput>
                <UiInput
                  label={t('new_password')}
                  type="password"
                  name="new_password"
                  placeholder={t('new_password_place')}
                  onChange={handlePasswordUpdate}
                ></UiInput>
                {passwordSet.length < 8 && passwordSet.length > 0 ? (
                  <p className="text-red-700">Password should be 8 character</p>
                ) : (
                  ""
                )}
                <UiInput
                  label={t('retype_new_password')}
                  type="password"
                  name="retype_password"
                  placeholder={t('retype_new_password_place')}
                  onChange={handlePasswordUpdate}
                ></UiInput>
                {!successMessage ?
                  <div className="password-verification">
                  {confirmPasswordSet.length >= 8 &&
                  confirmPasswordSet &&
                  passwordSet === confirmPasswordSet ? (
                    <p className="text-green-700">{t("password_matched")}</p>
                  ) : (
                    ""
                  )}
                  {confirmPasswordSet && passwordSet !== confirmPasswordSet ? (
                    <p className="text-red-700">{t('password_not_matched')}</p>
                  ) : (
                    ""
                  )}
                </div>
                :
                <p className="text-green-600">{successMessage}</p>
                }
                <div className="py-6 text-center">
                  <UiButton label={t('save')} type="submit"></UiButton>
                </div>
              </form>
              <div className="col-span-6"></div>
            </div>
          </div>
        </div>

       
      </div>
    </MainLayout>
  );
};

export default Profile;
