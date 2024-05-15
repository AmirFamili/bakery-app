import React, { useContext } from "react";
import WhatsApp from "../../images/icons/whatsapp.png";
import Instagram from "../../images/icons/instagram.png";
import CallIcon from "../../images/icons/call-simple.png";
import TelegramIcon from "../../images/icons/telegram.png";
import { GlobalContext } from "../../context/ContextWrapper";

export const Footer = () => {
  const { convertNumberToFarsi, info } = useContext(GlobalContext);
  return (
    <footer dir="ltr" className=" flex justify-start  ">
      <div  className="trapezoid relative  w-3/4 max-md:w-11/12 max-md:pl-1 rounded-t-2xl ">
        <div className="flex  items-center absolute top-6 w-full">
          
            <a href={info && info.whatsapp}>
            <img
              src={WhatsApp}
              alt="whatsapp"
              className="w-6 my-1 ml-10 cursor-pointer max-md:w-5 max-md:mx-4 max-sm:mx-2"
            />
          </a>
          <a href={info && info.telegram}>
            <img
              src={TelegramIcon}
              alt="telegram"
              className="w-5 my-1 mx-10 cursor-pointer max-md:w-4 max-md:mx-5 max-sm:mx-3"
            />
          </a>
          <a
            dir="ltr"
            href={`mailto:${info && info.instagram}`}
            className="flex cursor-pointer Lato-light text-white max-md:mx-3  max-sm:mx-1"
          >
            <img src={Instagram} alt="instagram" className=" h-7 mx-2 p-1 max-md:h-6" />{" "}
            
          </a>
         
          
          <div className=" text-gray-50 iranyekan flex justify-center items-center  w-full max-sm:ml-4">
          Powered by:
            <a
            href='#'
            className=" mx-3 cursor-pointer max-md:mx-1 text-white "
          >
            Nova__spark
          </a>
          </div>
          
        </div>
      </div>















     






    </footer>
  );
};


