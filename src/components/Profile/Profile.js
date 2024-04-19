import React, { useContext } from "react";
import {Link } from 'react-router-dom'
import axios from "../../api/axios";
import { GlobalContext } from "../../context/ContextWrapper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ProfileIcon from "../../images/icons/profile-xl.png";
import AddIcon from "../../images/icons/add-gray.png";

import * as Yup from "yup";

export const Profile = () => {
  const { accessToken, convertNumberToFarsi } = useContext(GlobalContext);

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
      .matches(/^\d{5}-\d{5}$/, "کد پستی نامعتبر می باشد.(مثال 12345-67891)"),
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
    // await axios
    //   .post(
    //     "/order/order/",
    //     { cart_id: cart },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${accessToken}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     reset();
    //   })
    //   .catch((err) => console.log(err));
    //   localStorage.removeItem('cart');
    //   setCart(null);
  };

  return (
    <section className="  mt-2 px-10 py-28 max-md:px-5 max-lg:mt-0 h-full min-h-screen max-lg:pt-5 ">
      <h1 className="py-5 iranyekan-very-bold ">حساب کاربری </h1>
      <h2 className="iranyekan-little-light text-gray-400">
        شما میتوانید اطلاعات حساب کاربری خود را ویرایش کنید.
      </h2>
      <div className="flex justify-center items-center  ">
        <div className="w-4/6 mt-8 max-lg:w-5/6 max-md:w-full">
          <div className="flex ">
            <div className=" rounded-full w-32 p-5 cursor-pointer relative bg-gray-100 max-xl:w-28 max-lg:w-24 max-sm:w-20">
              <img
                src={ProfileIcon}
                alt="حساب کاربری"
                className="w-20 m-auto max-md:w-10"
              />
              <div className="absolute p-1 left-0 bottom-0 bg-gray-main rounded-full">
                <div className="bg-gray-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-7 h-7 text-gray-400 max-md:w-4  max-md:h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="pt-10 pr-10 max-xl:pr-5  max-xl:pt-5">
              <h3 className="iranyekan ">رعنا شیخی</h3>
              <div className="flex mt-5">
                <h4 className="iranyekan-very-light ml-5 max-xl:ml-3 max-md:ml-2">
                  کل سفارشات ثبت شده: <span>{convertNumberToFarsi(12)}</span>{" "}
                </h4>
                <h4 className="iranyekan-very-light mx-5 max-xl:mx-3 max-md:mx-2">
                  سفارشات تحویل گرفته: <span>{convertNumberToFarsi(11)}</span>{" "}
                </h4>
                <h4 className="iranyekan-very-light mx-5 max-xl:mx-3 max-md:mx-2">
                  سفارشات درحال آماده سازی:{" "}
                  <span>{convertNumberToFarsi(1)}</span>{" "}
                </h4>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center ">
            <div className="w-10/12 ">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className=" w-full my-7  max-sm:text-sm  max-md:mr-5 "
              >
                <div className="flex w-full">
                  <div className="pb-3 w-1/2 ml-1.5">
                    <div className="flex relative">
                      <input
                        {...register("name")}
                        type="text"
                        name="name"
                        placeholder="نام"
                        className={` border w-full rounded-xl h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
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

                  <div className="pb-3 w-1/2 mr-1.5">
                    <div className="flex relative">
                      <input
                        {...register("lastName")}
                        type="text"
                        name="lastName"
                        placeholder="نام خانوادگی"
                        className={` border w-full rounded-xl h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
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
                </div>
                <div className="flex w-full">
                  <div className="pb-3 w-1/2 ml-1.5">
                    <div className="flex relative">
                      <input
                        {...register("phone")}
                        type="phone"
                        name="phone"
                        placeholder="شماره تماس"
                        className={` border w-full rounded-xl h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
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

                  <div className="pb-3 w-1/2 mr-1.5">
                    <div className="flex relative">
                      <input
                        {...register("postalCode")}
                        type="text"
                        name="postalCode"
                        placeholder="کدپستی"
                        className={` border w-full rounded-xl h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
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
                </div>
                <div className="">
                  <div className="flex relative">
                    <textarea
                      {...register("address")}
                      type="number"
                      name="address"
                      placeholder="آدرس"
                      className={` border w-full rounded-xl h-32 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
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
                <div className="flex justify-center  items-center">
                  {" "}
                  <Link to={"/cart"}>
                    {" "}
                    <button className=" w-40 text-center  m-6  bg-blue-very-light  rounded-xl shadow-xl py-3  vazir-regular max-xl:w-28 max-lg:w-28 ">
                      مرحله قبل
                    </button>
                  </Link>
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className=" text-center w-40 m-6  bg-primary text-font-white  rounded-xl shadow-xl py-3  vazir-regular max-xl:w-28 max-lg:w-28 "
                  >
                    ذخیره تغییرات
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
