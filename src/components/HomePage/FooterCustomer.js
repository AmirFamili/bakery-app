import React, { useContext } from "react";
import WhatsApp from "../../images/icons/whatsapp.png";
import Instagram from "../../images/icons/instagram.png";
import CallIcon from "../../images/icons/call-simple.png";
import EmailIcon from "../../images/icons/email-simple.png";
import { GlobalContext } from "../../context/ContextWrapper";

export const Footer = () => {
  const { convertNumberToFarsi, info } = useContext(GlobalContext);

  return (
    <footer dir="ltr" className=" flex justify-start max-lg:hidden  ">
      <div dir="ltr" className="trapezoid relative  p-4  w-3/4 ">
        <div className="flex absolute top-14 ">
          <a href={info && info.whatsapp}>
            <img
              src={WhatsApp}
              alt="whatsapp"
              className="w-6 my-1 mx-4 cursor-pointer "
            />
          </a>
          <a href={info && info.instagram}>
            <img
              src={Instagram}
              alt="instagram"
              className="w-5 my-1 mx-4 cursor-pointer "
            />
          </a>
          <a
            href={`mailto:${info && info.email}`}
            className="flex mx-6 cursor-pointer text-white "
          >
            <img src={EmailIcon} alt="location" className=" h-7 mr-2 p-1 " />{" "}
            {info && info.email}
          </a>
          <a
            href={`tel:${info && info.phone_number}`}
            className="flex mx-6 cursor-pointer text-white iranyekan"
          >
            <img src={CallIcon} alt="location" className=" w-6 mr-2 h-7 p-1 " />
            {info && convertNumberToFarsi(info.phone_number)}
          </a>
        </div>
      </div>
    </footer>
  );
};
