import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { RiErrorWarningLine } from "react-icons/ri";

import { useSelector, useDispatch } from "react-redux";
import {
  CreditRequest,
  GetClientStatus,
} from "../../../../../Services/Actions/ActionCenterActions/ApplyCreditAction";
import AppliedSuccessful from "../AppliedSuccessful/AppliedSuccessful";
import ApplyReviewOffer from "../ApprovedCredit/ApplyReviewOffer/ApplyReviewOffer";
import ApproveCreditLine from "../ApprovedCredit/ApproveCreditLine/ApproveCreditLine";

import { statusDetails } from "../../../../../Services/Constants/statusHandle";
import { useTranslation } from "react-i18next";
import MainLayout from "../../../../../Layout/MainLayout";
import UiButton from "../../../../../Components/Common/ui/UiButton";
const ActionCreditRequest = () => {
  // for language
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { client_details } = useSelector((state) => state.LogInfo);
  const client_status = client_details.client_details?.status;
  const { get_status } = useSelector((state) => state.ApplyCredit);
  const [isApprove, setIsApprove] = useState(true);
  const [inputValue, setInputValue] = useState({});

  const statusData = statusDetails(get_status);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const creditRequestSubmit = () => {
    const credit_request = {
      seeking_credit_tenure: inputValue.seeking_credit_tenure,
      size_of_credit_line: 10000 * inputValue.credit_line_size,
    };
    dispatch(CreditRequest(credit_request));
    navigate("/action-center/project-details");
  };
  useEffect(() => {
    dispatch(GetClientStatus(client_details.client_details?.id));
  }, []);
  return (
    <>
      {get_status == 5 ? (
        <MainLayout>
          <div className="px-20 py-6 border-b-[3px] border-borderColor">
            <h3 className="text-2xl font-bold">{t("credit_request")}</h3>
          </div>
          <form onSubmit={creditRequestSubmit}>
            <div className="px-20 py-10">
              <label className="text-xl font-medium">
                {t("what_creditline_size")}
              </label>
              {/* <div className="my-4 text-lg px-4 py-2 rounded bg-dark-gray text-white text-center w-1/6 mx-44">
                <p className="text-white text-center ">
                  {10000 * inputValue.credit_line_size || 0}
                </p>
              </div> */}
              <div className="text-center">
                <input
                  name="credit_line_size"
                  type="text"
                  onChange={handleChange}
                  value={inputValue.credit_line_size}
                  className="px-4 py-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                ></input>
              </div>

              <input
                name="credit_line_size"
                type="range"
                min="0"
                max="400"
                onChange={handleChange}
                className="w-5/6 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              ></input>
              <div className=" py-6">
                <p className="mr-3 font-bold">{t("what_credit_tenure")}</p>
                <div className="form-group">
                  <select
                    onChange={handleChange}
                    name="seeking_credit_tenure"
                    className="form-select px-4 py-3 border-2  rounded  w-2/6 focus:focus:outline-none focus:ring focus:ring-dark-gray"
                  >
                    <option disabled selected>
                      {t("select")}
                    </option>
                    <option value="1">1 {t("select_month")}</option>
                    <option value="2">2 {t("select_month")}</option>
                    <option value="3">3 {t("select_month")}</option>
                    <option value="4">4 {t("select_month")}</option>
                    <option value="5">5 {t("select_month")}</option>
                    <option value="6">6 {t("select_month")}</option>
                  </select>
                </div>
                <div className="text-center mx-96 my-8">
                  <UiButton type="submit" label={t("next")} />
                </div>
              </div>
            </div>
          </form>
        </MainLayout>
      ) : get_status == 8 ? (
        <AppliedSuccessful></AppliedSuccessful>
      ) : get_status == 9 ? (
        <ApplyReviewOffer></ApplyReviewOffer>
      ) : get_status == 12 ? (
        <ApproveCreditLine></ApproveCreditLine>
      ) : (
        <MainLayout>
          <div className="mt-16 flex w-2/4 mx-auto items-center border-2 border-borderColor rounded-lg bg-green-300">
            <span className="px-6 py-8  border-r-2 border-borderColor bg-green-600">
              <RiErrorWarningLine className="text-3xl" />
            </span>
            <h3 className="p-4 text-xl bg-green-300">
              {/* You are not allowed to apply a credit line now. Check you status in overview. */}
              {t(`${statusData.status}`)}
            </h3>
          </div>
          <div className="text-center my-8">
            <Link
              to={`${statusData.link}`}
              className=" text-lg rounded border-2 m-2 whitespace-nowrap border-dark-gray bg-dark-gray text-white py-2 px-6 hover:text-gray-300 transition duration-100 ease-in-out"
            >
              {[4, 8, 14].some((statusValue) => get_status == statusValue)
                ? "Wait for the admin decision"
                : "Go to next step"}
            </Link>
          </div>
        </MainLayout>
      )}
    </>
  );
};

export default ActionCreditRequest;
