import React, {  useEffect } from "react";

import { BsCheck2Circle } from "react-icons/bs";
import { FiTarget } from "react-icons/fi";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { GetStatements, GetSummary } from "../../../../Services/Actions/BillingAction/StatementAction";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import MainLayout from "../../../../Layout/MainLayout";
const BillingStatement = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch()
  const { client_details } = useSelector((state) => state.LogInfo);
  const clientDetails = client_details.client_details;
  const {statements, summary} = useSelector((state) => state.BillingInfo);

  const statusStyle = {
    Repayment: "green",
    Purchase: "black",
    Pending: "orange",
    Approved: "green",
    Rejected: "red",
  };


  useEffect(() => {
    dispatch(GetStatements(clientDetails.id))
    dispatch(GetSummary(clientDetails.id))
  }, []);

  return (
    <MainLayout>
      
      <div className=" py-8 grid grid-cols-10 gap-6">
        <div className="col-span-8  shadow-lg shadow-gray-300">
          <div className="flex justify-between px-2 items-center my-6">
          <h3 className="text-2xl font-semibold">{t("statement")}</h3>
        <button className="flex justify-center items-center  text-lg px-5 py-2  bg-primary-1 text-white">
          <BsCheck2Circle className="text-white ml-5 font-semibold  mr-3" />{" "}
          {t("repay_now")}{" "}
        </button>
          </div>
          <table className="w-full users-table  mx-auto ">
            <thead >
              <tr className=" px-4 pt-2">
                <td>{t("description")}</td>
                <td>{t("amount")}</td>
                <td>
                  <span className="mr-2">
                    <FontAwesomeIcon icon={faArrowDown} />
                  </span>
                  {t("date")}
                </td>

                <td>{t("bill_status")}</td>
              </tr>
            </thead>
            <tbody className='py-4'>
             
                  <tr >
                    <td>Steel purchase </td>

                    <td>
                      <p style={{ color: `${statusStyle}` }}>
                        SAR 30,0000
                      </p>
                    </td>
                    <td>12/04/2019</td>

                    <td>
                      <p style={{ backgroundColor: `${statusStyle}` }} className=" py-2 w-32 text-orange-600  text-center rounded-full">
                      PENDING
                      </p>
                    </td>
                  </tr>
                  <tr >
                    <td>Steel purchase </td>

                    <td>
                      <p style={{ color: `${statusStyle}` }}>
                        SAR 30,0000
                      </p>
                    </td>
                    <td>12/04/2019</td>

                    <td>
                      <p style={{ backgroundColor: `${statusStyle}` }} className=" py-2 w-32 text-green-600  text-center rounded-full">
                      PENDING
                      </p>
                    </td>
                  </tr>
                  <tr >
                    <td>Steel purchase </td>

                    <td>
                      <p style={{ color: `${statusStyle}` }}>
                        SAR 30,0000
                      </p>
                    </td>
                    <td>12/04/2019</td>

                    <td>
                      <p style={{ backgroundColor: `${statusStyle}` }} className=" py-2 w-32 text-green-600  text-center rounded-full">
                      PENDING
                      </p>
                    </td>
                  </tr>
                  <tr >
                    <td>Steel purchase </td>

                    <td>
                      <p style={{ color: `${statusStyle}` }}>
                        SAR 30,0000
                      </p>
                    </td>
                    <td>12/04/2019</td>

                    <td>
                      <p style={{ backgroundColor: `${statusStyle}` }} className=" py-2 w-32 text-green-600  text-center rounded-full">
                      PENDING
                      </p>
                    </td>
                  </tr>
                  <tr >
                    <td>Steel purchase </td>

                    <td>
                      <p style={{ color: `${statusStyle}` }}>
                        SAR 30,0000
                      </p>
                    </td>
                    <td>12/04/2019</td>

                    <td>
                      <p style={{ backgroundColor: `${statusStyle}` }} className="py-2 w-32 text-green-600 text-center rounded-full">
                      Confirmed
                      </p>
                    </td>
                  </tr>
                  <tr >
                    <td>Steel purchase </td>

                    <td>
                      <p style={{ color: `${statusStyle}` }}>
                        SAR 30,0000
                      </p>
                    </td>
                    <td>12/04/2019</td>

                    <td>
                      <p style={{ backgroundColor: `${statusStyle}` }} className=" py-2 w-32 text-green-600 text-center rounded-full">
                      Confirmed
                      </p>
                    </td>
                  </tr>
               
            </tbody>
            <ReactPaginate
           previousLabel={"<"}
           nextLabel={">"}
           breakLabel={"..."}
           breakClassName={"break-me"}
           pageCount={5}
           marginPagesDisplayed={2}
           pageRangeDisplayed={5}
           onPageChange={8}
           containerClassName={"pagination"}
           subContainerClassName={"pages pagination"}
           activeClassName={"active"}
          />

          </table>
          
        </div>
        <div className="col-span-2  shadow-lg shadow-gray-300  h-72  rounded">
          <button className="flex justify-center items-center  text-lg w-full py-2 rounded bg-dark-gray text-white mr-2">
            {" "}
            {t("summary")}{" "}
            <FiTarget className="text-white ml-5 font-semibold" />{" "}
          </button>
          <div className="h-full   py-auto">
            <ul className="space-y-2 p-3 ">
              <li className="text-[18px] text-center font-normal text-primary-ash-400">
                {t("balance")}: 
                <p className="font-semibold">SAR {summary?.balance}</p>
              </li>
              <li className="text-[18px] text-center font-normal text-primary-ash-400">
                {t("next_repayment_date")}:
                <p className="font-semibold"> {summary?.repayment_date} </p>
              </li>
              <li className="text-[18px] text-center font-normal text-primary-ash-400">
                {t("next_repayment_ammount")}:
                <p className="font-semibold">  SAR {summary?.repayment_amount}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BillingStatement;
