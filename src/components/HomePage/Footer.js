import React, { useContext } from "react";
import WhatsApp from "../../images/icons/whatsapp.png";
import Instagram from "../../images/icons/instagram.png";
import CallIcon from "../../images/icons/call-simple.png";
import TelegramIcon from "../../images/icons/telegram.png";
import { GlobalContext } from "../../context/ContextWrapper";

export const Footer = () => {
  const { convertNumberToFarsi, info } = useContext(GlobalContext);
  return (
    <footer dir="ltr" className=" flex justify-start   ">
      <div  className="trapezoid relative  w-3/4 max-md:w-11/12 max-md:pl-1 rounded-t-2xl ">
        <div className="flex  items-center absolute top-6 ">
          <a href={info && info.whatsapp}>
            <img
              src={WhatsApp}
              alt="whatsapp"
              className="w-6 my-1 ml-4 cursor-pointer max-md:w-5 max-md:mx-4 "
            />
          </a>
          <a href={info && info.telegram}>
            <img
              src={TelegramIcon}
              alt="telegram"
              className="w-5 my-1 mx-4 cursor-pointer max-md:w-4"
            />
          </a>
          <a
            dir="ltr"
            href={`mailto:${info && info.instagram}`}
            className="flex mx-6 cursor-pointer Lato-light text-white max-md:mx-4 "
          >
            <img src={Instagram} alt="location" className=" h-7 mr-2 p-1 max-md:h-5 " />{" "}
            {info && info.instagram_id}
          </a>
          <a
            href={`tel:${info && info.phone_number}`}
            className="flex mx-6 cursor-pointer text-white iranyekan max-md:mx-3 "
          >
            <img src={CallIcon} alt="location" className=" w-6 mr-2 h-7 p-1 max-md:h-5 max-md:w-5 max-md:mr-1" />
            {info && convertNumberToFarsi(info.phone_number)}
          </a>
        </div>
      </div>
    </footer>
  );
};
