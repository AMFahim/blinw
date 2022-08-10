import React, { useEffect, useState } from "react";
import MainLayout from "../../../../Layout/MainLayout";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PurchaseProjectDetails, GetClientStatus } from "../../../../Services/Actions/ActionCenterActions/ApplyCreditAction";
import { RiErrorWarningLine } from "react-icons/ri";
import ApprovePurchase from "../ApprovePurchase/ApprovePurchase";
import UiInput from "../../../../Components/Common/ui/UiInput";
import UiArrowButton from "../../../../Components/Common/ui/UiArrowButton";

const ActionPurchase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { get_status } = useSelector((state) => state.ApplyCredit);
  const [allTextInput, setAllTextInput] = useState({});
  const [file, setFile] = useState({});

  const { client_details } = useSelector((state) => state.LogInfo);
  const clientDetails = client_details.client_details;

  const handleTextInput = (event) => {
    const { name, value } = event.target;
    setAllTextInput(() => ({
      ...allTextInput,
      [name]: value,
    }));
  };
  const fileUpload = (event) => {
    let files = event.target.files[0];
    const { name } = event.target;
    setFile(() => ({
      ...file,
      [name]: files,
    }));
  };
  const submitPurchase = (e) => {
    e.preventDefault();
    const purchaseDetil = {
      material_description: allTextInput.material_description,
      total_amount: allTextInput.total_amount,
      supplier_name: allTextInput.supplier_name,
      iban: allTextInput.iban,
      status: 14,
      quote_file: file.quote_file,
    };

    dispatch(PurchaseProjectDetails(purchaseDetil));
    navigate("/action-center/order-purchase");
  };
  useEffect(() => {
    dispatch(GetClientStatus(client_details.client_details?.id));
  }, []);
  console.log('get_status',get_status);
  return (
    <>
      {get_status === 12 ? (
        <MainLayout>
          <div className="px-20 py-6 border-b-[3px] border-borderColor">
            <h3 className="text-2xl font-bold">
              Purchase your materials on credit now.
            </h3>
          </div>
          <div className="grid grid-rows-10 space-y-10 px-20 py-6">
            <form
              onSubmit={submitPurchase}
              className="col-span-6 w-2/4 mx-auto"
            >
              <UiInput
                name="material_description"
                label="Material description"
                value=""
                onChange={handleTextInput}
              ></UiInput>
              <UiInput
                name="total_amount"
                label="Total amount agreed with supplier (SAR)"
                value=""
                onChange={handleTextInput}
              ></UiInput>
              <UiInput
                name="supplier_name"
                label="Supplier name"
                value=""
                onChange={handleTextInput}
              ></UiInput>
              <UiInput
                name="iban"
                label="Supplier IBAN"
                value=""
                onChange={handleTextInput}
              ></UiInput>

              <UiInput
                label="Upload the quote from the supplier here."
                name="quote_file"
                type="file"
                onChange={fileUpload}
              ></UiInput>
              <div className="mx-44 mt-5">
                <UiArrowButton label="Next" />
              </div>
            </form>
          </div>
        </MainLayout>
      ) : get_status === 14 ? (
        <ApprovePurchase></ApprovePurchase>
      ) : (
        <MainLayout>
          <div className="mt-16 flex w-2/4 mx-auto items-center border-2 border-borderColor rounded-lg bg-red-300">
            <span className="px-6 py-8  border-r-2 border-borderColor bg-red-400">
              <RiErrorWarningLine className="text-3xl" />
            </span>
            <h3 className="p-4 text-xl bg-red-300">
              You do not have approval from staff for purchase order.
            </h3>
          </div>
        </MainLayout>
      )}
    </>
  );
};

export default ActionPurchase;
