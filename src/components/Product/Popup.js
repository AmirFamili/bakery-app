import React, { useContext, useEffect, useState } from "react";
import AddIcon from "../../images/icons/add.png";
import MinusIcon from "../../images/icons/minus.png";
import axios from "../../api/axios";
import { GlobalContext } from "../../context/ContextWrapper";

export const Popup = ({ onClose, price }) => {
  const [countSlice, setCountSlice] = useState(0);
  const [countKilo, setCountKilo] = useState(0);

  const {
    togglePopup,
    setLoggedIn,
    convertNumberToFarsi,
    cart,
    dispatchCalCart,
  } = useContext(GlobalContext);

  useEffect(() => {}, []);

  const handlerCheckCountSlice = () => {
    if (countSlice > 0) {
      return "group-hover:block";
    }
  };

  const handlerIncreaseSlice = () => {
    // dispatchCalCart(cart + 1);
    setCountSlice(countSlice + 1);
  };

  const handlerDecreaseSlice = () => {
    if (countSlice > 0) {
      // dispatchCalCart(cart - 1);
      setCountSlice(countSlice - 1);
    }
  };

  const handlerCheckCountKilo = () => {
    if (countKilo > 0) {
      return "group-hover:block";
    }
  };

  const handlerIncreaseKilo = () => {
    // dispatchCalCart(cart + 1);
    setCountKilo(countKilo + 1);
  };

  const handlerDecreaseKilo = () => {
    if (countKilo > 0) {
      // dispatchCalCart(cart - 1);
      setCountKilo(countKilo - 1);
    }
  };
  return (
    <div className="fixed top-0 right-0 w-screen h-screen flex justify-center items-center z-50 border text-black ">
      <div className="bg-white rounded-lg p-5 border  ">
        <h3 className="iranyekan-little-light mt-3">
          نوع سفارش خود را انتخاب کنید:
        </h3>
        <h4 className="iranyekan-very-light mt-3">
          کیک مرغ به صورت اسلایس و کیلویی ثبت سفارش می شود.
        </h4>

        <div className="mt-5">
          {price.map((measure) => {
         
            // <div className="flex justify-between mt-5">
            //   <div className="flex">
            //     <input
            //       type="radio"
            //       name="price"
            //       className=" accent-primary"
            //       clicked
            //     />
            //     <div className="flex iranyekan-very-light-white mt-1">
            //       <p className="pr-2 w-10">{measure.unit_measure}</p>
            //       <span className="pr-10"> {price.price_per_unit} </span> تومان
            //     </div>
            //   </div>

            //   <div className="flex">
            //     <button
            //       onClick={handlerDecreaseSlice}
            //       className={`minus rounded-full w-7 bg-primary hidden max-md:w-6 ${handlerCheckCountSlice()} `}
            //     >
            //       <img src={MinusIcon} alt="minus" />
            //     </button>

            //     <p
            //       className={`px-2 w-7 hidden iranyekan ${handlerCheckCountSlice()} `}
            //     >
            //       {convertNumberToFarsi(countSlice)}
            //     </p>

            //     <button
            //       onClick={handlerIncreaseSlice}
            //       className="bg-primary rounded-full w-7  max-md:w-6"
            //     >
            //       <img src={AddIcon} alt="plus" />
            //     </button>
            //   </div>
            // </div>;
          })}
          {/* <div className="flex justify-between mt-5">
            <div className="flex">
              <input type="radio" name="price" className=" accent-primary" clicked />
              <div className="flex iranyekan-very-light-white mt-1">
                <p className="pr-2 w-10">اسلایس</p>
                <span className="pr-10">  {price[0].price_per_unit} </span > تومان 
              </div>
            </div>

            <div className="flex">
              <button
                onClick={handlerDecreaseSlice}
                className={`minus rounded-full w-7 bg-primary hidden max-md:w-6 ${handlerCheckCountSlice()} `}
              >
                <img src={MinusIcon} alt="minus" />
              </button>

              <p className={`px-2 w-7 hidden iranyekan ${handlerCheckCountSlice()} `}>
                {convertNumberToFarsi(countSlice)}
              </p>

              <button
                onClick={handlerIncreaseSlice}
                className="bg-primary rounded-full w-7  max-md:w-6"
              >
                <img src={AddIcon} alt="plus" />
              </button>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex">
              <input type="radio" name="price" className=" accent-primary" />
              <div className="flex iranyekan-very-light-white mt-1">
                <p className="pr-2 w-10">کیلو</p>
                <span className="pr-10">75.000 </span>تومان
              </div>
            </div>

            <div className="flex">
              <button
                onClick={handlerDecreaseKilo}
                className={`minus rounded-full w-7 bg-primary hidden max-md:w-6 ${handlerCheckCountKilo()} `}
              >
                <img src={MinusIcon} alt="minus" />
              </button>

              <p className={`px-2 w-7 hidden iranyekan ${handlerCheckCountKilo()} `}>
                {convertNumberToFarsi(countKilo)}
              </p>

              <button
                onClick={handlerIncreaseKilo}
                className="bg-primary rounded-full w-7  max-md:w-6"
              >
                <img src={AddIcon} alt="plus" />
              </button>
            </div>
          </div> */}
        </div>
        <div className="text-center mt-5">
          <button
            onClick={onClose}
            className="my-4  bg-primary text-font-white rounded-xl shadow-lg py-2 px-11 vazir-regular"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
};
