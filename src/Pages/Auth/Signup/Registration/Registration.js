import React, { useState } from "react";
import CheckboxInput from "../../../../Components/Common/ui/CheckboxInput";
import UiButton from "../../../../Components/Common/ui/UiButton";

const Registration = () => {
  const [isAgree, setIsAgree] = useState(false);
  const handleChange = (e) => {
    const agreeTerms = e.target.checked;
    setIsAgree(agreeTerms);
  };
  const handleRegistration = (e) => {
    e.preventDefault();
    if (isAgree === true) {
    }
  };
  return (
    <>
      <div className="pt-14">
        <div className="px-8 py-12 rounded-xl w-4/12 mx-auto">
          <div className="pb-6 text-center">
            <h3 className="text-5xl text-blue-light pb-8">Register</h3>
            <p>Credit data agreement</p>
          </div>
          <div></div>
          <form onSubmit={handleRegistration}>
            <div className="text-center flex space-x-4">
              <CheckboxInput name="isAgree" onChange={handleChange} />
              <p className="py-2 text-blue-normal font-semibold">
                I have read the above agreement and agree to allow Bildnw to
                gather data related to my comapny (CR XXXXXXXXX) from Simah.
              </p>
            </div>
            <div className="text-center my-8">
              {/* <Link to="/verification"> */}
              <UiButton label="Complete registration" />
              {/* </Link> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
