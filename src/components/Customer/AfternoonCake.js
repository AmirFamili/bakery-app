import React from "react";
import { NewProduct } from "../HomePage/NewProduct";
import ArrowLeftBlack from "../../images/icons/arrow-circle-left-black.png";
import ArrowRightBlack from "../../images/icons/arrow-circle-right-gray.png";

export const AfternoonCake = () => {
  return (
    <div className="p-5 max-md:p-1">
      <div className="flex justify-around items-center flex-wrap">
        <NewProduct />
        <NewProduct />
        <NewProduct />
        <NewProduct />
        <NewProduct />
        <NewProduct />
        <NewProduct />
        <NewProduct />
        <NewProduct />
        <NewProduct />
      </div>
      <div className="flex justify-center items-center">
        <img src={ArrowRightBlack} alt="Arrow right" className="w-6 mx-2" />
        <p className="px-5 vazir-very-little">1</p>
        <img src={ArrowLeftBlack} alt="Arrow left" className="w-6 mx-2" />
      </div>
    </div>
  );
};
