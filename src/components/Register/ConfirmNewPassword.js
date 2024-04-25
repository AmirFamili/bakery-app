import React, { useContext, useEffect, useState } from "react";
import KeyIcon from "../../images/icons/key.png";
import EyeIcon from "../../images/icons/eye.png";
import axios from "../../api/axios";
import { GlobalContext } from "../../context/ContextWrapper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const ConfirmNewPassword = () => {
  const { logo } = useContext(GlobalContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const validationSchema = Yup.object().shape({
    Newpassword: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .min(8, "رمز عبور باید بیشتر از ۸ کاراکتر باشد."),
    confirmNewPassword: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .oneOf([Yup.ref("password")], "رمز عبور یکی نمی باشد."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (values) => {
    await axios
      .post(`/auth/password_reset_confirm/`, {
        new_password: values.Newpassword,
        confirm_new_password: values.confirmNewPassword,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <section className="bg-gray-main h-screen w-full flex justify-center items-center">
      <div className=" bg-white border w-2/5 rounded-2xl p-5 relative max-md:w-4/5 pb-20">
        <div className="flex justify-center items-center p-2">
          <img src={logo} alt="بلو کیک" className="w-24 max-md:w-20" />
        </div>
        <h1 className="iranyekan-medium text-center mt-10">بازیابی رمز عبور</h1>
        <h2 className="iranyekan-light text-center mt-3">
          رمز عبور جدید خود را وارد کنید.
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" mx-auto my-7 w-3/5  max-sm:text-sm max-md:w-4/5 "
        >
          <div className="pb-3">
            <div className="flex relative">
              <img
                src={KeyIcon}
                alt="key"
                className="absolute w-4 top-4 mr-2"
              />
              <input
                {...register("Newpassword")}
                type={showPassword ? "text" : "password"}
                name="Newpassword"
                placeholder="رمز عبور جدید "
                className={` border w-full rounded-md h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
                  errors.Newpassword ? "border-red-500" : ""
                }`}
              />

              <img
                onClick={() => setShowPassword(!showPassword)}
                src={EyeIcon}
                alt="key"
                className="absolute w-4 left-4 top-4 cursor-pointer "
              />
            </div>
            {errors.Newpassword && (
              <span className="error text-red-600 iranyekan-very-light-white">
                {errors.Newpassword.message}
              </span>
            )}
          </div>

          <div className="pb-3">
            <div className="flex relative">
              <img
                src={KeyIcon}
                alt="key"
                className="absolute w-4 top-4 mr-2"
              />
              <input
                {...register("confirmNewPassword")}
                type={showRePassword ? "text" : "password"}
                name="confirmNewPassword"
                placeholder="تکرار رمز عبور جدید "
                className={` border w-full rounded-md h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
                  errors.confirmNewPassword ? "border-red-500" : ""
                }`}
              />
              <img
                onClick={() => setShowRePassword(!showRePassword)}
                src={EyeIcon}
                alt="key"
                className="absolute w-4 left-4 top-4 cursor-pointer "
              />
            </div>
            {errors.confirmNewPassword && (
              <span className="error text-red-600 iranyekan-very-light-white">
                {errors.confirmNewPassword.message}
              </span>
            )}
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              className=" vazir-very-light  shadow-lg  bg-primary text-white py-3 px-14 rounded-2xl max-md:px-10 max-md:py-3 "
              type="submit"
            >
              تایید
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
