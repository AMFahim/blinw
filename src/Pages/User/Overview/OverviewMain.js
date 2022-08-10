import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

// for language taranslation
import { useTranslation } from "react-i18next";
import { OverviewMainInfo } from "../../../Services/Actions/OverviewAction/OverviewAction";
import MainLayout from "../../../Layout/MainLayout";
import Status from "./../../../Assets/images/status.svg";
import UiButton from "../../../Components/Common/ui/UiButton";
import UiArrowButton from "../../../Components/Common/ui/UiArrowButton";
import UiProgressBar from "../../../Components/Common/ui/UiProgressBar";
import SmallCashIcon from '../../../Assets/images/smallCashIcon.svg';
import CreditLine from '../../../Assets/images/creditLine.svg';
import CashIcon from '../../../Assets/images/cashIcon.svg';
import Repayment from '../../../Assets/images/paymentHistory.svg';

const OverviewMain = () => {
  const dispatch = useDispatch();
  const { user_detail } = useSelector((state) => state.LogInfo);
  const { OverviewInfo } = useSelector((state) => state.OverviewInfo);

  const Authtoken = localStorage.getItem("token");
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(OverviewMainInfo(user_detail?.company_id));
  }, []);

  return (
    <>
      {/* <MainLayout> */}
      <div className="px-12 py-8 grid grid-cols-10 space-x-8">
        <div className="col-span-3 shadow-lg w-96 h-96 border-borderColor rounded">
          <div className="first-box-title">
            <h3 className="text-base text-primary-ash-400 font-semibold px-4 border-borderColor">
              {t("status")}
            </h3>
          </div>
          <div className="px-6 py-8">
            <img src={Status} alt="Status" />
            <p className="text-sm font-bold left-1 text-status-soft">PRE-APPROVAL</p>
            {/* progress bar  */}
            <UiProgressBar />
            <p className="text-sm font-medium text-status-light mt-2">Next Step</p>
            <UiArrowButton label={t('Provide Company Details')} />
          </div>
        </div>
        <div className="col-span-7">
          <div className="flex flex-wrap">
            {/* {glanceLists.map((item, index) => ( */}
            <div className="w-96 mx-3 mb-2 h-36 p-4 bg-primary-3 rounded border-borderColor">
              <div className="flex flex-row">
                <img src={SmallCashIcon} alt="Outstanding Loans" />
                <h3 className="text-center w-[153px] left-10 font-semibold text-white">
                  {/* Outstanding Loans */}
                  {t("Outstanding Loans")}
                </h3>
              </div>
              <div className="h-full flex items-center">
                <ul className="space-y-4">
                  <li className="text-[44px] font-normal text-white">
                    {OverviewInfo?.active_credit} <sub className="text-[22px]">SAR</sub>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-96 mx-3 h-36 p-4 rounded bg-primary-1">
              <div className="flex flex-row">
                <img src={CreditLine} alt="Active Credit Line" />
                <h3 className="text-center w-[153px] left-10 font-semibold text-white">
                  {/* Active Credit Line */}
                  {t("Active Credit Line")}
                </h3>
              </div>
              <div className="h-full flex items-center">
                <ul className="space-y-4">
                  <li className="text-[44px] font-normal text-white">
                    {OverviewInfo?.outstanding_loan} <sub className="text-[22px]">SAR</sub>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-96 mx-3 mb-10 h-[272px] p-4 rounded shadow-lg shadow-gray-300">
              <h3 className=" text-base font-medium text-primary-ash-400">
                {/* Total loans */}
                {t("total_loans")}
              </h3>
              <div className="h-full flex flex-col justify-center items-center">
              <img src={CashIcon} alt="Total Loans" />
                <ul className="space-y-4">
                  <li className="text-[44px] font-normal text-primary-3">
                  {OverviewInfo?.total_loan}<sub className="text-[22px]">SAR</sub> 
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-96 mx-3 mb-10 h-[327px] p-4 rounded shadow-lg shadow-gray-300">
              <h3 className="text-base font-medium text-primary-ash-400">
                {/* Nearest repayment */}
                {t("nearest_repayment")}
              </h3>
              <p className="text-[16px] font-bold">Due in 7 days</p>
              <div className="h-full flex flex-col justify-center items-center">
                <img src={Repayment} alt="Nearest Repayment" />
                <ul className="space-y-4">
                  <li className="text-[22px] font-normal text-primary-3">
                    {OverviewInfo?.nearest_payment_date}
                  </li>
                </ul>
                <small className="font-medium">on Thursday 29/05/2022</small>
              </div>
            </div>
            {/* ))} */}
          </div>
        </div>
      </div>
      {/* </MainLayout> */}
    </>
  );
};

export default OverviewMain;
