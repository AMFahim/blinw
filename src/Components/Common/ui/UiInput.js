import React from "react";

const UiInput = (props) => {
  return (
    <div>
      <label htmlFor={props.name} className="block pt-4 text-lg">
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        defaultValue={props.value}
        disabled={props.disabled}
        className="border-[3px] border-inputBorder w-full block my-2 rounded focus:outline-inputBorder px-3 py-3 text-lg"
      />
    </div>
  );
};

export default UiInput;
