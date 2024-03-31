import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import EmailGrayIcon from "../../images/icons/email-gray.png";
import KeyIcon from "../../images/icons/key.png";
import EyeIcon from "../../images/icons/eye.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const navigate = useNavigate();
  const [logo, setlogo] = useState();

  useEffect(() => {
    async function getData() {
      await axios
        .get("/settings/")
        .then((response) => setlogo(response.data[0].logo));
    }

    getData();
  }, []);

  const notify = () =>
    toast.error("شما قبلا با این ایمیل ثبت نام کردید.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

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
        <Formik
          initialValues={{
            email: "",
            password: "",
            rePassword: "",
          }}
          onSubmit={async (values) => {
            await axios
              .post("/auth/register/", {
                email: values.email,
                password: values.password,
                confirm_password: values.rePassword,
              })
              .then((response) => {
                if (response.data.status === 201) {
                  navigate("/login");
                } else {
                  notify();
                }
              })
              .catch((err) => console.log(err));
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
              errors.email = "لطفا ایمیل معتبر وارد کنید.";
            }

            if (values.password === "") {
              errors.password = "لطفا این قسمت را خالی نگذارید.";
            } else if (values.password.length < 8) {
              errors.password = "رمز عبور باید بیشتر از ۸ کاراکتر باشد.";
            }

            if (values.rePassword === "") {
              errors.rePassword = "لطفا این قسمت را خالی نگذارید.";
            } else if (values.password !== values.rePassword) {
              errors.rePassword = "رمز عبور یکی نمی باشد.";
            }

            return errors;
          }}
        >
          <Form
            className=" mx-auto my-7 w-3/5  max-sm:text-sm max-md:w-4/5 "
            // action="index.html"
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

            <div className="pb-3">
              <div className="flex relative">
                <img
                  src={KeyIcon}
                  alt="key"
                  className="absolute w-4 top-4 mr-2"
                />
                <Field
                  type={showRePassword ? "text" : "password"}
                  name="rePassword"
                  placeholder="رمز عبور"
                  className=" border w-full rounded-md h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light "
                />
                <img
                  onClick={() => setShowRePassword(!showRePassword)}
                  src={EyeIcon}
                  alt="key"
                  className="absolute w-4 left-4 top-4 cursor-pointer "
                />
              </div>
              <ErrorMessage name="rePassword">
                {(errorMsg) => (
                  <div className="error text-red-600 iranyekan-very-light-white ">
                    {errorMsg}
                  </div>
                )}
              </ErrorMessage>
            </div>
            <div className="flex justify-center items-center mt-5 ">
              <button
                className=" vazir-very-light  shadow-lg  bg-primary text-white py-3 px-14 rounded-2xl max-md:px-10 max-md:py-3 "
                type="submit"
              >
                ثبت نام
              </button>
            </div>
          </Form>
        </Formik>
        <h3 className="iranyekan-little-light text-center mt-10">
          حساب کاربری دارید؟{" "}
          <Link to="/login" className="border-b border-gray-500 text-gray-600">
            وارد شوید.
          </Link>
        </h3>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        bodyStyle={{ fontFamily: "iranyekan", fontSize: "12px" }}
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </section>
  );
};
