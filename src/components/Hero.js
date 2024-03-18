import React from "react";
import CakeImg from "../images/assortment-pieces-cake.png";
import MuffinImg from "../images/muffin.png";
import ArrowLeftICon from "../images/icons/arrow-circle-left.png";

export const Hero = () => {
  return (
    <section className="flex p-5  relative ">
      <div className="px-1 ">
        <img src={CakeImg} alt="assortment-pieces-cake" className=" " />
        <div className="absolute top-20 right-16 z-10">
          <h1 className="vazir-very-bold text-primary">بلو کیک</h1>
          <h3 className=" mt-5 mb-4 vazir-regular text-primary">
            یک لحظه شیرین را با ما تجربه کنید.
          </h3>
          <h4 className="vazir-light text-primary">
            یک لحظه شیرین را با ما تجربه کنید.
          </h4>
        </div>
      </div>
      <div className="px-1 relative">
        <img src={MuffinImg} alt="Muffin" className="" />
        <div className="absolute bottom-5 w-full z-10 text-font-white text-center">
          <h5 className="vazir-medium vazir-regular">10% تخفیف بگیرید</h5>
          <div className="flex justify-center items-center cursor-pointer mt-3">
            <p className=" vazir-regular ">مشاهده</p>
            <img
              src={ArrowLeftICon}
              alt="arrow-circle-left"
              className="w-5 mr-2"
            />
          </div>
          <div className="flex justify-center items-center mt-2">
     
            <div className="border border-white w-2 h-2 rounded-full m-1"></div>
            <div className="border border-white w-2 h-2 rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
