import React, { useContext, useEffect, useState } from "react";
import ArrowLeftIcon from "../../images/icons/arrow-left.png";
import { GlobalContext } from "../../context/ContextWrapper";
import { CartProduct } from "./CartProduct";
import axios from "../../api/axios";
import { DatePicker } from "@kasraghoreyshi/datepicker";
import "@kasraghoreyshi/calendar/styles.css";
import "@kasraghoreyshi/datepicker/styles.css";

export const InfoCart = () => {
  const {
    convertNumberToFarsi,
    products,
    accessToken,
    countAll,
    cart,
    navigate,
    deliveryId,
  } = useContext(GlobalContext);

  const [delivery, setDelivery] = useState();
  const [selectedDelivery, setSelectedDelivery] = useState(deliveryId);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (accessToken) {
      const getProduct = async () => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        await axios
          .get(
            `/order/delivery/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            },
            { signal }
          )
          .then((response) => {
            setDelivery(response.data);
          })
          .catch((err) => console.log(err));

        return () => {
          abortController.abort();
        };
      };
      getProduct();
    }
  }, [accessToken]);

  const clickHandler = async () => {
    if (cart) {
      if (selectedDate) {
        await axios
          .patch(
            `/order/cart/${cart}/`,
            {
              delivery_method: selectedDelivery,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then(async (response) => {
            await axios
              .patch(
                `/order/cart/${cart}/date_time/`,
                {
                  delivery_date_time: selectedDate,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              )
              .then((response) => {
                console.log(response.data);
              
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }else{

      }
      navigate("/cart/show-info");
    }
  };

  const handlerChangeDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <div
      className={`min-h-96 mt-5 p-1 pb-0 flex justify-center  border  rounded-2xl bg-white max-md:block  max-md:min-h-52 ${
        countAll === 0 && "hidden max-md:hidden"
      }`}
    >
      <div className="w-2/3  border-l max-md:border-0 max-md:w-full">
        <table className="w-full ">
          <thead>
            <tr className="iranyekan-little-light text-gray-400 border-b ">
              <th className="border-l w-10 p-3 "></th>
              <th className="w-52 p-3">نام محصول</th>
              <th className="w-52 max-sm:hidden">قیمت</th>
              <th className="w-52">تعداد</th>
              <th className="w-52">مجموع قیمت</th>
              <th className="w-32"></th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, int) => (
                <CartProduct key={product.id} number={int} product={product} />
              ))}
          </tbody>
        </table>
        <div className=""></div>
      </div>
      <div className="w-1/3 p-5  relative max-md:w-full  max-md:flex max-md:justify-between max-md:p-2">
        <div className="mt-3">
          <h3 className="iranyekan-little-light"> نحوه تحویل سفارش:</h3>
          {delivery &&
            delivery.map((delivey) => (
              <div key={delivey.id} className="flex mt-5 z-30">
                <input
                  type="radio"
                  checked={selectedDelivery === delivey.id}
                  onChange={() => setSelectedDelivery(delivey.id)}
                  name="price"
                  className=" accent-primary"
                />

                <p className="pr-2 iranyekan-very-light-white">
                  {delivey.name} _{" "}
                  <span className="iranyekan-very-light-small">
                    هزینه ارسال{" "}
                    {delivey.cost === 0
                      ? "رایگان"
                      : convertNumberToFarsi(delivey.cost)}{" "}
                  </span>
                </p>
              </div>
            ))}
        </div>
        <div className="border-t my-7"></div>
        <div className=" z-50 flex justify-between items-center">
          <h3 className="iranyekan">تاریخ تحویل:</h3>
          <DatePicker dateFormat=" d / M / yyyy" onChange={handlerChangeDate}/>
        </div>

        <div className="absolute inset-x-0 bottom-5 flex justify-center items-end max-md:static max-md:mt-10 ">
          <button
            onClick={clickHandler}
            disabled={countAll === 0 ? true : selectedDelivery ? selectedDate? false : true: true}
            className=" text-center w-52 flex justify-center items-center my-5 bg-primary text-font-white  rounded-xl shadow-xl py-2 px-3 vazir-regular  max-lg:max-w-48  max-md:w-32"
          >تایید و تکمیل سفارش  <img
              src={ArrowLeftIcon}
              alt=" Arrow Left"
              className="w-5 mx-2 max-md:hidden"
            /></button>
        </div>
      </div>
    </div>
  );
};
