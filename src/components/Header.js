import React from "react";
import EmailIcon from "../images/icons/email.png";
import CallIcon from "../images/icons/call.png";
import SearchIcon from "../images/icons/search-normal.png";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className=" iranyekan-light flex justify-between items-center bg-white p-2  border-r-2 border-gray-main ">
     
     
      <div  className="mr-5  relative w-1/2  ">
        <input
          type="text"
          name="search"
          className="relative  border rounded-3xl px-3 py-2  w-5/6 bg-gray-main h-11 outline-none "
          placeholder="جستوجو..."
        />
        <button className="bg-primary ml-1  p-2 absolute left-28 top-1 rounded-full">
            <img src={SearchIcon} alt="search" className=" w-5" />
            </button>
      </div>
     
     
     
     
     
      <div className="flex items-start text-black ">
        
      <a className="flex  border-l gray-100 my-3 Lato-light" href="tel:+989106646279">
      <span className="my-3 iranyekan">۰۹۱۰۶۶۴۶۲۷۹</span>
          <img className="icon my-3 mx-4 w-6" src={CallIcon} alt="phone-number" />
         
        </a>
       

        <a
          className="flex pr-2 "
          href="mailto:Raanasheykhi08@gmail.com"
        >
           <span className="my-6 mx-2 Lato-light">Raanasheykhi08@gmail.com</span>
          <img className=" my-6 mx-2 w-6" src={EmailIcon} alt="Email" />
         
        </a>
        <Link to="/singup" className="my-4 mx-5 bg-primary text-font-white rounded-xl shadow-lg py-2 px-9">
          ورود
        </Link>
       
      </div>
     
    </header>
  );
};
