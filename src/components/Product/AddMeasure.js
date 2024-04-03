import React, { useState, useContext,useEffect } from "react";
import AddIcon from "../../images/icons/add.png";
import MinusIcon from "../../images/icons/minus.png";
import { GlobalContext } from "../../context/ContextWrapper";

export const AddMeasure = ({ measure }) => {
  const [count, setCount] = useState(0);
 
  const { convertNumberToFarsi,activeMeasure, setActiveMeasure } =
    useContext(GlobalContext);

  const handlerCheckCount = () => {
    if (count > 0) {
      return "group-hover:block";
    }
  };
  
  useEffect(()=>{
    activeMeasure !== measure.unit_measure && setCount(0)

  },[activeMeasure])

  return (
    <div key={measure.unit_measure} className="flex justify-between mt-5 ">
      <div className="flex">
        <input
          type="radio"
          name="price"
          className=" accent-primary"
          onClick={() => setActiveMeasure(measure.unit_measure)}
        />
        <div className="flex iranyekan-very-light-white mt-1">
          <p className="pr-2 w-10">{measure.unit_measure}</p>
          {measure.price_with_discount?<div className="flex"> <s><span className="pr-10"> {measure.price_per_unit} تومان</span></s>
          <span className="pr-10"> {measure.price_with_discount} تومان</span></div>: <span className="pr-10"> {measure.price_per_unit} تومان</span>}
         
        </div>
      </div>

      <div className="flex">
        <button
          onClick={() => {
            setCount(count - 1);
          }}
          className={`minus rounded-full w-7 bg-primary hidden max-md:w-6 ${handlerCheckCount()} `}
        >
          <img src={MinusIcon} alt="minus" />
        </button>

        <p className={`px-2 w-7 hidden iranyekan ${handlerCheckCount()} `}>
          { convertNumberToFarsi(count)}
        </p>

        <button
          disabled={activeMeasure === measure.unit_measure ? false : true }
          onClick={() => {
            setCount(count + 1);
          }}
          className="bg-primary rounded-full w-7  max-md:w-6"
        >
          <img src={AddIcon} alt="plus" />
        </button>
      </div>
    </div>
  );
};
