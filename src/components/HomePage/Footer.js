import React,{useContext,useEffect, useState} from "react";
import WhatsApp from "../../images/icons/whatsapp.png";
import Instagram from "../../images/icons/instagram.png";
import LocationIcon from "../../images/icons/location-tick.png";
import CallIcon from "../../images/icons/call-simple.png";
import EmailIcon from "../../images/icons/email-simple.png";
import { GlobalContext } from "../../context/ContextWrapper";
import axios from "../../api/axios";

export const Footer = () => {
  const { loggedIn, convertNumberToFarsi } = useContext(GlobalContext);
  const [info,setInfo]=useState();

  useEffect(() => {
    async function getData() {
      await axios
        .get("/settings/")
        .then((response) => setInfo(response.data[0]))
        .catch(err=>console.log(err));
    }

    getData();
  }, []);

if(!loggedIn){
 return (
    <footer className="bg-primary w-full  rounded-t-2xl py-5  ">
      <img
        src= {info &&  info.logo}
        alt="logo"
        className="w-20 mt-3  border-2 rounded-full mx-auto my-5"
      />
      <p className="text-center text-white iranyekan-very-light-white w-5/12 m-auto">
      {info &&  info.about}
      </p>
      <div className="flex justify-center items-center py-3 border-b">
        <a href={info &&  info.instagram} target="_blank" ><img
          src={Instagram}
          alt="instagram"
          className="w-6 m-5 cursor-pointer "
        /></a>
         <a href={info &&  info.whatsapp} target="_blank" ><img
          src={WhatsApp}
          alt="whatsapp"
          className="w-7 m-5 cursor-pointer "
        /></a>
      </div>
      <div className="flex justify-start items-center p-4 text-white max-lg:flex-col ">
        <a href="" className="flex mx-6 cursor-pointer max-lg:mpt-3 iranyekan-little-light">
          <img src={LocationIcon} alt="location" className="w-6 p-1" />
          {info &&  info.address}
        </a>
        <a
          href={`tel:${info &&  info.phone_number}`}
          className="flex mx-6 cursor-pointer iranyekan  max-lg:mt-3"
        >
          <img src={CallIcon} alt="location" className="w-6 p-1  " />
          {info &&  convertNumberToFarsi(info.phone_number)}
        </a>
        <a
          href={`mailto:${info &&  info.email}`}
          className="flex mx-6 cursor-pointer Lato-light  max-lg:mt-3"
        >
          <img src={EmailIcon} alt="location" className="w-6 p-1 " />{" "}
          {info &&  info.email}
        </a>
      </div>
    </footer>
  );}
};
