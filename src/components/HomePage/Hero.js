import React,{useEffect,useState} from "react";
import CakeImg from "../../images/assortment-pieces-cake.png";
import MuffinImg from "../../images/muffin.png";
import ArrowLeftICon from "../../images/icons/arrow-circle-left.png";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

export const Hero = () => {



  return (
    <section className="bg-hero mt-28 flex p-5 pb-20 relative max-lg:mt-0">
      <div className="px-1 ">
        <img src={CakeImg} alt="assortment-pieces-cake" className=" " />
        <div className="absolute top-20 right-16 z-10 max-lg:hidden">
          <h1 className="vazir-very-bold text-primary ">بلو کیک</h1>
          <h3 className=" mt-5 mb-4 vazir-bold  text-primary">
            یک لحظه شیرین را با ما تجربه کنید.
          </h3>
          <h4 className="vazir-light text-primary">
            یک لحظه شیرین را با ما تجربه کنید.
          </h4>
        </div>
      </div>
      <div className="px-1 relative max-sm:px-0">
        <img src={MuffinImg} alt="مافین" className="" />
        <div className="absolute bottom-5 w-full z-10 text-font-white text-center max-md:bottom-3">
          <h5 className="vazir-medium  ">10% تخفیف بگیرید</h5>

          <Link
            to="#"
            className="flex justify-center items-center cursor-pointer mt-3 max-md:mt-1"
          >
            <p className=" vazir-regular ">مشاهده</p>
            <img
              src={ArrowLeftICon}
              alt="arrow-circle-left"
              className="w-5 mr-2 max-md:w-4 max-sm:w-3"
            />
          </Link>

          <div className="flex justify-center items-center mt-2 max-md:mt-1 ">
            <div className="border border-white w-2 h-2 rounded-full m-1 max-md:h-1 max-md:w-1"></div>
            <div className="border border-white w-2 h-2 rounded-full bg-white max-md:h-1 max-md:w-1"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
