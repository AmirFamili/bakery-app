import React, { useState, useContext,useEffect} from "react";
import EmailGrayIcon from "../../images/icons/email-gray.png";
import KeyIcon from "../../images/icons/key.png";
import EyeIcon from "../../images/icons/eye.png";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { GlobalContext } from "../../context/ContextWrapper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export const Login = () => {

  const initialTime = 5 * 60;
  const [showPassword, setShowPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState();
  const [showVerify, setShowVerify] = useState(false);
  const [time, setTime] = useState(initialTime);
  const [timerActive, setTimerActive] = useState(false);
  const { setLoggedIn, logo ,navigate} = useContext(GlobalContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .email("لطفا ایمیل معتبر وارد کنید."),
    password: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .min(8, "رمز عبور باید بیشتر از ۸ کاراکتر باشد."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (values) => {
    setEmail(values.email);
    localStorage.setItem('email',values.email);
    await axios
      .post("/auth/login/", {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        if (response.data.status === 200) {
          localStorage.setItem(
            "access",
            JSON.stringify(response.data.message.data.access)
          );
          localStorage.setItem(
            "refresh",
            JSON.stringify(response.data.message.data.refresh)
          );
          setLoggedIn(true);
          navigate("/");
          reset();
          return;
        } else {
          console.log(response);
          if (response.data.error === "Email not found.") {
            setError("email", {
              type: "server",
              message: "شما با این ایمیل ثبت نام نکرده اید.",
            });
          }
          if (response.data.error === "Incorrect password") {
            setError("password", {
              type: "server",
              message: "رمز عبور صحیح نمی باشد.",
            });
          }
          if (response.data.error === 'Verify your account') {
            setShowVerify(true);
            // notify();
          }
        }
      })
      .catch((err) => console.log(err));
  };


  // const notify = () =>
  // toast.error("مشکلی در ورود داشتیم دوباره انجام دهید.", {
  //   position: "top-center",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "light",
  // });


  return (
    <section className="bg-gray-main h-screen w-full flex justify-center items-center">
      <div className=" bg-white border w-2/5  rounded-2xl p-5 relative max-md:w-4/5 pb-20">
        <div className="flex justify-center items-center p-2">
          <img src={logo} alt="بلو کیک" className="w-24 max-md:w-20 " />
        </div>
        <h1 className="iranyekan-medium text-center mt-10">ورود</h1>
        <h2 className="iranyekan-light text-center mt-3">
          سلام؛ لطفا موارد زیر را جهت ورود به حساب کاربری تکمیل کنید.
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
              className=" vazir-very-light  shadow-lg  bg-primary text-white py-3 px-14 rounded-2xl max-md:px-10 max-md:py-3 "
              type="submit"
            >
              ورود
            </button>
          </div>
        </form>

        <h3 className="iranyekan-little-light text-center mt-10">
          حساب کاربری ندارید؟{" "}
          <Link to="/singup" className="border-b border-gray-500 text-gray-600">
            ایجاد کنید.
          </Link>
        </h3>
      </div>

      <div
        className={`fixed top-0 right-0 w-screen h-screen  justify-center items-center z-50 border text-black ${
          showVerify ? "flex" : "hidden"
        }`}
      >
        <div className="bg-white rounded-lg p-10 border w-2/6 text-center shadow-xl ">
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

      {/* <ToastContainer
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
      /> */}
    </section>
  );
};
