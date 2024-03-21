import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Logo from "../images/logo.png";
import EmailGrayIcon from "../images/icons/email-gray.png";
import KeyIcon from "../images/icons/key.png";
import EyeIcon from "../images/icons/eye.png";
import { Link } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleNext = () => {
    window.location.href = "http://localhost:3000/home";
  };
  return (
    <section className="bg-gray-main h-screen w-full flex justify-center items-center">
      <div className=" bg-white border w-2/5  rounded-2xl p-5 pb-28">
        <div className="flex justify-center items-center p-2">
          <img src={Logo} alt="بلو کیک" className="w-24 " />
        </div>
        <h1 className="iranyekan-medium text-center mt-10">ورود</h1>
        <h2 className="iranyekan-light text-center mt-3">
          سلام؛ لطفا موارد زیر را جهت ورود به حساب کاربری تکمیل کنید.
        </h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            axios
              .post("http://onlinelbakery.pythonanywhere.com/auth/login/", {
                email: values.email,
                password: values.password,
              })
              .then((response) => {
                handleNext();
              })
              .catch((err) => console.log(err));
            values.email = "";
            values.password = "";
          }}
          validate={(values) => {
            const errors = {};

            if (values.email === "") {
              errors.email = "لطفا این قسمت را خالی نگذارید.";
            } else if (
              !values.email.match(
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
              )
            ) {
              errors.email = "  ایمیل نادرست است.";
            }

            if (values.password === "") {
              errors.password = "لطفا این قسمت را خالی نگذارید.";
            }

            return errors;
          }}
        >
          <Form
            className=" mx-auto my-7 w-3/5  max-sm:text-sm"
            action="index.html"
            // enctype="multipart/form-data"
          >
            <div className="pb-3">
              <div className="flex relative">
                <img
                  src={EmailGrayIcon}
                  alt="email"
                  className="absolute w-4 top-4 mr-2"
                />
                <Field
                  type="text"
                  name="email"
                  placeholder="ایمیل"
                  className=" border w-full rounded-md h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light "
                />
              </div>
              <ErrorMessage name="email">
                {(errorMsg) => (
                  <div className="error text-red-600 iranyekan-very-light-white">
                    {errorMsg}
                  </div>
                )}
              </ErrorMessage>
            </div>

            <div className="pb-3">
              <div className="flex relative">
                <img
                  src={KeyIcon}
                  alt="key"
                  className="absolute w-4 top-4 mr-2"
                />
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="رمز عبور"
                  className=" border w-full rounded-md h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light "
                />
                <img
                  onClick={() => setShowPassword(!showPassword)}
                  src={EyeIcon}
                  alt="key"
                  className="absolute w-4 left-4 top-4 cursor-pointer "
                />
              </div>
              <ErrorMessage name="password">
                {(errorMsg) => (
                  <div className="error text-red-600 iranyekan-very-light-white">
                    {errorMsg}
                  </div>
                )}
              </ErrorMessage>
            </div>
            <h4 className=" text-center">
              <Link
                to="/change-password"
                className="iranyekan-very-light-white  text-gray-700 "
              >
                رمز عبور خود را فراموش کرده اید؟
              </Link>
            </h4>

            <div className="flex justify-center items-center mt-10">
              <button
                className=" vazir-very-light  shadow-lg  bg-primary text-white py-3 px-14 rounded-2xl  "
                type="submit"
              >
                ورود
              </button>
            </div>
          </Form>
        </Formik>
        <h3 className="iranyekan-little-light text-center mt-10">
          حساب کاربری ندارید؟{" "}
          <Link to="/singup" className="border-b border-gray-500 text-gray-600">
            ایجاد کنید.
          </Link>
        </h3>
      </div>
    </section>
  );
};
