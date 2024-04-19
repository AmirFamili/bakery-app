import React, { useContext, useEffect, useState } from "react";
import EmailGrayIcon from "../../images/icons/email-gray.png";
import KeyIcon from "../../images/icons/key.png";
import EyeIcon from "../../images/icons/eye.png";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { GlobalContext } from "../../context/ContextWrapper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const SignUp = () => {
  const initialTime = 5 * 60;

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [email, setEmail] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showVerify, setShowVerify] = useState(false);
  const [time, setTime] = useState(initialTime);
  const [timerActive, setTimerActive] = useState(false);

  const { logo } = useContext(GlobalContext);

  useEffect(() => {
    let interval;

    if (timerActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(interval);
            setTimerActive(false);
            setButtonDisabled(false);

            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setEmail(email);
    }
  }, []);

  const handlerVerify = async () => {
    await axios
      .post("/auth/verify_email/", {
        email: email,
      })
      .then((response) => {});
    setTime(initialTime);
    setTimerActive(true);
    setButtonDisabled(true);
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .max(20, "تعداد کاراکتر بشتر از حد مجاز است."),
    lastName: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .max(20, "تعداد کاراکتر بشتر از حد مجاز است."),
    phoneNumber: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .matches(
        /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/,
        "شماره تلفن نامعتبر می باشد."
      )
      .max(11, "شماره تلفن نامعتبر می باشد."),
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
    setError,
    reset,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (values) => {
    await axios
      .post("/auth/register/", {
        first_name: values.firstName,
        last_name: values.lastName,
        phone_number: values.phoneNumber,
        email: values.email,
        password: values.password,
        confirm_password: values.confirmPassword,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success === true) {
          localStorage.setItem("email", response.data.message.email);
          setEmail(response.data.message.email);
          setShowVerify(true);
          setTimerActive(true);

          reset();
        } else {
          if (response.data.error === "Email already exists") {
            setError("email", {
              type: "server",
              message: "شما قبلا با این ایمیل ثبت نام کردید.",
            });
          } else if (response.data.error === 'user with this phone number already exists') {
            setError("phoneNumber", {
              type: "server",
              message: "شما قبلا با این تلفن ثبت نام کردید.",
            });
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="bg-gray-main py-10 w-full flex justify-center items-center">
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
          className=" mx-auto my-7 w-4/6  max-sm:text-sm max-md:w-5/6 "
        >
          <div className="flex ">
            <div className="pb-3 ml-3 w-1/2">
              <div className="flex relative">
                <img
                  src={EmailGrayIcon}
                  alt="firstName"
                  className="absolute w-4 top-4 mr-2"
                />
                <input
                  {...register("firstName")}
                  type="text"
                  name="firstName"
                  placeholder="نام"
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.firstName && (
                <span className="error text-red-600 iranyekan-very-light-white">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div className="pb-3 w-1/2">
              <div className="flex relative">
                <img
                  src={EmailGrayIcon}
                  alt="last name"
                  className="absolute w-4 top-4 mr-2"
                />
                <input
                  {...register("lastName")}
                  type="text"
                  name="lastName"
                  placeholder="نام خانوادگی"
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
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

          <div className="pb-3">
            <div className="flex relative">
              <img
                src={EmailGrayIcon}
                alt="phone"
                className="absolute w-4 top-4 mr-2"
              />
              <input
                {...register("phoneNumber")}
                type="phone"
                name="phoneNumber"
                placeholder="شماره موبایل"
                className={` border w-full rounded-md h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
                  errors.phoneNumber ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.phoneNumber && (
              <span className="error text-red-600 iranyekan-very-light-white">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>

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
                placeholder="تکرار رمز عبور"
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

      <div
        className={`fixed top-0 right-0 w-screen h-screen  justify-center items-center z-50 border text-black ${
          showVerify ? "flex" : "hidden"
        }`}
      >
        <div className="bg-white rounded-lg p-10 border w-2/6 text-center shadow-xl max-md:w-4/6">
          <h3 className="iranyekan-little-light ">
            لطفا لینک ارسال شده به ایمیل <span>{email}</span> را تایید نمایید.
          </h3>

          <button
            disabled={buttonDisabled}
            onClick={handlerVerify}
            className={` mt-6 vazir-very-light  shadow-lg  bg-primary text-white py-2 px-10 rounded-2xl max-md:px-10 max-md:py-3 ${
              buttonDisabled ? "bg-gray-500" : "bg-primary"
            }`}
            type="button"
          >
            {formatTime(time)}
          </button>
        </div>
      </div>
    </section>
  );
};
