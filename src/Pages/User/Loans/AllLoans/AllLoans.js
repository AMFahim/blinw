import React, { useEffect, useState } from "react";

import { BsCheck2 } from "react-icons/bs";
import UiDowanloadButton from "../../../../Components/Common/ui/UiDowanloadButton";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  AllPurchase,
  RePayment,
} from "../../../../Services/Actions/LoansAction/LoansAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MainLayout from "../../../../Layout/MainLayout";

const AllLoans = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseRoot = localStorage.getItem("baseRoot");
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState({});
  const [active, setActive] = useState('actived');
  const [prevous, setPrevous] = useState('previous');
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('ff', inputValue);

    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <MainLayout>

        <div className="px-10 py-5">

          <div className=" space-y-4 py-5  ">
            <label htmlFor='' className="block pt-4 font-bold text-lg">
              {t("your_loans")}
            </label>
            <select name="companyType" id="companyType"   onChange={handleChange} className="border-[3px] border-inputBorder  block my-2 rounded focus:outline-inputBorder px-3 py-3 text-lg bg-white">
              <option disabled selected>
                {t("select")}
              </option>
              <option  value="active">Active Loans</option>
              <option value="prevous">previous loans</option>

            </select>


          </div>
          {active === 'actived' ? (
            <>
              <div className="">
                <div
                  className="px-4 py-8 grid grid-cols-12 space-x-2 items-center border-b-[3px] "
                >
                  <div className="col-span-4">
                    <span className="bg-primary-6 px-6 py-1  text-white text-center uppercase letter-spacing rounded ">
                      Done
                    </span>
                    <h3 className="py-4 text-[22px] font-semibold text-primary-ash-400">
                      SAR 1,0000 material
                    </h3>
                    <p className="letter-spacing ">
                      {t('purchase_order_submitted')} &nbsp;
                    21/05/2022
                    </p>
                  </div>
                  <div className="col-span-8">
                    <div className="flex justify-end">
                      <a href='' target="_blank">
                        <UiDowanloadButton label={t('download_creditline_agreement')} />
                      </a>
                      <a href='' target="_blank">
                        <UiDowanloadButton label={t('Download puchase order')} />
                      </a>
                      <p
                        className=
                        "flex justify-center cursor-pointer items-center  ml-5 border-2  rounded px-3 py-2 text-slate-600  bg-slate-300">
                        <BsCheck2 className="text-slate-500 mr-3 font-semibold" />
                        {t('repay_now')}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="px-4 py-8 grid grid-cols-12 space-x-2 items-center border-b-[3px] "
                >
                  <div className="col-span-4">
                    <span className="bg-primary-6 px-6 py-1  text-white text-center uppercase letter-spacing rounded ">
                      Done
                    </span>
                    <h3 className="py-4 text-[22px] font-semibold text-primary-ash-400">
                      SAR 1,0000 material
                    </h3>
                    <p className="letter-spacing ">
                      {t('purchase_order_submitted')} &nbsp;
                    21/05/2022
                    </p>
                  </div>
                  <div className="col-span-8">
                    <div className="flex justify-end">
                      <a href='' target="_blank">
                        <UiDowanloadButton label={t('download_creditline_agreement')} />
                      </a>
                      <a href='' target="_blank">
                        <UiDowanloadButton label={t('Download puchase order')} />
                      </a>
                      <p
                        className=
                        "flex justify-center cursor-pointer items-center  ml-5 border-2  rounded px-3 py-2 text-slate-600  bg-slate-300">
                        <BsCheck2 className="text-slate-500 mr-3 font-semibold" />
                        {t('repay_now')}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="px-4 py-8 grid grid-cols-12 space-x-2 items-center border-b-[3px] "
                >
                  <div className="col-span-4">
                    <span className="bg-primary-6 px-6 py-1  text-white text-center uppercase letter-spacing rounded ">
                      Done
                    </span>
                    <h3 className="py-4 text-[22px] font-semibold text-primary-ash-400">
                      SAR 1,0000 material
                    </h3>
                    <p className="letter-spacing ">
                      {t('purchase_order_submitted')} &nbsp;
                    21/05/2022
                    </p>
                  </div>
                  <div className="col-span-8">
                    <div className="flex justify-end">
                      <a href='' target="_blank">
                        <UiDowanloadButton label={t('download_creditline_agreement')} />
                      </a>
                      <a href='' target="_blank">
                        <UiDowanloadButton label={t('Download puchase order')} />
                      </a>
                      <p
                        className=
                        "flex justify-center cursor-pointer items-center  ml-5 border-2  rounded px-3 py-2 text-slate-600  bg-slate-300">
                        <BsCheck2 className="text-slate-500 mr-3 font-semibold" />
                        {t('repay_now')}
                      </p>
                    </div>
                  </div>
                </div>

              </div>


            </>
          ) : (
            <>

              <div

                className="px-4 py-8 grid grid-cols-12 space-x-2 items-center border-b-[3px] border-borderColor"
              >
                <div className="col-span-4">
                  <span className="bg-violet-700 px-6 py-1  text-white text-center uppercase letter-spacing rounded ">
                    hhh
                  </span>
                  <h3 className="py-4 text-[22px] font-semibold text-primary-ash-400">
                    SAR 1,00000 material
                  </h3>
                  <p className="letter-spacing ">
                    {t('purchase_order_submitted')} &nbsp;
                    25/5/1999
                  </p>
                </div>
                <div className="col-span-8">
                  <div className="flex justify-end">
                    <a href='' target="_blank">
                      <UiDowanloadButton label={t('download_creditline_agreement')} />
                    </a>
                    <a href='' target="_blank">
                      <UiDowanloadButton label={t('download_purchase_order')} />
                    </a>
                    <a href='' target="_blank">
                      <UiDowanloadButton label={t('download_invoice')} />
                    </a>
                  </div>
                </div>
              </div>


            </>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default AllLoans;
