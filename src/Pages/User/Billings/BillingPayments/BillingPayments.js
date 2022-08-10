import React, { useState } from "react";

import { FiTarget } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { PurchaseRepayment } from "../../../../Services/Actions/LoansAction/LoansAction";

import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../../../Layout/MainLayout";
import UiButton from "../../../../Components/Common/ui/UiButton";

const BillingPayments = () => {
  const dispatch = useDispatch();
  const { purchase_id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { client_details } = useSelector((state) => state.LogInfo);
  const { allPurchaseInfo, rePaymentInfo } = useSelector(
    (state) => state.LoansInfo
  );
  const repaymentPost = () => {
    const purchase = allPurchaseInfo?.filter((item) => item.id === purchase_id);
    const data = {
      re_payment_amount: rePaymentInfo.re_payment_amount,
    };
    dispatch(
      PurchaseRepayment(client_details.client_details?.id, purchase[0]?.id, data, navigate)
    );
  };
  return (
    <MainLayout>

      <div className="px-4 py-8 grid grid-cols-10 space-x-6">
        <div className="col-span-3   h-72 shadow-lg shadow-gray-300  rounded">
          <button className="flex justify-center items-center  text-lg w-full py-2 rounded bg-dark-gray text-white mr-2">
            {" "}
            {t("summary")}{" "}
            <FiTarget className="text-white ml-5 font-semibold" />{" "}
          </button>
          <div className="h-full   py-auto">
            <ul className="space-y-2 p-3 ">
              <li className="text-[18px] text-center font-normal text-primary-ash-400">
                {t("balance")}:
                <p className="font-semibold">SAR 1,00000</p>
              </li>
              <li className="text-[18px] text-center font-normal text-primary-ash-400">
                {t("next_repayment_date")}:
                <p className="font-semibold"> 25/5/1999 </p>
              </li>
              <li className="text-[18px] text-center font-normal text-primary-ash-400">
                {t("next_repayment_ammount")}:
                <p className="font-semibold">  SAR 2400000</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-7 border-2 shadow-lg shadow-gray-300 max-h-auto  rounded">
          <div className="first-box-title h-3/12">
            <h3 className="text-3xl text-center text-primary-ash-400 font-bold px-4 py-6 border-b-2 ">
              {t('Payment instructions')}
            </h3>
          </div>
          <div className="px-6 py-8 h-6/12">
            <div className="w-full h-64 overflow-y-scroll border-4 rounded-lg">
              <p className="text-justify p-3">

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suscipit faucibus feugiat condimentum convallis faucibus tempus nunc risus. Ut aliquam augue potenti dictumst. Tellus senectus pellentesque habitasse imperdiet nulla amet amet praesent sed. Amet urna a, integer aliquet cursus.
                Fermentum, cras et sed dolor mattis cras dui. Donec leo orci suspendisse morbi dignissim. Eu orci augue sem sagittis. Eget a, ut pretium mus. Donec mi amet diam sociis amet. Turpis erat sollicitudin non nunc, aliquet facilisis hendrerit. Vestibulum donec orci congue nullam facilisis dolor, at sem. Magna pharetra, quam consectetur turpis mi pellentesque elementum ultrices. Ut et imperdiet amet, massa.
                Ultricies pulvinar eu, justo senectus sagittis, tortor, nisl. Varius suspendisse vel urna fermentum sem dictumst sit dictum. In lacus, sit eget egestas elementum tortor sit praesent. Diam ultricies dis est tellus viverra donec auctor vulputate mauris. Sodales odio consequat est sit magna. Bibendum porttitor quam habitant pharetra. Luctus varius eget condimentum sodales sagittis sed malesuada tortor. Orci quis justo, ut viverra fusce. Est ornare pretium, aliquam velit eros sollicitudin. Ac non imperdiet dignissim pulvinar sapien velit sed. Neque, eget rhoncus imperdiet gravida urna, aliquam. Pharetra, vitae netus mi urna cursus molestie lectus bibendum in. Quis donec donec eu, bibendum lacus. Etiam mus venenatis nunc enim. Velit in faucibus ultrices eget pellentesque at.
                Egestas etiam dictum malesuada aliquam scelerisque ipsum. Elit, id nam turpis lorem bibendum morbi pretium risus. Suspendisse porttitor ornare viverra id consectetur a. Scelerisque eu nullam sapien nibh. Consectetur quis lorem mi ac urna tincidunt ut. Ornare velit vivamus ac est. Egestas turpis non facilisis facilisis viverra hendrerit diam.
                Leo quis velit condimentum eros, pharetra, mauris donec et sed. Pulvinar ultricies ante ac nisi aliquam, in scelerisque. Natoque pellentesque quam egestas tellus metus accumsan erat. Pellentesque pretium egestas nunc dui, in lorem sed nunc. Fringilla fames varius gravida arcu, id eget. Habitasse dignissim eu faucibus iaculis. Eu vitae dolor est tristique purus vitae lobortis accumsan congue. Varius pretium nullam cras montes, lacus. Pulvinar est, lectus accumsan, viverra.
                Ut lectus in fusce tincidunt condimentum interdum sed nulla. A in id molestie ut eget lorem pretium. Lorem id lectus adipiscing in est iaculis. Fermentum urna nisi sit sit rhoncus, mattis sapien viverra. Aliquet vitae et enim, quam et at. Cras et ultricies tristique massa velit, est, nisl, placerat donec. Eget consequat, adipiscing posuere est vel pellentesque semper mollis turpis. A at eu nec sed nullam sit ullamcorper porttitor. Nullam auctor nunc et praesent nunc purus lectus sit. Eget tortor in ut ultricies neque tortor. In aenean vitae nulla est a lorem dictum consectetur.
              </p>
            </div>
          </div>
        </div>


      </div>
    </MainLayout>
  );
};

export default BillingPayments;
