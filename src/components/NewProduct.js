import React from "react";
import CupCake from "../images/cup-cake.png";
import AddIcon from "../images/icons/add.png";

export const NewProduct = () => {
  return (
    <div className="pl-5 py-5">
      <div className="p-6 w-56 bg-white shadow-lg rounded-2xl ">
        <img src={CupCake} alt="cup cake" className="-mt-16 w-28 mx-auto shadow-md rounded-full" />
        <h3 className="iranyekan-bold my-3">کاپ کیک کدوحلوایی</h3>
        <h4 className=" my-3 iranyekan-very-light">هر اسلایس:</h4>
        <div className="flex justify-between items-center">
         
          <h5 className="my-1 iranyekan-low-bold">
            ۱۲.۰۰۰ <span className="text-gray-400">تومان</span>{" "}
          </h5>
          <button className="bg-primary rounded-full w-7">
            <img src={AddIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
