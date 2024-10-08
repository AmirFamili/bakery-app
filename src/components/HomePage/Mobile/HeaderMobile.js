import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "../../../images/icons/search-normal-black.png";
import ShoppingCartIcon from "../../../images/icons/shopping-cart-black.png";
import ExitIcon from "../../../images/icons/exit.png";
import TaskIcon from "../../../images/icons/task.png";
import SettingIcon from "../../../images/icons/setting.png";
import Menu from "../../../images/icons/menu.png";
import HamburgerIcon from "../../../images/icons/hamburger-menu.png";

import { Link } from "react-router-dom";
import { GlobalContext } from "../../../context/ContextWrapper";

export const HeaderMobile = () => {
  const {
    loggedIn,
    setLoggedIn,
    navigate,
    imageProfile,
    showMenu,
    setShowMenu,
    showSearchPage,
    setShowSearchPage,
    search,
    setSearch,
  } = useContext(GlobalContext);

  const [showLogOut, setShowLogOut] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showX, setShowX] = useState(false);

  const handlerLogOut = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    if (search === "") {
      setShowSearchPage(false);
      setShowX(false);
    } else {
      setShowSearchPage(true);
      setShowX(true);
    }
  }, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <header className="hidden iranyekan-light  justify-between items-center bg-white p-2 fixed z-50 w-full border-r-2 border-gray-main max-lg:flex">
      <div onClick={() => setShowMenu(!showMenu)} className="px-3">
        <img
          className={` m-4 w-9 max-md:w-7 ${showMenu && "hidden"}`}
          src={Menu}
          alt="menu"
        />
        <img
          className={`m-4  w-9 max-md:w-7 ${showMenu ? "block" : "hidden"}`}
          src={HamburgerIcon}
          alt="menu"
        />
      </div>

      <div className=" flex items-center  text-black ">
        {!showSearch && (
          <img
            onClick={() => setShowSearch(!showSearch)}
            src={SearchIcon}
            alt="Search"
            className=" w-7 mx-1 max-md:w-6"
          />
        )}
        {showSearch && (
          <div className=" border rounded-3xl flex items-center  bg-gray-main h-10  ">
            <input
              type="text"
              name="search"
              value={search}
              onChange={handleSearch}
              className=" rounded-3xl px-4 w-full outline-none bg-gray-main iranyekan-very-light"
              placeholder="جستجو..."
            />
            <div className="w-6">
              <svg
                onClick={() => setSearch("")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`w-5 h-5 cursor-pointer  ${!showX && "hidden"}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
            <button className=" pl-2  rounded-full ">
              <img
                onClick={() => setShowSearch(!showSearch)}
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
            to="/cart"
            onClick={()=>  setShowSearchPage(false)}
            className="flex justify-center items-center w-7  py-1 mx-2  "
          >
            <img
              src={ShoppingCartIcon}
              alt="سبدخرید"
              className=" mx-2  max-md:w-6"
            />
          </Link>
        )}
        {loggedIn && (
          <div
            className="relative  "
            onMouseEnter={() => setShowLogOut(true)}
            onMouseLeave={() => setShowLogOut(false)}
          >
            <img
              src={imageProfile}
              alt="حساب کاربری"
              className="border rounded-full w-9 h-9 my-5 ml-3 mx-1 cursor-pointer "
            />

            <div
              className={`absolute top-14 left-6 w-64  max-sm:w-56 max-xl:left-2 border p-5 bg-slate-50  m-1 z-30 rounded-xl iranyekan ${
                showLogOut ? "block" : "hidden"
              }`}
            >
              {" "}
              <Link to="/profile" className="cursor-pointer flex border-b p-3">
                <img
                  src={SettingIcon}
                  alt="settings"
                  className="w-5 h-5 ml-2"
                />{" "}
                تنظیمات حساب کاربری
              </Link>
              <Link to="/history" className="cursor-pointer flex border-b p-3">
                <img src={TaskIcon} alt="settings" className="w-5 h-5 ml-2" />
                سفارشات شما
              </Link>
              <p onClick={handlerLogOut} className="cursor-pointer flex p-3">
                <img src={ExitIcon} alt="settings" className="w-5 h-5 ml-2" />
                خروج
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
