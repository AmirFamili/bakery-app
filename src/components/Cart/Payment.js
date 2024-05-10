import React, { useContext } from "react";
import { GlobalContext } from "../../context/ContextWrapper";
import CallIcon from "../../images/icons/call-border.png";
import LocationIcon from "../../images/icons/location-tick-black.png";

export const Payment = () => {
  const { convertNumberToFarsi, totalPayment, info , setCountAll} =
    useContext(GlobalContext);


const handlePayment=()=>{
    setCountAll(0);
    window.location.href = "http://localhost:3000/history";
}
  return (
    <div className=" mt-5 p-1 pb-0 flex justify-center min-h-96  border  rounded-2xl bg-white max-lg:block ">
      <div className="flex justify-between max-lg:block">
        <div className="w-7/12 p-5 max-lg:w-full">
          <h2 className=" iranyekan my-5">
            {" "}
            مبلغ قابل پرداخت: {convertNumberToFarsi(totalPayment)} تومان
          </h2>
          <h3 className="iranyekan  my-5 text-gray-600">
            لطفا مبلغ نوشته شده را به کارت زیر واریز کنید و فیش واریزی را از
            طریق واتس اپ یا تلگرام به شماره تماس زیر برای ما ارسال کنید تا سفارش
            شما ثبت نهایی شود.
          </h3>

          <a
            className="flex items-center  "
            href={`tel:${info && info.phone_number}`}
          >
            <img src={CallIcon} alt="call" className="w-4 h-4 ml-2" />
            <span className="my-3 iranyekan-little-light">
              {info && convertNumberToFarsi(info.phone_number)}
            </span>
          </a>

          <a className="flex items-center mb-3 ">
            <img src={LocationIcon} alt="Location" className="w-4 h-4 ml-2" />
            <span className="iranyekan-little-light">
              {info && convertNumberToFarsi(info.address)}
            </span>
          </a>
        </div>
        <div className="w-5/12 m-5 p-5 text-white relative max-lg:w-full max-lg:mx-auto">
          <div className="bg-secondry px-10  py-14 rounded-xl max-lg:py-10">
            <h3 className="iranyekan-medium">6037 - 9978 - 5698 - 6523</h3>
            <h4 className="iranyekan mt-5 ">به نام: رعنا شیخی</h4>
          </div>
          <div className=" absolute bottom-0 left-5 max-lg:relative max-lg:flex max-lg:justify-center max-lg:items-center max-lg:left-0 max-lg:mt-5">
            <button onClick={handlePayment} className="my-4  bg-primary text-font-white rounded-xl shadow-lg py-2 px-11  vazir-regular">
                تایید
              </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};
