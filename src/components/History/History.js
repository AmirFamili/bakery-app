import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/ContextWrapper";
import { Order } from "./Order";
import axios from "../../api/axios";
import { Popup } from "./Popup";

export const History = () => {
  const { accessToken,loggedIn,navigate,togglePopup,showSituation } = useContext(GlobalContext);
  const [orders, setOrders] = useState(null);

  useEffect(()=>{
    if(!loggedIn){
      navigate('/');
    }
  },[])


  useEffect(() => {
    if (accessToken) {
      const getProduct = async () => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        await axios
          .get(
            `/order/order/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            },
            { signal }
          )
          .then((response) => {
            setOrders(response.data);
          })
          .catch((err) => console.log(err));

        return () => {
          abortController.abort();
        };
      };
      getProduct();
    }
  }, [accessToken]);

  return (
    <section className="  mt-2 px-10 py-28 max-md:px-5  h-full min-h-screen max-lg:pt-5 max-lg:mt-20 ">
      <h1 className="py-5 iranyekan-very-bold ">سفارشات شما</h1>
      <div className="w-full border rounded-2xl overflow-hidden mt-3">
        <table className="w-full table bg-white ">
          <thead>
            <tr className="iranyekan-little-light text-gray-400 border-b  ">
              <th className="border-l w-10 py-6  "></th>
              <th className="w-52">سفارش</th>
              <th className="w-52">وضعیت</th>
              <th className="w-52">پرداخت شده</th>
              <th className="w-52">باقی مانده</th>
              <th className="w-32 max-md:hidden">کد سفارش</th>
              <th className="w-32 max-md:hidden">تاریخ</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order, index) => (
              <Order key={order.id} order={order} index={index} />
              ))}
          </tbody>
        </table>
        {showSituation && showSituation &&
        <Popup onClose={togglePopup}  />}
      </div>
    </section>
  );
};
