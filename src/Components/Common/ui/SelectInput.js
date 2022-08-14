import React from "react";

const SelectInput = (props) => {
  return (
    <div>
      <label htmlFor={props.name} className="block pt-2 text-primary-label text-lg">
        {props.label}
      </label>
      <select name="companyType" onChange={props.onChange} id="companyType" className="border-0 bg-[#F4F5F7] border-inputBorder w-full block rounded focus:outline-inputBorder text-primary-label p-2 text-sm bg-white">
        <option disabled selected>Company Type</option>
        <option value="Contractor">Contractor</option>
        <option value="Trader">Trader</option>
        <option value="Manufacturer">Manufacturer</option>
      </select>
    </div>
  );
};

export default SelectInput;
