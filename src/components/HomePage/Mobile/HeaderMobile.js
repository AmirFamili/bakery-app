import React, { useContext, useState } from "react";
// import EmailIcon from "../../images/icons/email.png";
// import CallIcon from "../../images/icons/call.png";
import SearchIcon from "../../../images/icons/search-normal-black.png";
import ProfileIcon from "../../../images/icons/profile.png";
import ShoppingCartIcon from "../../../images/icons/shopping-cart-black.png";
import Menu from "../../../images/icons/menu.png";

import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../context/ContextWrapper";

export const HeaderMobile = () => {
  const { cart,  loggedIn, setLoggedIn } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const [showLogOut, setShowLogOut] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handlerLogOut = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="hidden iranyekan-light  justify-between items-center bg-white p-2  border-r-2 border-gray-main max-lg:flex">
      
      <div className="px-3">
        <img className=" m-4 w-9 max-md:w-7 " src={Menu} alt="menu" />
      </div>

      <div className=" flex items-center  text-black ">
        

        {!showSearch && (
          <img
          onClick={()=>setShowSearch(!showSearch)}
            src={SearchIcon}
            alt="Search"
            className=" w-7 mx-1 max-md:w-6"
          />
        )}
        {showSearch && (
          <div className=" mx-1 border rounded-3xl flex items-center  bg-gray-main h-10  ">
            <input
              type="text"
              name="search"
              className=" rounded-3xl px-4 w-full outline-none bg-gray-main iranyekan-very-light"
              placeholder="جستوجو..."
            />
            <button className="   p-2  rounded-full">
              <img
               onClick={()=>setShowSearch(!showSearch)}
                src={SearchIcon}
                alt="Search"
                className="my-5 w-7 mx-1 max-md:w-6"
              />
            </button>
          </div>
        )}

        {!loggedIn && (
          <Link
            to="/singup"
            className=" mx-5  bg-primary text-font-white rounded-xl shadow-lg py-2 px-7"
          >
            ورود
          </Link>
        )}
        {loggedIn && (
          <Link
            to="#"
            className="flex justify-center items-center  mx-1 p-1 "
          >
            <img
              src={ShoppingCartIcon}
              alt="سبدخرید"
              className="w-7 mx-2  max-md:w-6"
            />
          </Link>
        )}
        {loggedIn && (
          <div
            className="relative "
            onMouseEnter={() => setShowLogOut(true)}
            onMouseLeave={() => setShowLogOut(false)}
          >
            <img
              src={ProfileIcon}
              alt="حساب کاربری"
              className="border rounded-full w-8 p-1 my-5 ml-3 mx-1 cursor-pointer max-md:w-7"
            />

            <div
              className={`absolute top-14 left-3 border p-5 bg-slate-50  m-1 z-30 rounded-xl iranyekan-very-light-white  ${
                showLogOut ? "block" : "hidden"
              }`}
            >
              <span onClick={handlerLogOut} className="cursor-pointer">
                خروج
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
