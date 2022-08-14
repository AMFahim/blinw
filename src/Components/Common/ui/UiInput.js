import React from "react";

const UiInput = (props) => {
  return (
    <div>
      <label htmlFor={props.name} className="block pt-2 text-xs text-primary-label">
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        defaultValue={props.value}
        disabled={props.disabled}
        className="border-2 border-inputBorder w-full block rounded focus:outline-inputBorder p-1 text-lg"
      />
    </div>
  );
};

export default UiInput;
