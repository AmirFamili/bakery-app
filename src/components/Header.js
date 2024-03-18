import React from "react";
import EmailIcon from "../images/icons/email.png";
import CallIcon from "../images/icons/call.png";
import SearchIcon from "../images/icons/search-normal.png";


export const Header = () => {
  return (
    <header dir="ltr" className=" iranyekan-light flex justify-around items-center bg-white p-2 z-30 border-r-2 border-gray-main ">
      <div className="flex items-start w-full">
        
        <button className="m-5 bg-primary text-font-white rounded-xl shadow-lg py-2 px-9">
          ورود
        </button>

        <a
          className="flex my-3 pr-2 border-r gray-100"
          href="mailto:Raanasheykhi08@gmail.com"
        >
          <img className=" my-3 mx-2 w-6" src={EmailIcon} alt="Email" />
          <span className="my-3 mx-2  ">Raanasheykhi08@gmail.com</span>
        </a>

        <a className="flex" href="tel:+989106646279">
          <img className="icon my-6 mx-4 w-6" src={CallIcon} alt="phone-number" />
          <span className="my-6 ">09106646279</span>
        </a>
      </div>
      <div dir="rtl" className="mr-5 relative w-4/6 ">
        <input
          type="text"
          name="search"
          className="relative border rounded-3xl px-3 py-2 w-full bg-gray-main h-11"
          placeholder="جستوجو..."
        />
        <button className="bg-primary p-2 absolute left-1 top-1 rounded-full">
            <img src={SearchIcon} alt="search" className=" w-5" />
            </button>
      </div>
    </header>
  );
};
