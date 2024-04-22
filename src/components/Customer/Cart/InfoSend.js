import React, { useContext } from "react";
import { GlobalContext } from "../../../context/ContextWrapper";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "../../../api/axios";

export const InfoSend = () => {
  const {
    convertNumberToFarsi,
    totalPrice,
    totalDiscount,
    accessToken,
    cart,
    setCart,
    deliveryPrice,
    totalPayment,
    setCountAll,
   
  } = useContext(GlobalContext);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .min(3, "نام خود را کامل وارد کنید."),
    lastName: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .min(3, "نام خانوادگی خود را کامل وارد کنید."),
    phone: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .matches(
        /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/,
        "شماره تلفن نامعتبر می باشد."
      ),
    postalCode: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .matches(/^\d{10}$/, "کد پستی نامعتبر می باشد."),
    address: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .matches(/[,.-_]?[ء-ی0-9]+[,.-_]?/, "آدرس درست نمی باشد."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (values) => {
    await axios
      .post(
        "/order/order/",
        { cart_id: cart },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setCountAll(0);
        localStorage.removeItem("cart");
        setCart(null);
        window.location.href = "http://localhost:3000/history"
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" mt-5 p-1 pb-0 flex justify-center  border  rounded-2xl bg-white max-lg:block ">
      <div className="w-2/3  border-l max-lg:border-0 max-lg:w-full">
        <div className="">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" mr-10 my-7 w-3/6  max-sm:text-sm max-lg:w-4/5 max-md:mr-5 "
          >
            <div className="pb-3">
              <div className="flex relative">
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  placeholder="نام"
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light max-md:px-4${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.name && (
                <span className="error text-red-600 iranyekan-very-light-white">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="pb-3">
              <div className="flex relative">
                <input
                  {...register("lastName")}
                  type="text"
                  name="lastName"
                  placeholder="نام خانوادگی"
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light max-md:px-4${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.lastName && (
                <span className="error text-red-600 iranyekan-very-light-white">
                  {errors.lastName.message}
                </span>
              )}
            </div>

            <div className="pb-3">
              <div className="flex relative">
                <input
                  {...register("phone")}
                  type="phone"
                  name="phone"
                  placeholder="شماره تماس"
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light max-md:px-4${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.phone && (
                <span className="error text-red-600 iranyekan-very-light-white">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className="pb-3">
              <div className="flex relative">
                <input
                  {...register("postalCode")}
                  type="text"
                  name="postalCode"
                  placeholder="کدپستی"
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light max-md:px-4 ${
                    errors.postalCode ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.postalCode && (
                <span className="error text-red-600 iranyekan-very-light-white">
                  {errors.postalCode.message}
                </span>
              )}
            </div>

            <div className="">
              <div className="flex relative">
                <textarea
                  {...register("address")}
                  type="text"
                  name="address"
                  placeholder="آدرس"
                  className={` border w-full rounded-md h-20 mt-1  py-2 px-8 outline-none iranyekan-very-light max-md:px-4${
                    errors.address ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.address && (
                <span className="error text-red-600 iranyekan-very-light-white">
                  {errors.address.message}
                </span>
              )}
            </div>
          </form>
          <div className="m-10 max-md:hidden">
            <h4 className="iranyekan-very-light-white text-gray-500 h-8">
              نکات مربوط به ارسال سفارشات
            </h4>
            <p className="iranyekan-very-light-white text-gray-400 h-8">
              * یک روز کاری بعد از اینکه سفارش‌تان را در سایت ثبت کردید، تحویل
              شرکت پست می‌شوند.
            </p>
            <p className="iranyekan-very-light-white text-gray-400 h-8">
              * بین ۲ تا ۵ روز کاری بعد از اینکه سفارش شما تحویل پست شود، سفارش
              به دست شما خواهند رسید.
            </p>
            <p className="iranyekan-very-light-white text-gray-400 h-8">
              *دو روز بعد از ثبت سفارش کد رهگیری به شماره موبایل ثبت‌شده پیامک
              می‌شود.
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/3 p-5 relative max-lg:w-5/6  ">
        <div className="mt-3">
          <div className="flex justify-between items-center text-gray-600">
            <h3 className="iranyekan-little-light"> مجموع تخفیف:</h3>
            <h3 className="iranyekan-little-light">
              {convertNumberToFarsi( totalDiscount)} تومان
            </h3>
          </div>

          <div className="flex justify-between items-center mt-7 text-gray-600">
            <h3 className="iranyekan-little-light "> هزینه ارسال:</h3>
            <h3 className="iranyekan-little-light">
              {deliveryPrice === 0
                ? "رایگان"
                : convertNumberToFarsi(deliveryPrice) + " تومان"}
            </h3>
          </div>

          <div className="flex justify-between items-center mt-7 text-gray-600">
            <h3 className="iranyekan-little-light ">مجموع سبد خرید:</h3>
            <h3 className="iranyekan-little-light">
              {convertNumberToFarsi(totalPrice)} تومان
            </h3>
          </div>
          <div className="border-t my-7"></div>

          <div className="flex justify-between items-center mt-7 iranyekan">
            <h3> قابل پرداخت:</h3>
            <h3>{convertNumberToFarsi(totalPayment)} تومان</h3>
          </div>
        </div>

        <div className="absolute bottom-5 right-8 flex max-lg:left-5 max-lg:static max-lg:mt-5 max-lg:justify-end">
          <Link to={"/cart"}>
            {" "}
            <button className=" w-40 text-center  my-6 mx-3 bg-blue-very-light  rounded-xl shadow-xl py-3  vazir-regular max-xl:w-28 max-lg:w-32 max-md:w-28">
              مرحله قبل
            </button>
          </Link>

          <button
            onClick={handleSubmit(onSubmit)}
            className=" text-center w-40 my-6 bg-primary text-font-white  rounded-xl shadow-xl py-3  vazir-regular max-xl:w-28 max-lg:w-32 "
          >
            پرداخت
          </button>
        </div>
      </div>
    </div>
  );
};
