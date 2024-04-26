import React, { useContext } from "react";
import { GlobalContext } from "../../context/ContextWrapper";

export const Popup = ({ onClose }) => {
  const { setActiveMeasure } = useContext(GlobalContext);

  return (
    <div
      onClick={() => onClose()}
      className="fixed top-0 right-0 w-screen h-screen flex justify-center items-center z-50 border text-black "
    >
      <div className="bg-white rounded-xl border w-3/12 max-lg:w-3/6 max-md:w-5/6">
        <h3 className="iranyekan-little-light text-center p-3 border-b font-bold">
          وضعیت سفارش
        </h3>
        <div className="mx-5 my-8">
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 border-2 border-secondry  rounded-full mx-2 "></div>{" "}
              <h5 className="iranyekan-very-light-white text-secondry ">ثبت سفارش</h5>
            </div>
            <h6 className="iranyekan-very-light-small">1402/11/25</h6>
          </div>
          <div className="h-5 border-dotted  border-r-2 mr-3"></div>




          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 border-2  border-gray-400 rounded-full mx-2 "></div>{" "}
              <h5 className="iranyekan-very-light"> درحال آماده سازی </h5>
            </div>
          </div>
          <div className="h-5 border-dotted  border-r-2 mr-3"></div>




          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 border-2  border-gray-400 rounded-full mx-2 "></div>{" "}
              <h5 className="iranyekan-very-light"> آماده </h5>
            </div>
          </div>
          <div className="h-5 border-dotted  border-r-2 mr-3"></div>



          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 border-2  border-gray-400 rounded-full mx-2 "></div>{" "}
              <h5 className="iranyekan-very-light"> تسویه حساب </h5>
            </div>
          </div>
          <div className="h-5 border-dotted  border-r-2 mr-3"></div>



          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 border-2  border-gray-400 rounded-full mx-2 "></div>{" "}
              <h5 className="iranyekan-very-light"> تحویل به پیک</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
