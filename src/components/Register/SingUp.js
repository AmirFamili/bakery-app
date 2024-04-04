import React, { useContext, useState } from "react";
import EmailGrayIcon from "../../images/icons/email-gray.png";
import KeyIcon from "../../images/icons/key.png";
import EyeIcon from "../../images/icons/eye.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { GlobalContext } from "../../context/ContextWrapper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const navigate = useNavigate();
  const { logo } = useContext(GlobalContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .email("لطفا ایمیل معتبر وارد کنید."),
    password: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .min(8, "رمز عبور باید بیشتر از ۸ کاراکتر باشد."),
    confirmPassword: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .oneOf([Yup.ref("password")], "رمز عبور یکی نمی باشد."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, reset
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (values) => {
  
    await axios
      .post("/auth/register/", {
        email: values.email,
        password: values.password,
        confirm_password: values.confirmPassword,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success === true) {
          navigate("/login");
          reset();
        } else {
         
          if (response.data.error === "Email already exists") {
            setError("email", {
              type: "server",
              message: "شما قبلا با این ایمیل ثبت نام کردید.",
            });
          }
        }
      })
      .catch((err) => console.log(err));
  };


  


  return (
    <section className="bg-gray-main h-screen w-full flex justify-center items-center">
      <div className=" bg-white border w-2/5  rounded-2xl p-5 relative max-lg:w-4/5 pb-20">
        <div className="flex justify-center items-center p-2">
          <img src={logo} alt="بلو کیک" className="w-24 max-md:w-20" />
        </div>
        <h1 className="iranyekan-medium text-center mt-10">ثبت نام</h1>
        <h2 className="iranyekan-light text-center mt-3">
          سلام؛ لطفا موارد زیر را جهت ثبت نام تکمیل کنید.
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" mx-auto my-7 w-3/5  max-sm:text-sm max-md:w-4/5 "
        >
          <div className="pb-3">
            <div className="flex relative">
              <img
                src={EmailGrayIcon}
                alt="email"
                className="absolute w-4 top-4 mr-2"
              />
              <input
                {...register("email")}
                type="text"
                name="email"
                placeholder="ایمیل"
                className={` border w-full rounded-md h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.email && (
              <span className="error text-red-600 iranyekan-very-light-white">
                {errors.email.message}
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
                {...register("password")}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="رمز عبور"
                className={` border w-full rounded-md h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
                  errors.password ? "border-red-500" : ""
                }`}
              />

              <img
                onClick={() => setShowPassword(!showPassword)}
                src={EyeIcon}
                alt="key"
                className="absolute w-4 left-4 top-4 cursor-pointer "
              />
            </div>
            {errors.password && (
              <span className="error text-red-600 iranyekan-very-light-white">
                {errors.password.message}
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
                {...register("confirmPassword")}
                type={showRePassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="رمز عبور"
                className={` border w-full rounded-md h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              <img
                onClick={() => setShowRePassword(!showRePassword)}
                src={EyeIcon}
                alt="key"
                className="absolute w-4 left-4 top-4 cursor-pointer "
              />
            </div>
            {errors.confirmPassword && (
              <span className="error text-red-600 iranyekan-very-light-white">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="flex justify-center items-center mt-5 ">
            <button
              className=" vazir-very-light  shadow-lg  bg-primary text-white py-3 px-14 rounded-2xl max-md:px-10 max-md:py-3 "
              type="submit"
            >
              ثبت نام
            </button>
          </div>
        </form>

        <h3 className="iranyekan-little-light text-center mt-10">
          حساب کاربری دارید؟{" "}
          <Link to="/login" className="border-b border-gray-500 text-gray-600">
            وارد شوید.
          </Link>
        </h3>
      </div>
     
    </section>
  );
};
