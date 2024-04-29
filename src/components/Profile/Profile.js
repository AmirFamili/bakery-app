import React, { useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
import { GlobalContext } from "../../context/ContextWrapper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ProfileIcon from "../../images/icons/profile-xl.png";
import SuccessIcon from "../../images/icons/success.png";

import * as Yup from "yup";

export const Profile = () => {
  const {
    accessToken,
    convertNumberToFarsi,
    profile,
    setImageProfile,
    loggedIn,
    navigate,
  } = useContext(GlobalContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageShow, setSelectedImageShow] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showPopUP, setShowPopUP] = useState(false);
  const [textPopUP, setTextPopUP] = useState(null);

  const goBackBox = () => {
    setTimeout(() => {
      setShowPopUP(false);
    }, 3500);
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      const abortController = new AbortController();
      const signal = abortController.signal;

      async function getProfile() {
        await axios
          .get(
            "/profile/phone_number/",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            },
            { signal }
          )
          .then((response) => {
            setValuePhoneNumber("phone", response.data.phone_number);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        return () => {
          abortController.abort();
        };
      }

      getProfile();
    }
  }, [accessToken]);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      setValue("firstName", profile.first_name);
      setValue("lastName", profile.last_name);
      setValue("postalCode", profile.post_code);
      setValue("address", profile.address);
    }
  }, [profile, refresh]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .min(3, "نام خود را کامل وارد کنید."),
    lastName: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .min(3, "نام خانوادگی خود را کامل وارد کنید."),
    postalCode: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .min(10, "کد پستی نامعتبر می باشد.")
      .matches(/^[0-9]+$/, "کد پستی نامعتبر می باشد."),
    address: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .matches(/[,.-_]?[ء-ی0-9]+[,.-_]?/, "آدرس درست نمی باشد."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const validationPhoneNumber= Yup.object().shape({
    phone: Yup.string()
    .required("لطفا این قسمت را خالی نگذارید.")
    .matches(
      /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/,
      "شماره تلفن نامعتبر می باشد."
    ),
  })

  const {
    register:registerPhonenUmber,
    handleSubmit: handleSubmitPhoneNumber,
    formState: {errors : errorsPhoneNumber },
    setValue: setValuePhoneNumber,
  } = useForm({ resolver: yupResolver(validationPhoneNumber) });

  const handleImageChange = async (event) => {
    setSelectedImageShow(URL.createObjectURL(event.target.files[0]));
    setSelectedImage(event.target.files[0]);
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    if (selectedImage) {
      formData.append("avatar", selectedImage);
    }
    formData.append("address", values.address);
    formData.append("post_code", values.postalCode);
    formData.append("first_name", values.firstName);
    formData.append("last_name", values.lastName);

    await axios
      .patch("/profile/me/", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setShowPopUP(true);
        setImageProfile(response.data.avatar);
        setTextPopUP("حساب کاربری به روز شد.");
      })
      .catch((err) => {
        setTextPopUP("مشکلی در بروز شدن وجود داشت.");
        setShowPopUP(true);
        console.log(err);
      });
  };
  const onSubmitPhoneNumber=async(value)=>{
    console.log(value.phone);
    await axios
    .patch("/profile/phone_number/", {
      phone_number:value.phone
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      setShowPopUP(true);
      setImageProfile(response.data.avatar);
      setTextPopUP("شماره تماس به روز شد.");
    })
    .catch((err) => {
      setTextPopUP("مشکلی در بروز شدن شماره تماس وجود داشت.");
      setShowPopUP(true);
      console.log(err);
    });
  }

  return (
    <section className=" overflow-hidden relative mt-2 px-10 py-28 max-md:px-5  h-full min-h-screen max-lg:pt-5 max-lg:mt-20">
      <h1 className="py-5 iranyekan-very-bold ">حساب کاربری </h1>
      <h2 className="iranyekan-little-light text-gray-400">
        شما میتوانید اطلاعات حساب کاربری خود را ویرایش کنید.
      </h2>
      <div className="flex justify-center items-center ">
        <div className="w-4/6 mt-8 max-lg:w-5/6 max-md:w-full max-md:mt-5">
          <div className="flex ">
            <div className=" rounded-full w-32 h-32 relative bg-gray-100 max-xl:w-28 max-lg:w-24  max-md:w-24 max-md:h-24 max-md:mt-2">
              <img
                src={
                  selectedImageShow
                    ? selectedImageShow
                    : profile && profile.avatar === null
                    ? ProfileIcon
                    : profile && profile.avatar
                }
                alt="حساب کاربری"
                className="w-full h-full m-auto rounded-full "
              />
              <div className="absolute p-1 left-0 bottom-0 bg-gray-main rounded-full">
                <div className="bg-gray-100 rounded-full">
                  <label className=" cursor-pointer">
                    <input
                      className="hidden"
                      name="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-7 h-7 text-gray-400 max-md:w-4  max-md:h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </label>
                </div>
              </div>
            </div>
            <div className="pt-10 pr-10 max-xl:pr-5  max-xl:pt-5">
              <h3 className="iranyekan ">
                {firstName} {lastName}{" "}
              </h3>
              <div className="flex mt-5 max-md:block max-md:mt-3">
                <h4 className="iranyekan-very-light ml-5 max-xl:ml-3 max-md:ml-0 max-md:my-2">
                  کل سفارشات ثبت شده: <span>{convertNumberToFarsi(12)}</span>{" "}
                </h4>
                <h4 className="iranyekan-very-light mx-5 max-xl:mx-3 max-md:mx-0 max-md:my-2">
                  سفارشات تحویل گرفته: <span>{convertNumberToFarsi(11)}</span>{" "}
                </h4>
                <h4 className="iranyekan-very-light mx-5 max-xl:mx-3 max-md:mx-0 max-md:my-2">
                  سفارشات درحال آماده سازی:{" "}
                  <span>{convertNumberToFarsi(1)}</span>{" "}
                </h4>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center ">
            <div className="w-10/12 max-md:w-full ">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className=" w-full my-7  max-sm:text-sm  max-md:mr-0 "
              >
                <div className="flex w-full max-md:block">
                  <div className="pb-3 w-1/2 ml-1.5 max-md:w-full  max-md:ml-0">
                    <div className="flex relative">
                      <input
                        {...register("firstName")}
                        type="text"
                        name="firstName"
                        placeholder="نام"
                        className={` border w-full rounded-xl h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
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

                  <div className="pb-3 w-1/2 mr-1.5 max-md:w-full  max-md:mr-0">
                    <div className="flex relative">
                      <input
                        {...register("lastName")}
                        type="text"
                        name="lastName"
                        placeholder="نام خانوادگی"
                        className={` border w-full rounded-xl h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
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
                <div className="flex w-full max-md:block">

                  <form  onSubmit={handleSubmitPhoneNumber(onSubmitPhoneNumber)} className="flex justify-between  w-1/2 ">

                    <div className="pb-3 w-2/3 ml-1.5 max-md:w-full  max-md:ml-0">
                      <div className="flex relative">
                        <input
                          {...registerPhonenUmber("phone")}
                          type="phone"
                          name="phone"
                          placeholder="شماره تماس"
                          className={` border w-full rounded-xl h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
                            errorsPhoneNumber.phone ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {errorsPhoneNumber.phone && (
                        <span className="error text-red-600 iranyekan-very-light-white">
                          {errorsPhoneNumber.phone.message}
                        </span>
                      )}
                    </div>

                    <button onClick={handleSubmitPhoneNumber(onSubmitPhoneNumber)} className="w-1/3 border rounded-xl h-10 mt-1">change</button>
                  </form>

                  <div className="pb-3 w-1/2 mr-1.5 max-md:w-full max-md:mr-0">
                    <div className="flex relative">
                      <input
                        {...register("postalCode")}
                        type="text"
                        name="postalCode"
                        placeholder="کدپستی"
                        className={` border w-full rounded-xl h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
                          errors.postalCode ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.postalCode && (
                      <span className="error text-red-600 iranyekan-very-light-white">
                        {errors.postalCode.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="">
                  <div className="flex relative max-md:block">
                    <textarea
                      {...register("address")}
                      type="text"
                      name="address"
                      placeholder="آدرس"
                      className={` border w-full rounded-xl h-32 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
                        errors.address ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.address && (
                    <span className="error text-red-600 iranyekan-very-light-white">
                      {errors.address.message}
                    </span>
                  )}
                </div>
                <div className="flex justify-center  items-center">
                  <button
                    onClick={() => setRefresh(!refresh)}
                    className=" w-40 text-center  m-6  bg-blue-very-light  rounded-xl shadow-xl py-3  vazir-regular max-xl:w-28  max-md:py-2 "
                  >
                    انصراف
                  </button>

                  <button
                    onClick={handleSubmit(onSubmit)}
                    className=" text-center w-40 m-6  bg-primary text-font-white  rounded-xl shadow-xl py-3  vazir-regular max-xl:w-28  max-md:py-2"
                  >
                    ذخیره تغییرات
                  </button>
                </div>
              </form>
              <div
                className={`absolute top-96  transition  flex justify-center items-center py-4 px-10 bg-white rounded-2xl shadow-lg border iranyekan ${
                  showPopUP
                    ? "-translate-x-48  delay-75 "
                    : " translate-x-full -right-full"
                } ${goBackBox()}`}
              >
                <img src={SuccessIcon} alt="success" className="w-11 ml-2" />
                {textPopUP}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
