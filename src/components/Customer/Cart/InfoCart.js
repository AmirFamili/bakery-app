import React, { useContext } from "react";
import ArrowLeftIcon from "../../../images/icons/arrow-left.png";
import { GlobalContext } from "../../../context/ContextWrapper";
import { CartProduct } from "./CartProduct";
import {Link} from 'react-router-dom';

export const InfoCart = () => {
  const { convertNumberToFarsi, products } = useContext(GlobalContext);

  return (
    <div className="min-h-96 mt-5 p-1 pb-0 flex justify-center  border  rounded-2xl bg-white max-md:block ">
      <div className="w-2/3  border-l max-md:border-0 max-md:w-full">
        <table className="w-full ">
          <thead>
            <tr className="iranyekan-little-light text-gray-400 border-b  ">
              <th className="border-l w-10 p-6 "></th>
              <th className="w-52">نام محصول</th>
              <th className="w-52">قیمت</th>
              <th className="w-52">تعداد</th>
              <th className="w-52">مجموع قیمت</th>
              <th className="w-32"></th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, int) => (
                <CartProduct key={product.id} number={int} product={product} />
              ))}
          </tbody>
        </table>
        <div className=""></div>
      </div>
      <div className="w-1/3 p-5 relative max-md:w-full  max-md:flex max-md:justify-between ">
        <div className="mt-3">
          <h3 className="iranyekan-little-light"> نحوه تحویل سفارش:</h3>
          <div className="flex mt-5">
            <input type="radio" name="price" className=" accent-primary" />

            <p className="pr-2 iranyekan-very-light-white">
              تحویل حضوری _
              <span className="iranyekan-very-light-small">
                هزینه ارسال رایگان
              </span>
            </p>
          </div>
          <div className="flex mt-5 ">
            <input type="radio" name="price" className="accent-primary" />

            <p className="pr-2 iranyekan-very-light-white">
              تحویل با پیک _
              <span className="iranyekan-very-light-small">
                هزینه ارسال {convertNumberToFarsi("40,000")} تومان
              </span>
            </p>
          </div>
        </div>
        <div className="absolute bottom-5 right-28 max-xl:right-12 max-md:static max-md:mt-10">
          <Link to={'/cart/show-info'}><button
            
            className=" text-center w-52 flex justify-center items-center my-5 bg-primary text-font-white  rounded-xl shadow-xl py-2 px-1 vazir-regular  max-lg:max-w-48  max-md:w-32"
          >
            تایید و تکمیل سفارش
            <img src={ArrowLeftIcon} alt=" Arrow Left" className="w-5 mx-2" />
          </button></Link>
        </div>
      </div>
    </div>
  );
};

