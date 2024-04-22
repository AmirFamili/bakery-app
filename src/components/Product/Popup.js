import React, { useContext } from "react";
import { GlobalContext } from "../../context/ContextWrapper";
import { AddMeasure } from "./AddMeasure";

export const Popup = ({ onClose, product }) => {
  const { setActiveMeasure, } = useContext(GlobalContext);
 
  return (
    <div className="fixed top-0 right-0 w-screen h-screen flex justify-center items-center z-50 border text-black ">
      <div className="bg-white rounded-lg p-5 border w-2/6 max-lg:w-3/6 max-md:w-5/6">
        <h3 className="iranyekan-little-light mt-3">
          نوع سفارش خود را انتخاب کنید:
        </h3>
        <h4 className="iranyekan-very-light mt-3">
          کیک مرغ به صورت اسلایس و کیلویی ثبت سفارش می شود.
        </h4>

        <div className="mt-5">
          {product.pricemodel_set.map((measure) => (
            <AddMeasure key={measure.unit_measure_id} measure={measure} product={product}/>
          ))}
        </div>
        <div className="text-center mt-5">
          <button
            onClick={() => {
              setActiveMeasure(null);
              onClose();
            }}
            className="my-4  bg-primary text-font-white rounded-xl shadow-lg py-2 px-11 vazir-regular"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
};
