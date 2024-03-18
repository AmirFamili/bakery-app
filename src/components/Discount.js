import React from "react";
import DiscountIcon from "../images/icons/discount.png";
import ArrowCircleLeftPrimary from "../images/icons/arrow-circle-left-primary.png";
import { DiscountProduct } from "./DiscountProduct";

export const Discount = () => {
  return (
    <section className="p-6  ">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={DiscountIcon} alt="tag" className="w-5 h-5 mt-1" />
          <h2 className="iranyekan-medium pr-3">تخفیف‌ها</h2>
        </div>
        <div className="flex justify-center items-center cursor-pointer mt-3">
          <p className=" iranyekan-light ">مشاهده همه</p>
          <img
            src={ArrowCircleLeftPrimary}
            alt="arrow-circle-left"
            className="w-7 mr-2"
          />
        </div>
      </div>

      <div className=" grid grid-flow-col justify-start overflow-x-auto overscroll-x-auto py-6 mt-10 ">
       
        <DiscountProduct />
        <DiscountProduct />
        <DiscountProduct />
        <DiscountProduct />
      </div>
    </section>
  );
};
