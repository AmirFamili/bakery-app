import React from "react";
import Logo from "../images/logo.png";
import HomeIcon from "../images/icons/home.png";
import ElementIcon from "../images/icons/element.png";
import CallIcon from "../images/icons/call-white.png";
import ProfileIcon from "../images/icons/profile.png";

export const Sidebar = () => {
  return (
    <div className="side-bar p-2 flex flex-col justify-top items-center h-full ">
      <img src={Logo} alt="logo" className="w-14 mt-3"/>
      <div className=" flex flex-col justify-center items-center">
        <a href="#" className="mt-7 bg-primary  rounded-full p-3 ">
          <img src={HomeIcon} alt="Home" className="w-5" />
        </a>
        <a href="#" className="mt-7 bg-gray-main rounded-full p-2 ">
          <img src={ElementIcon} alt="Grouping" className=" w-6" />
        </a>
        <a href="#" className="mt-7 bg-gray-main rounded-full p-2">
          <img src={CallIcon} alt="Call" className="w-5" />
        </a>
        <span className="border-t mt-3.5  w-8"></span>
             <a href="#" className="mt-3.5 bg-gray-main rounded-full  p-2">
          <img src={ProfileIcon} alt="Profile" className="w-5" />
        </a>
        
       
      </div>
    </div>
  );
};
