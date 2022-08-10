import React from 'react';
import { AiOutlineRight} from 'react-icons/ai';

const UiArrowButton = (props) => {
    return (
       
             <div >
             <button className="flex justify-center items-center  text-lg px-8 py-2 rounded bg-primary-1 text-white mt-2">  {props.label} <AiOutlineRight className="text-white ml-5 font-semibold" />  </button>
              </div>
      
    );
};

export default UiArrowButton;