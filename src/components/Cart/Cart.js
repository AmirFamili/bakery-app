import React, { useEffect, useContext, useState } from "react";
import CartOrangeIcon from "../../images/icons/shopping-cart-orange.png";
import LocationGrayIcon from "../../images/icons/location-tick-gray.png";
import LocationOrangeIcon from "../../images/icons/Location-tick-orange.png";
import CardTickGrayIcon from "../../images/icons/card-tick.png";
import cardTickOrangeIcon from '../../images/icons/card-tick-orange.png'

import { Outlet, useMatch,Link } from "react-router-dom";
import { GlobalContext } from "../../context/ContextWrapper";

export const Cart = () => {
  const isActive_2 = useMatch({ path: "/cart/show-info", end: true });
  const isActive_3 = useMatch({ path: "/cart/payment", end: true });
  
  const { loggedIn, navigate, countAll } = useContext(GlobalContext);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }

  }, []);

  return (
    <section className=" relative mt-2 px-10 py-28 max-md:px-5  h-full min-h-screen max-lg:pt-5 max-lg:mt-20">
      <h1 className="py-5 iranyekan-very-bold ">سبد خرید شما</h1>
      <div className= {`absolute flex flex-col justify-center items-center h-1/2 w-11/12 ${countAll>0 && 'hidden'}`}>
        <h2 className="iranyekan-medium text-gray-400" >سبد خرید شما خالی می باشد.</h2>
        <Link to='/' className="border rounded-xl text-primary shadow-lg p-2 mt-16 vazir-regular max-md:mt-10">بازگشت به صفحه خانه</Link>
      </div>
      <div
        className={`flex  pt-3 mb-7  max-md:pr-5 ${countAll === 0 && "hidden"}`}
      >
        <div className="flex justify-center items-center pl-24 max-md:pl-0">
          <img src={CartOrangeIcon} className="w-5 h-5 ml-2" alt="سبد خرید" />
          <p className="text-secondry iranyekan w-20">سبد خرید</p>
        </div>

        <div className="flex justify-center items-center pl-28 max-md:pl-5">
          {isActive_2 ? (
            <img
              src={LocationOrangeIcon}
              className="w-5 h-5 ml-2"
              alt="سبد خرید"
            />
          ) :isActive_3? (
            <img
              src={LocationOrangeIcon}
              className="w-5 h-5 ml-2"
              alt="سبد خرید"
            />
          ) :(
            <img
              src={LocationGrayIcon}
              className="w-5 h-5 ml-2"
              alt="سبد خرید"
            />
          )}{" "}
          <p
            className={` w-28 max-md:w-24 ${
              isActive_2 ? "text-secondry iranyekan" : isActive_3?"text-secondry iranyekan" : "iranyekan-light"
            } `}
          >
            اطلاعات ارسال
          </p>
        </div>
        <div className="flex justify-center items-center pl-28 max-md:pl-5">
          {isActive_3? <img src={cardTickOrangeIcon} className="w-5 h-5 ml-2" alt="سبد خرید" />: 
          <img src={CardTickGrayIcon} className="w-5 h-5 ml-2" alt="سبد خرید" />}
          <p
            className={` w-16 ${
              isActive_3 ? "text-secondry iranyekan" : "iranyekan-light"
            } `}
          >
            پرداخت
          </p>
        </div>
      </div>
      <Outlet />
    </section>
  );
};
