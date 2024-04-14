import React , { useContext }from 'react';
import axios from "../../api/axios";
import { GlobalContext } from "../../context/ContextWrapper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";


export const Profile = () => {
  const { accessToken} =
  useContext(GlobalContext);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .min(3, "نام خود را کامل وارد کنید."),
    lastName: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .min(3, "نام خانوادگی خود را کامل وارد کنید."),
    phone: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .matches(
        /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/,
        "شماره تلفن نامعتبر می باشد."
      ),
    postalCode: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .matches(/^\d{5}-\d{5}$/, "کد پستی نامعتبر می باشد.(مثال 12345-67891)"),
    address: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .matches(/[,.-_]?[ء-ی0-9]+[,.-_]?/, "آدرس درست نمی باشد."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (values) => {
   
    // await axios
    //   .post(
    //     "/order/order/",
    //     { cart_id: cart },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${accessToken}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     reset();
    //   })
    //   .catch((err) => console.log(err));
    //   localStorage.removeItem('cart');
    //   setCart(null);
     
  };


  return (
    <section className="  mt-2 px-10 py-28 max-md:px-5 max-lg:mt-0 h-full min-h-screen max-lg:pt-5 ">
      <h1 className="py-5 iranyekan-very-bold ">حساب کاربری  </h1>
      <h2 className="iranyekan-little-light text-gray-400">شما میتوانید اطلاعات حساب کاربری خود را ویرایش کنید.</h2>
      
      <form
            onSubmit={handleSubmit(onSubmit)}
            className="  my-7 w-2/6  max-sm:text-sm max-lg:w-4/5 max-md:mr-5 "
          >
            <div className="pb-3">
              <div className="flex relative">
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  placeholder="نام"
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.name && (
                <span className="error text-red-600 iranyekan-very-light-white">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="pb-3">
              <div className="flex relative">
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

            <div className="pb-3">
              <div className="flex relative">
                <input
                  {...register("phone")}
                  type="phone"
                  name="phone"
                  placeholder="شماره تماس"
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.phone && (
                <span className="error text-red-600 iranyekan-very-light-white">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className="pb-3">
              <div className="flex relative">
                <input
                  {...register("postalCode")}
                  type="text"
                  name="postalCode"
                  placeholder="کدپستی"
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
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

            <div className="">
              <div className="flex relative">
                <textarea
                  {...register("address")}
                  type="number"
                  name="address"
                  placeholder="آدرس"
                  className={` border w-full rounded-md h-20 mt-1  py-2 px-8 outline-none iranyekan-very-light ${
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
          </form>
          <button
            onClick={handleSubmit(onSubmit)}
            className=" text-center w-40 my-6 bg-primary text-font-white  rounded-xl shadow-xl py-3  vazir-regular max-xl:w-28 max-lg:w-32 "
          >
            ذخیره تغییرات
          </button>
      </section>
  )
}
