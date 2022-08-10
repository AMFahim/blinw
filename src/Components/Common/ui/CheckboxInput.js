import React from 'react';

const CheckboxInput = (props) => {
    return (
        <div className="my-3 flex">
            <input type="checkbox" onChange={props.onChange} name={props.name} className="w-6 h-6 cursor-pointer"/>
            <label htmlFor="checkbox" className="ml-3"> {props.label} </label>
        </div>
    );
};

export default CheckboxInput;