import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import EmailGrayIcon from "../../images/icons/email-gray.png";
import ArrowRightIcon from "../../images/icons/arrow-right.png";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { GlobalContext } from "../../context/ContextWrapper";

export const ChangePassword = () => {
  const { logo } = useContext(GlobalContext);

  return (
    <section className="bg-gray-main h-screen w-full flex justify-center items-center">
      <div className=" bg-white border w-2/5 rounded-2xl p-5 relative max-md:w-4/5 pb-20">
        <Link to="/login">
          <img
            src={ArrowRightIcon}
            alt="Arrow Right"
            className="w-7 absolute top-7 right-7 max-md:w-5"
          />
        </Link>
        <div className="flex justify-center items-center p-2">
          <img src={logo} alt="بلو کیک" className="w-24 max-md:w-20" />
        </div>
        <h1 className="iranyekan-medium text-center mt-10">بازیابی رمز عبور</h1>
        <h2 className="iranyekan-light text-center mt-3">
          ایمیل خود را جهت بازیابی رمزعبور وارد کنید.
        </h2>
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={async (values) => {
         
            await axios.post("/auth/verify_email/",{
              email:values.email
            }).then(response=>console.log(response));
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
              errors.email =  "لطفا ایمیل معتبر وارد کنید.";
            }

           

            return errors;
          }}
        >
          <Form
            className=" mx-auto my-7 w-3/5  max-sm:text-sm max-md:w-4/5"
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

            <div className="flex justify-center items-center mt-6">
              <button
                className=" vazir-very-light  shadow-lg  bg-primary text-white py-3 px-14 rounded-2xl max-md:px-10 max-md:py-3 "
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
