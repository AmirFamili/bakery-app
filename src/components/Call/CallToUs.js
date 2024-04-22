import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "../../api/axios";
import SuccessIcon from "../../images/icons/success.png";
import Call from "../../images/call.jpg";

export const CallToUs = () => {
  const [showSuccess, setShowSucccess] = useState(false);
  const goBackBox = () => {
    setTimeout(() => {
      setShowSucccess(false);
    }, 2500);
  };
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .min(5, "لطفا کامل وارد کنید."),
    email: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .email("لطفا ایمیل معتبر وارد کنید."),
    message: Yup.string().required("لطفا این قسمت را خالی نگذارید."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (values) => {
    await axios
      .post("/settings/contact_us/", {
        full_name: values.fullName,
        email: values.email,
        message: values.message,
      })
      .then((response) => {
        reset();
        setShowSucccess(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className="  py-32 max-md:px-5  h-screen min-h-screen max-lg:pt-5 max-lg:mt-20 relative">
      <h1 className="py-5 iranyekan-very-bold px-10">ارتباط با ما</h1>
      <div className="flex justify-between  ">
        <div className="mt-5 w-1/2  max-lg:w-full overflow-hidden relative">
          <h2 className="iranyekan mx-auto text-center ">
            لطفا نظرات خود را در رابطه با خدمات ما بنویسید
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" mx-auto my-7   max-sm:text-sm  w-1/2 max-md:w-2/3"
          >
            <div className="pb-3">
              <input
                {...register("fullName")}
                type="text"
                name="fullName"
                placeholder="نام و نام خانوادگی"
                className={` border w-full rounded-md h-10 mt-1  p-2  outline-none iranyekan-very-light ${
                  errors.fullName ? "border-red-500" : ""
                }`}
              />

              {errors.fullName && (
                <span className="error text-red-600 iranyekan-very-light-white">
                  {errors.fullName.message}
                </span>
              )}
            </div>
            <div className="pb-3">
              <input
                {...register("email")}
                type="text"
                name="email"
                placeholder=" ایمیل"
                className={` border w-full rounded-md h-10 mt-1  p-2  outline-none iranyekan-very-light ${
                  errors.email ? "border-red-500" : ""
                }`}
              />

              {errors.email && (
                <span className="error text-red-600 iranyekan-very-light-white">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="pb-3">
              <textarea
                {...register("message")}
                type="text"
                name="message"
                placeholder="نظر خود را بنویسید..."
                className={` border w-full rounded-md h-48 mt-1  p-2  outline-none iranyekan-very-light ${
                  errors.message ? "border-red-500" : ""
                }`}
              />

              {errors.message && (
                <span className="error text-red-600 iranyekan-very-light-white">
                  {errors.message.message}
                </span>
              )}
            </div>

            <div className="flex justify-center items-center mt-10">
              <button
                className=" vazir-very-light  shadow-lg  bg-primary text-white py-3 px-14 rounded-2xl max-md:px-10 max-md:py-3 "
                type="submit"
              >
                ثبت نظر{" "}
              </button>
            </div>
          </form>
          <div
            className={`absolute top-32  transition  flex justify-center items-center py-4 px-10 bg-white rounded-2xl shadow-lg border iranyekan ${
              showSuccess
                ? "-translate-x-48  delay-75 "
                : " translate-x-full -right-2/6"
            } ${goBackBox()}`}
          >
            <img src={SuccessIcon} alt="success" className="w-11 ml-2" />
            پیام شما ارسال شد.
          </div>
        </div>

        <div className="w-1/2  absolute  top-25 border-t-4 border-gray-main left-0 bottom-0 max-lg:hidden">
          <img className="w-full h-full" src={Call} alt="تماس با ما" />
        </div>
      </div>
    </section>
  );
};
