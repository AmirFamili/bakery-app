import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/ContextWrapper";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import EditIcon from "../../images/icons/edit.png";
import AddIcon from "../../images/icons/add-black.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "../../api/axios";



export const InfoSend = () => {
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addresses, setAddresses] = useState(null);
  const [chooseAddress, setChooseAddress] = useState(null);
  const [chooseAddressId, setChooseAddressId] = useState(null);
  

  const {
    convertNumberToFarsi,
    totalPrice,
    totalDiscount,
    accessToken,
    cart,
    setCart,
    deliveryPrice,
    totalPayment,
    setCountAll,
    navigate
  } = useContext(GlobalContext);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
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
      .matches(/^\d{10}$/, "کد پستی نامعتبر می باشد."),
    address: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .matches(/[,.-_]?[ء-ی0-9]+[,.-_]?/, "آدرس درست نمی باشد."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const validationEdit = Yup.object().shape({
    firstName: Yup.string()
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
      .matches(/^\d{10}$/, "کد پستی نامعتبر می باشد."),
    address: Yup.string()
      .required("لطفا این قسمت را خالی نگذارید.")
      .matches(/[,.-_]?[ء-ی0-9]+[,.-_]?/, "آدرس درست نمی باشد."),
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
    setValue: setValueEdit,
  } = useForm({ resolver: yupResolver(validationEdit) });

  useEffect(() => {
    if (accessToken) {
      const abortController = new AbortController();
      const signal = abortController.signal;

      async function getProfile() {
        await axios
          .get(
            "/order/address/",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            },
            { signal }
          )
          .then((response) => {
            setAddresses(response.data);
      
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
  }, [accessToken, chooseAddress]);

  const onSubmit = async (values) => {
    await axios
      .post(
        "/order/address/",
        {
          first_name: values.firstName,
          last_name: values.lastName,
          phone_number: values.phone,
          post_code: values.postalCode,
          address: values.address,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setValueEdit("phone", response.data.phone_number);
        setValueEdit("firstName", response.data.first_name);
        setValueEdit("lastName", response.data.last_name);
        setValueEdit("postalCode", response.data.post_code);
        setValueEdit("address", response.data.address);
        setChooseAddress(response.data);
        setChooseAddressId(response.data.id)
        setAdd(false);
        reset();
      })
      .catch((err) => console.log(err));

  };

  const onSubmitEdit = async (values) => {
    await axios
      .put(
        `/order/address/${cart}/`,
        {
          first_name: values.firstName,
          last_name: values.lastName,
          phone_number: values.phone,
          post_code: values.postalCode,
          address: values.address,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };


  const handlerChangeAddress=(event)=>{
    setChooseAddressId(event.target.value)
    console.log(event.target.value);
   for (let i = 0; i< addresses.length; i++) {
   if (addresses[i].id===Number(event.target.value)) {
    setChooseAddress(addresses[i])
    setChooseAddressId(addresses[i].id)
   }
    
   }
  }


  const handlerPayment=async()=>{


    await axios
      .patch(
        `/order/cart/${cart}/address/`,
        { address: chooseAddressId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(async(response) => {
        await axios
          .post(
            "/order/order/",
            { cart_id: cart },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            setCountAll(0)
            localStorage.removeItem("cart");
            setCart(null);
            navigate('cart/payment')
           
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

  }

  return (
    <div className=" mt-5 p-1 pb-0 flex justify-center  border  rounded-2xl bg-white max-lg:block ">
      <div className="w-2/3  border-l max-lg:border-0 max-lg:w-full">
        <div className="flex  pb-10 max-lg:block">
          <div
            className=" mr-10 my-7 w-3/6  max-sm:text-sm max-lg:w-4/5 max-lg:mx-auto "
          >
            <div className="pb-3">
              <div className="flex relative">
                <select
                onChange={handlerChangeAddress}
                  name="address"
                  className="border w-full mb-4 rounded-md h-10 mt-1  py-2 px-5 outline-none iranyekan-very-light max-md:px-4"
                >
                  <option value="انتخاب آدرس">انتخاب آدرس</option>
                  {addresses &&
                    addresses.map((address) => (
                      <option key={address.id} value={address && address.id}>
                        {address && address.address}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div
              onClick={() => setEdit(true)}
              className="flex  items-center pb-3 cursor-pointer"
            >
              <img src={EditIcon} alt="edit" className="w-4 h-4 " />
              <h5 className="iranyekan-very-light-white pr-2 text-gray-600">
                ویرایش آدرس
              </h5>
            </div>

            <div className="pb-3">
              <div className="flex relative">
                <input
                  disabled
                  type="text"
                  name="firstName"
                  placeholder={chooseAddress ? chooseAddress.first_name : "نام"}
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-6 outline-none iranyekan-very-light max-md:px-4`}
                />
              </div>
            </div>

            <div className="pb-3">
              <div className="flex relative">
                <input
                  disabled
                  type="text"
                  name="lastName"
                  placeholder={
                    chooseAddress ? chooseAddress.last_name : "نام خانوادگی"
                  }
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-6 outline-none iranyekan-very-light max-md:px-4`}
                />
              </div>
            </div>

            <div className="pb-3">
              <div className="flex relative">
                <input
                  disabled
                  type="phone"
                  name="phone"
                  placeholder={
                    chooseAddress ? chooseAddress.phone_number : "شماره تماس"
                  }
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-6 outline-none iranyekan-very-light max-md:px-4`}
                />
              </div>
            </div>

            <div className="pb-3">
              <div className="flex relative">
                <input
                  disabled
                  type="text"
                  name="postalCode"
                  placeholder={
                    chooseAddress ? chooseAddress.post_code : "کدپستی"
                  }
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-6 outline-none iranyekan-very-light max-md:px-4 `}
                />
              </div>
            </div>

            <div className="">
              <div className="flex relative">
                <textarea
                  disabled
                  placeholder={chooseAddress ? chooseAddress.address : "آدرس"}
                  type="text"
                  name="address"
                  className={` border w-full rounded-md h-20 mt-1  py-2 px-6 outline-none iranyekan-very-light max-md:px-4`}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end items-top mt-8 mr-3 w-3/6  ">
            <button
              onClick={() => setAdd(true)}
              className="border flex items-center rounded-xl vazir-very-little   ml-3 px-4 py-2 h-10 text-gray-600 max-lg:h-auto  max-lg:px-2"
            >
              <img src={AddIcon} alt="add" className="w-5 ml-2 max-lg:w-4" />{" "}
              افزودن آدرس جدید{" "}
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/3 p-5 relative max-lg:w-full  ">
        <div className="mt-3">
          <div className="flex justify-between items-center text-gray-600">
            <h3 className="iranyekan-little-light"> مجموع تخفیف:</h3>
            <h3 className="iranyekan-little-light">
              {convertNumberToFarsi(totalDiscount)} تومان
            </h3>
          </div>

          <div className="flex justify-between items-center mt-7 text-gray-600">
            <h3 className="iranyekan-little-light "> هزینه ارسال:</h3>
            <h3 className="iranyekan-little-light">
              {deliveryPrice === 0
                ? "رایگان"
                : convertNumberToFarsi(deliveryPrice) + " تومان"}
            </h3>
          </div>

          <div className="flex justify-between items-center mt-7 text-gray-600">
            <h3 className="iranyekan-little-light ">مجموع سبد خرید:</h3>
            <h3 className="iranyekan-little-light">
              {convertNumberToFarsi(totalPrice)} تومان
            </h3>
          </div>
          <div className="border-t my-7"></div>

          <div className="flex justify-between items-center mt-7 iranyekan">
            <h3> قابل پرداخت:</h3>
            <h3>{convertNumberToFarsi(totalPayment)} تومان</h3>
          </div>
        </div>

        <div className="absolute inset-0 flex justify-center items-end max-lg:static max-lg:mt-5 max-lg:justify-center">
          <Link to={"/cart"}>
            {" "}
            <button className=" w-40 text-center  my-6 ml-3 bg-blue-very-light  rounded-xl shadow-xl py-3  vazir-regular max-xl:w-28 max-lg:w-32 ">
              مرحله قبل
            </button>
          </Link>

          <button
            onClick={handlerPayment}
            className=" text-center w-40 my-6 bg-primary text-font-white  rounded-xl shadow-xl py-3  vazir-regular max-xl:w-28 max-lg:w-32 "
          >
            پرداخت
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 w-screen h-screen justify-center items-center z-50 border text-black ${
          add ? "flex" : "hidden"
        }`}
      >
        <div className="bg-white rounded-lg  border w-2/6 max-lg:w-3/6 max-md:w-5/6">
          <h3 className="iranyekan-bold  text-center py-3 border-b">
            افزودن آدرس جدید
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="mx-10 mt-5"
          >
            <div className="pb-3">
              <div className="flex relative">
                <input
                  {...register("firstName")}
                  type="text"
                  name="firstName"
                  placeholder="نام"
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-6 outline-none iranyekan-very-light max-md:px-4 ${
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

            <div className="pb-3">
              <div className="flex relative">
                <input
                  {...register("lastName")}
                  type="text"
                  name="lastName"
                  placeholder="نام خانوادگی"
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-6 outline-none iranyekan-very-light max-md:px-4 ${
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
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-6 outline-none iranyekan-very-light max-md:px-4 ${
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
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-6 outline-none iranyekan-very-light max-md:px-4 ${
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
                  type="text"
                  name="address"
                  placeholder="آدرس"
                  className={` border w-full rounded-md h-20 mt-1  py-2 px-6 outline-none iranyekan-very-light max-md:px-4 ${
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
            <div className="text-center mt-5">
              <button
                onClick={() => setAdd(false)}
                className="  text-center   bg-blue-very-light  rounded-xl shadow-xl py-2 px-10  max-md:px-7 ml-3 vazir-regular max-xl:w-28  max-md:w-auto "
              >
                انصراف
              </button>
              <button className="my-4  bg-primary text-font-white rounded-xl shadow-lg py-2 px-11 vazir-regular max-md:w-auto max-md:px-8">
                تایید
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0  w-screen h-screen  justify-center items-center z-50 border text-black ${
          edit ? "flex" : "hidden"
        }`}
      >
        <div className="bg-white rounded-lg  border w-2/6 max-lg:w-3/6 max-md:w-5/6">
          <h3 className="iranyekan-bold  text-center py-3 border-b">
            ویرایش آدرس
          </h3>
          <form
            onSubmit={handleSubmitEdit(onSubmitEdit)}
            action=""
            className="mx-10 mt-5"
          >
            <div className="pb-3">
              <div className="flex relative">
                <input
                  {...registerEdit("firstName")}
                  type="text"
                  name="firstName"
                  placeholder="نام"
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-6 outline-none iranyekan-very-light max-md:px-4 ${
                    errorsEdit.firstName ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errorsEdit.firstName && (
                <span className="error text-red-600 iranyekan-very-light-white">
                  {errorsEdit.firstName.message}
                </span>
              )}
            </div>

            <div className="pb-3">
              <div className="flex relative">
                <input
                  {...registerEdit("lastName")}
                  type="text"
                  name="lastName"
                  placeholder="نام خانوادگی"
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-6 outline-none iranyekan-very-light max-md:px-4 ${
                    errorsEdit.lastName ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errorsEdit.lastName && (
                <span className="error text-red-600 iranyekan-very-light-white">
                  {errorsEdit.lastName.message}
                </span>
              )}
            </div>

            <div className="pb-3">
              <div className="flex relative">
                <input
                  {...registerEdit("phone")}
                  type="phone"
                  name="phone"
                  placeholder="شماره تماس"
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-6 outline-none iranyekan-very-light max-md:px-4 ${
                    errorsEdit.phone ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errorsEdit.phone && (
                <span className="error text-red-600 iranyekan-very-light-white">
                  {errorsEdit.phone.message}
                </span>
              )}
            </div>
            <div className="pb-3">
              <div className="flex relative">
                <input
                  {...registerEdit("postalCode")}
                  type="text"
                  name="postalCode"
                  placeholder="کدپستی"
                  className={` border w-full rounded-md h-10 mt-1  py-2 px-6 outline-none iranyekan-very-light max-md:px-4 ${
                    errorsEdit.postalCode ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errorsEdit.postalCode && (
                <span className="error text-red-600 iranyekan-very-light-white">
                  {errorsEdit.postalCode.message}
                </span>
              )}
            </div>
            <div className="">
              <div className="flex relative">
                <textarea
                  {...registerEdit("address")}
                  type="text"
                  name="address"
                  placeholder="آدرس"
                  className={` border w-full rounded-md h-20 mt-1  py-2 px-6 outline-none iranyekan-very-light max-md:px-4 ${
                    errorsEdit.address ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errorsEdit.address && (
                <span className="error text-red-600 iranyekan-very-light-white">
                  {errorsEdit.address.message}
                </span>
              )}
            </div>
            <div className="text-center mt-5">
              <button
                onClick={() => setEdit(false)}
                className="  text-center   bg-blue-very-light  rounded-xl shadow-xl py-2 px-10 max-md:px-7 ml-3 vazir-regular max-xl:w-28 max-lg:w-auto"
              >
                انصراف
              </button>
              
              <button className="my-4  bg-primary text-font-white rounded-xl shadow-lg py-2 px-14 max-md:px-8 vazir-regular">
              پرداخت
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
