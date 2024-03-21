import React from "react";
import Logo from "../../images/logo.png";
import WhatsApp from "../../images/icons/whatsapp.png";
import Instagram from "../../images/icons/instagram.png";
import LocationIcon from "../../images/icons/location-tick.png";
import CallIcon from "../../images/icons/call-simple.png";
import EmailIcon from "../../images/icons/email-simple.png";

export const FooterUser = () => {
  return (
    <footer dir="ltr" className=" flex justify-start mt-24 ">
    <div dir="ltr" className="trapezoid relative  p-4  w-3/4 ">
      <div className="flex absolute top-14 ">
        <a href="http://">
      
          <img
            src={WhatsApp}
            alt="whatsapp"
            className="w-6 my-1 mx-4 cursor-pointer "
          />
        </a>
        <a href="http://">
          <img
            src={Instagram}
            alt="instagram"
            className="w-5 my-1 mx-4 cursor-pointer "
          />
        </a>
        <a
          href="mailto:Raanasheykhi08@gmail.com"
          className="flex mx-6 cursor-pointer text-white "
        >
          <img src={EmailIcon} alt="location" className=" h-7 mr-2 p-1 " />{" "}
          Raanasheykhi08@gmail.com
        </a>
        <a
          href="tel:+989106646279"
          className="flex mx-6 cursor-pointer text-white "
        >
          <img src={CallIcon} alt="location" className=" w-6 mr-2 h-7 p-1 " />{" "}
          09106646279
        </a>
      </div>
    </div>
    </footer>
    
  );
};
