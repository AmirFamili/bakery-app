import React, { useContext } from "react";
import { GlobalContext } from "../../context/ContextWrapper";
import { Order } from "./Order";

export const History = () => {

  const { convertNumberToFarsi } = useContext(GlobalContext);

  return (
    <section className="  mt-2 px-10 py-28 max-md:px-5 max-lg:mt-0 h-full min-h-screen max-lg:pt-5 ">
      <h1 className="py-5 iranyekan-very-bold ">سفارشات شما</h1>
      <div className="w-full border rounded-2xl overflow-hidden mt-3">
        <table className="w-full ">
          <thead>
            <tr className="iranyekan-little-light text-gray-400 border-b  ">
              <th className="border-l w-10 p-6 "></th>
              <th className="w-52">سفارش</th>
              <th className="w-52">وضعیت</th>
              <th className="w-52">پرداخت شده</th>
              <th className="w-52">مانده حساب</th>
              <th className="w-32 max-md:hidden">کد سفارش</th>
              <th className="w-32 max-md:hidden">تاریخ</th>
            </tr>
          </thead>
          <tbody>
           
            <Order/>
          </tbody>
        </table>
        <div className=""></div>
      </div>
    </section>
  );
};
