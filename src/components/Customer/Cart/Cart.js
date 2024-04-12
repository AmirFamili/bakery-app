import React from "react";
import CartOrangeIcon from "../../../images/icons/shopping-cart-orange.png";
import LocationGrayIcon from "../../../images/icons/location-tick-gray.png";
import CardTickGrayIcon from "../../../images/icons/card-tick.png";
import { Outlet } from "react-router-dom";
import {  useMatch, useResolvedPath } from "react-router-dom";

export const Cart = () => {
  const resolvedPath_2 = useResolvedPath('cart/show-info');
  const resolvedPath_3 = useResolvedPath('/cart');
  const isActive_2 = useMatch({ path: resolvedPath_2.pathname, end: true });
  const isActive_3 = useMatch({ path: resolvedPath_3.pathname, end: true });

  return (
    <section className="  mt-2 px-10 py-28 max-md:px-5 max-lg:mt-0 h-full min-h-screen max-lg:pt-5 ">
      <h1 className="py-5 iranyekan-very-bold ">سبد خرید شما</h1>

      <div className="flex  pt-3 mb-7  max-md:pr-5">
        {/* <ShowStep link='/cart' image={CartOrangeIcon} name='سبد خرید'/> */}
        <div className="flex justify-center items-center pl-24 max-md:pl-16">
          <img src={CartOrangeIcon} className="w-5 h-5 ml-2" alt="سبد خرید" />
          <p className="text-secondry iranyekan w-20">سبد خرید</p>
        </div>

      
        {/* <ShowStep link='/cart/show-info' image={LocationGrayIcon} name='اطلاعات ارسال'/> */}

        <div className="flex justify-center items-center pl-28 max-md:pl-20">
          <img src={LocationGrayIcon} className="w-5 h-5 ml-2" alt="سبد خرید" />
          <p className={`iranyekan-light w-28 max-md:w-24 ${isActive_2 && 'text-secondry'} `}>اطلاعات ارسال</p>
        </div>
        {/*  <ShowStep link='/cart/show-info' image={CardTickGrayIcon} name='پرداخت'/> */}
        <div className="flex justify-center items-center pl-28 max-md:pl-20">
          <img src={CardTickGrayIcon} className="w-5 h-5 ml-2" alt="سبد خرید" />
          <p className="iranyekan-light w-16">پرداخت</p>
        </div>
      </div>
      <Outlet />
    </section>
  );
};



const ShowStep = ({link,image,name}) => {
  const resolvedPath = useResolvedPath(link);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  
  return (
    <div className="flex justify-center items-center pl-24 max-md:pl-16">
      <img src={image} className="w-5 h-5 ml-2 " alt={name} />
      <p className={`${isActive &&'text-secondry'} iranyekan w-auto `}>{name}</p>
    </div>
  );
};
