import React from "react";

const SelectInput = (props) => {
  return (
    <div>
      <label htmlFor={props.name} className="block pt-4 text-lg">
        {props.label}
      </label>
      <select name="companyType" onChange={props.onChange} id="companyType" className="border-[3px] border-inputBorder w-full block my-2 rounded focus:outline-inputBorder px-3 py-4 text-lg bg-white">
        <option disabled selected>Please select one</option>
        <option value="Contractor">Contractor</option>
        <option value="Trader">Trader</option>
        <option value="Manufacturer">Manufacturer</option>
      </select>
    </div>
  );
};

export default SelectInput;
