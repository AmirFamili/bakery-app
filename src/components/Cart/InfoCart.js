import React, { useContext, useEffect, useState } from "react";
import ArrowLeftIcon from "../../images/icons/arrow-left.png";
import { GlobalContext } from "../../context/ContextWrapper";
import { CartProduct } from "./CartProduct";
import axios from "../../api/axios";

export const InfoCart = () => {
  const { convertNumberToFarsi, products, accessToken, countAll, cart,navigate,deliveryId  } =
    useContext(GlobalContext);

  const [delivery, setDelivery] = useState();
  const [selectedDelivery, setSelectedDelivery] = useState(deliveryId);

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
        .then((response) => {
          navigate("/cart/show-info") 
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="min-h-96 mt-5 p-1 pb-0 flex justify-center  border  rounded-2xl bg-white max-md:block ">
      <div className="w-2/3  border-l max-md:border-0 max-md:w-full">
        <table className="w-full ">
          <thead>
            <tr className="iranyekan-little-light text-gray-400 border-b  ">
              <th className="border-l w-10 p-6 "></th>
              <th className="w-52">نام محصول</th>
              <th className="w-52">قیمت</th>
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
              <div key={delivey.id} className="flex mt-5">
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
        <div className="absolute inset-0 flex justify-center items-end max-md:static max-md:mt-10">
         
            <button
              onClick={clickHandler}
              disabled={countAll === 0 ? true : selectedDelivery ? false : true}
              className=" text-center w-52 flex justify-center items-center my-5 bg-primary text-font-white  rounded-xl shadow-xl py-2 px-3 vazir-regular  max-lg:max-w-48  max-md:w-32"
            >
              تایید و تکمیل سفارش
              <img src={ArrowLeftIcon} alt=" Arrow Left" className="w-5 mx-2 max-md:hidden" />
            </button>
         
        </div>
      </div>
    </div>
  );
};
