import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';


const UiLargeArrowButton = (props) => {
  return (
    <div >
      <button className="flex justify-center items-center  text-lg px-40 py-2 rounded bg-primary-1 text-white mt-2 text-center">  {props.label} <AiOutlineArrowRight className="text-white font-semibold" />  </button>
    </div>
  );
};

export default UiLargeArrowButton;