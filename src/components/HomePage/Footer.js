import React,{useContext} from "react";
import Logo from "../../images/logo.png";
import WhatsApp from "../../images/icons/whatsapp.png";
import Instagram from "../../images/icons/instagram.png";
import LocationIcon from "../../images/icons/location-tick.png";
import CallIcon from "../../images/icons/call-simple.png";
import EmailIcon from "../../images/icons/email-simple.png";
import { GlobalContext } from "../../context/ContextWrapper";

export const Footer = () => {
  const { loggedIn } = useContext(GlobalContext);
if(!loggedIn){
 return (
    <footer className="bg-primary w-full  rounded-t-2xl py-5  ">
      <img
        src={Logo}
        alt="logo"
        className="w-20 mt-3  border-2 rounded-full mx-auto my-5"
      />
      <p className="text-center text-white iranyekan-very-light-white w-5/12 m-auto">
        کمی توضیحات درباره خودتون کمی توضیحات درباره خودتون کمی توضیحات درباره
        خودتون کمی توضیحات درباره خودتون کمی توضیحات درباره خودتون کمی توضیحات
        درباره خودتون
      </p>
      <div className="flex justify-center items-center py-3 border-b">
        <img
          src={Instagram}
          alt="instagram"
          className="w-6 m-5 cursor-pointer "
        />
        <img
          src={WhatsApp}
          alt="whatsapp"
          className="w-7 m-5 cursor-pointer "
        />
      </div>
      <div className="flex justify-start items-center p-4 text-white max-lg:flex-col ">
        <a href="" className="flex mx-6 cursor-pointer max-lg:mpt-3 iranyekan-little-light">
          <img src={LocationIcon} alt="location" className="w-6 p-1" />
          خیابان ولیعصر، روبروی پارک ملت، کوچه رسایی، پلاک 12
        </a>
        <a
          href="tel:+989106646279"
          className="flex mx-6 cursor-pointer iranyekan  max-lg:mt-3"
        >
          <img src={CallIcon} alt="location" className="w-6 p-1  " />
          ۰۹۱۰۶۶۴۶۲۷۹
        </a>
        <a
          href="mailto:Raanasheykhi08@gmail.com"
          className="flex mx-6 cursor-pointer Lato-light  max-lg:mt-3"
        >
          <img src={EmailIcon} alt="location" className="w-6 p-1 " />{" "}
          Raanasheykhi08@gmail.com
        </a>
      </div>
    </footer>
  );}
};
