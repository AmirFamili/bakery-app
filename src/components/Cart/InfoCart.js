import React, { useContext, useEffect, useState } from "react";
import ArrowLeftIcon from "../../images/icons/arrow-left.png";
import { GlobalContext } from "../../context/ContextWrapper";
import { CartProduct } from "./CartProduct";
import { CartCustomizeProduct } from "./CartCustomizeProduct";
import axios from "../../api/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

export const InfoCart = () => {
  const {
    convertNumberToFarsi,
    products,
    accessToken,
    countAll,
    cart,
    navigate,
    deliveryId,
    customizeProducts,
  } = useContext(GlobalContext);

  const validationSchema = Yup.object().shape({
    date: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .matches(
        /1[4][0-9][0-9]\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])/,
        "تاریخ مورد نظر صحیح نمی باشد."
      ),
    time: Yup.string().required("لطفا این قسمت را خالی نگذارید."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const [delivery, setDelivery] = useState();
  const [deliveryError, setDeliveryError] = useState(false);
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

  const clickHandler = async (value) => {
    if (!selectedDelivery) {
      setDeliveryError(true);
    } else {
      setDeliveryError(false);

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
          .then(async (response) => {
            await axios
              .patch(
                `/order/cart/${cart}/date_time/`,
                {
                  delivery_date_time: value.date + " " + value.time,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              )
              .then((response) => {
                   navigate("/cart/show-info");
              })
              .catch((err) => {
                if (err.response.data.error === "Please select a valid date.") {
                  setError("date", {
                    type: "server",
                    message: "این تاریخ گذشته است.",
                  });
                }else if (err.response.data.error === "Delivery date has limit.") {
                  setError("date", {
                    type: "server",
                    message: `این سفارش را می توانید ${err.response.data.preparation_days} سفارش دهید`,
                  });
                }else if (err.response.data.error === "Selected delivery date is close.") {
                  setError("date", {
                    type: "server",
                    message: 'برای این روز سفارشی ثبت نمی کنیم.',
                  });
                }
              });
          })
          .catch((err) => console.log(err));

     
      }
    }
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
            {customizeProducts &&
              customizeProducts.map((product, int) => (
                <CartCustomizeProduct
                  key={product.id}
                  number={int}
                  product={product}
                />
              ))}
          </tbody>
        </table>
        <div className=""></div>
      </div>
      <div className="w-1/3 px-5 py-2  relative max-md:w-full  max-md:flex max-md:justify-between max-md:p-2">
        <div className="mt-3">
          <h3 className="iranyekan-little-light"> نحوه تحویل سفارش:</h3>
          {delivery &&
            delivery.map((delivey) => (
              <div key={delivey.id} className="flex mt-5 z-30 mb-2">
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
          <span className=" text-red-600 iranyekan-very-light-white ">
            {deliveryError && "نحوه تحویل را انتخاب کنید."}
          </span>
          <div className="border-t my-5"></div>

          <form onSubmit={handleSubmit(clickHandler)}>
            <div className=" flex justify-between items-cente max-md:block ">
              <h3 className="iranyekan">تاریخ تحویل:</h3>
              <div className="max-md:my-5 max-md:w-3/4 ">
                <div className="flex relative">
                  <input
                    {...register("date")}
                    type="text"
                    name="date"
                    placeholder="مثال ۲۵-۷-۱۴۰۳"
                    className={` border w-full rounded-md h-10 py-2 px-6 outline-none iranyekan-very-light max-md:px-4 ${
                      errors.date ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.date && (
                  <span className="error text-red-600 iranyekan-very-light-white">
                    {errors.date.message}
                  </span>
                )}
              </div>
            </div>

            <div className=" flex mt-2 justify-between items-cente max-md:block ">
              <h3 className="iranyekan">ساعت تحویل:</h3>
              <div className="max-md:my-5 max-md:w-3/4 ">
                <div className="flex relative">
                  <input
                    {...register("time")}
                    type="time"
                    name="time"
                    placeholder="مثال ۱۵:۳۰"
                    className={` border w-full rounded-md h-10 py-2 px-6 outline-none iranyekan-very-light max-md:px-4 ${
                      errors.time ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.time && (
                  <span className="error text-red-600 iranyekan-very-light-white">
                    {errors.time.message}
                  </span>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="absolute inset-x-0 bottom-5 flex justify-center items-end max-md:static max-md:mt-10 ">
          <button
            onClick={handleSubmit(clickHandler)}
            // disabled={countAll === 0 ? true : false}
            className=" text-center w-52 flex justify-center items-center my-5 bg-primary text-font-white  rounded-xl shadow-xl py-2 px-3 vazir-regular  max-lg:max-w-48  max-md:w-32"
          >
            تایید و تکمیل سفارش{" "}
            <img
              src={ArrowLeftIcon}
              alt=" Arrow Left"
              className="w-5 mx-2 max-md:hidden"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
