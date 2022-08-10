import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  GetDeliveryNote,
  UploadDeliveryNote,
} from "../../../../Services/Actions/ActionCenterActions/ActionOverview";
// for language
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "../../../../Layout/MainLayout";
import UiInput from "../../../../Components/Common/ui/UiInput";
import UiButton from "../../../../Components/Common/ui/UiButton";
import CreditLine from "../../../../Assets/logo/creditLine.svg";
import Materials from "../../../../Assets/logo/material.svg";
import UploadNotes from "../../../../Assets/logo/upload.svg";
import UiArrowButton from "../../../../Components/Common/ui/UiArrowButton";
import CompanyInfo from "../../../../Assets/images/companyInformation.svg";
import Documentation from "../../../../Assets/images/documentation.svg";
import UiProgressBar from "../../../../Components/Common/ui/UiProgressBar";

const ActionOverview = () => {
  const { t } = useTranslation(); // For translating the language
  const client_id = localStorage.getItem("client_id");
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { client_details } = useSelector((state) => state.LogInfo);

  const { get_delivery_note } = useSelector((state) => state.ActionOverview);
  const clientDetails = client_details.client_details;

  // handle the modal and purchase list
  const handleDeliveryNote = async () => {
    setModalOpen(true);
    dispatch(GetDeliveryNote(clientDetails?.id));
  };
  // handle change
  const [deliveryInfo, setDeliveryInfo] = useState({});
  const [uploadFile, setUploadFile] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const fileUpload = (e) => {
    let files = e.target.files[0];
    const { name } = e.target;
    setUploadFile((prev) => ({
      ...prev,
      [name]: files,
    }));
  };

  // handle the modal form when submitted
  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("delivery_note", uploadFile.delivery_note);
    if (!deliveryInfo.purchase) {
      toast.error("Please select the purchase & delivery note", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
      return;
    }
    dispatch(
      UploadDeliveryNote(formData, clientDetails?.id, deliveryInfo.purchase)
    );
    setModalOpen(false);

  };
  return (
    <MainLayout>
      <div className="flex flex-wrap  ">
        <div className="h-60">
          <div className="top-6 ml-6">
            <h3 className="text-base font-bold p-3">{t("your_action_center")}</h3>
          </div>
          <div className="w-60 shadow-lg shadow-gray-300 p-3 ml-6">
            <div className="text-center">
              <p className="text-base font-medium">Actions needs approval</p>
              <Link to="/action-center/apply-credit">
                <div className="flex text-slate-500 text-sm p-2 border-2 h-auto w-52 rounded mb-7 bg-action-btnBg">
                  <img src={CreditLine} alt="Credit Line" />
                  <span className="mx-4 font-semibold">
                    {t("apply_for_creditline")}
                  </span>
                </div>
              </Link>
              <Link to="#">
                <div className="flex text-slate-500 text-sm p-2 border-2 h-auto w-52 rounded bg-action-btnBg">
                  <img src={Materials} alt="Purchase Materials" />
                  <span className="mx-2">
                    <b> {t("purchase_materials")} </b>
                  </span>
                </div>
              </Link>

              <div className="flex text-slate-500 text-sm p-2 border-2 h-auto w-52 rounded mt-7 bg-action-btnBg">
                <img src={UploadNotes} alt="Upload Notes" />
                <span
                  className="mx-4 font-semibold cursor-pointer"
                  onClick={() => handleDeliveryNote()}
                >
                  {t('upload_delivery_note')}
                </span>
              </div>
              {/* Modal is here */}
              <Modal
                ref={modalRef}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                // initialFocusRef={modalRef}
                center
              >
                <form onSubmit={handleSubmit}>
                  <h3>{t('upload_delivery_note_purchase')}</h3>
                  <br />
                  <div className="form-group">
                    <h3>{t('select_purchase')}</h3>
                    <select
                      onChange={handleChange}
                      name="purchase"
                      className="form-select px-4 py-3 border-2 rounded focus:focus:outline-none focus:ring focus:ring-dark-gray"
                    >
                      <option disabled selected>
                        {t('select')}
                      </option>
                      {get_delivery_note?.map((item) => (
                        <option value={item.id} key={item.id}>{`${item.material_description
                          } | ${item.total_amount}SAR | ${new Date(
                            item.created_at
                          ).toDateString()}`}</option>
                      ))}
                    </select>
                  </div>
                  <UiInput
                    label="Upload delivery note"
                    name="delivery_note"
                    type="file"
                    onChange={fileUpload}
                  // onChange={handleChange}
                  ></UiInput>
                  <div className="text-center">
                    <UiButton type="submit" label={t('confrim_delivery')}></UiButton>
                  </div>
                </form>
              </Modal>
            </div>
          </div>
        </div>
        {/* Company Info  */}
        <div className="shadow-lg w-96 h-96 border-borderColor rounded ml-3 mt-6">
          <div className="first-box-title">
            <h3 className="text-base text-primary-ash-400 font-semibold px-4 border-borderColor">
              {t("Company info")}
            </h3>
          </div>
          <div className="px-6 py-8">
            <img src={CompanyInfo} alt="Status" />
            <p className="text-sm font-medium text-status-light mt-2">Next Step:</p>
            <UiArrowButton label={t('Provide Company Details')} />
          </div>
        </div>

        {/* Documentation  */}
        <div className="col-span-3 shadow-lg w-96 h-96 border-borderColor rounded ml-3 mt-6">
          <div className="first-box-title">
            <h3 className="text-base text-primary-ash-400 font-semibold px-4 border-borderColor">
              {t("status")}
            </h3>
          </div>
          <div className="px-6 py-8">
            <img src={Documentation} alt="Documentation" />
            <p className="text-sm font-bold left-1 text-status-soft">0/10 DOCUMENTS UPLOADED</p>
            {/* progress bar  */}
            <UiProgressBar />
            <p className="text-sm font-medium text-status-light mt-2">Next Step</p>
            <UiArrowButton label={t('Upload Company Documents')} />
          </div>
        </div>
      </div>


    </MainLayout>
  );
};

export default ActionOverview;
