import React, { useContext, useEffect } from "react";
import EmailGrayIcon from "../../images/icons/email-gray.png";
import ArrowRightIcon from "../../images/icons/arrow-right.png";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { GlobalContext } from "../../context/ContextWrapper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ChangePassword = () => {
  const { logo, navigate,loggedIn} = useContext(GlobalContext);


  useEffect(()=>{
    if(loggedIn){
      navigate('/');
    }
  },[])


  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .email("لطفا ایمیل معتبر وارد کنید."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (values) => {
    await axios
      .post("/auth/password_reset/", {
        email: values.email,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          showSuccessMessage();
        } else {
          if (response.data.message === "Email not found. Please register first.") {
            setError("email", {
              type: "server",
              message: "شما با این ایمیل ثبت نام نکرده اید.",
            });
          }
        }
      });
  };


    const showSuccessMessage = () => {
      toast.success("لطفا ایمیل خود را چک کنید.");
    };
  

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

          <div className="flex justify-center items-center mt-6">
            <button
              className=" vazir-very-light  shadow-lg  bg-primary text-white py-3 px-14 rounded-2xl max-md:px-10 max-md:py-3 "
              // type="submit"
            >
              تایید
            </button>
          </div>
        </form>
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
           />
      </div>
    </section>
  );
};
