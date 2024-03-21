import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Logo from "../images/logo.png";
import EmailGrayIcon from "../images/icons/email-gray.png";
import ArrowRightIcon from "../images/icons/arrow-right.png";
import { Link } from "react-router-dom";

export const ChangePassword = () => {

    const handleNext = () => {
        window.location.href = "http://localhost:3000/login";
    }
  return (
    <section className="bg-gray-main h-screen w-full flex justify-center items-center">
      <div className=" bg-white border w-2/5 h-5/6 rounded-2xl p-5 relative">
        <Link to="/login">
          {" "}
          <img
            src={ArrowRightIcon}
            alt="Arrow Right"
            className="w-7 absolute top-7 right-7 "
          />
        </Link>
        <div className="flex justify-center items-center p-2">
          <img src={Logo} alt="بلو کیک" className="w-24 " />
        </div>
        <h1 className="iranyekan-medium text-center mt-10">بازیابی رمز عبور</h1>
        <h2 className="iranyekan-light text-center mt-3">
          ایمیل خود را جهت بازیابی رمزعبور وارد کنید.{" "}
        </h2>
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={(values) => {
            values.email="";
            handleNext();
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
            enctype="multipart/form-data"
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

            <div className="flex justify-center items-center mt-6">
              <button
                className=" vazir-very-light  shadow-lg  bg-primary text-white py-3 px-14 rounded-2xl  "
                type="submit"
              >
                تایید
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
};
