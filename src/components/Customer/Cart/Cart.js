import React from "react";
import CartOrangeIcon from "../../../images/icons/shopping-cart-orange.png";
import LocationGrayIcon from "../../../images/icons/location-tick-gray.png";
import CardTickGrayIcon from "../../../images/icons/card-tick.png";
import { Outlet } from "react-router-dom";

export const Cart = () => {
  return (
    <section className="  mt-2 px-10 py-28 max-md:px-5 max-lg:mt-0 h-full min-h-screen max-lg:pt-5 ">
      <h1 className="py-5 iranyekan-very-bold ">سبد خرید شما</h1>

      <div className="flex  pt-3 mb-7  max-md:pr-5">
        <div className="flex justify-center items-center ml-28">
          <img src={CartOrangeIcon} className="w-5 h-5 ml-2" alt="سبد خرید" />
          <p className="text-secondry iranyekan">سبد خرید</p>
        </div>
        <div className="flex justify-center items-center ml-28">
          <img src={LocationGrayIcon} className="w-5 h-5 ml-2" alt="سبد خرید" />
          <p className="iranyekan-light ">اطلاعات ارسال</p>
        </div>
        <div className="flex justify-center items-center ml-28">
          <img src={CardTickGrayIcon} className="w-5 h-5 ml-2" alt="سبد خرید" />
          <p className="iranyekan-light ">پرداخت</p>
        </div>
      </div>
      <Outlet />
    </section>
  );
};
