import React, { useContext, useState } from "react";
import SearchIcon from "../../images/icons/search-normal.png";
import ProfileIcon from "../../images/icons/profile.png";
import ShoppingCartWhiteIcon from "../../images/icons/shopping-cart-white.png";
import ExitIcon from "../../images/icons/exit.png";
import TaskIcon from "../../images/icons/task.png";
import SettingIcon from "../../images/icons/setting.png";
import { Link} from "react-router-dom";
import { GlobalContext } from "../../context/ContextWrapper";

export const Header = () => {
  const { countAll, convertNumberToFarsi, loggedIn, setLoggedIn, info,navigate } =
    useContext(GlobalContext);
 
  const [showMenu, setShowMenu] = useState(false);

  const handlerLogOut = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setLoggedIn(false);
    navigate("/");
  };
  return (
    <header className="fixed w-11/12 z-40 iranyekan-light flex justify-between items-center bg-white px-2 py-4 border-r-2 border-gray-main max-lg:hidden">
      <div className="mr-5 w-1/2 max-xl:w-2/5 ">
        <div className=" border rounded-3xl flex items-center w-5/6 bg-gray-main h-11  ">
          <input
            type="text"
            name="search"
            className=" rounded-3xl px-4 w-full outline-none bg-gray-main"
            placeholder="جستوجو..."
          />
          <button className="bg-primary m-1  p-2  rounded-full">
            <img src={SearchIcon} alt="search" className=" w-5" />
          </button>
        </div>
      </div>

      <div className="flex items-start text-black ">
        <a
          className="flex border-l gray-100 my-3  "
          href={`tel:${info && info.phone_number}`}
        >
          <span className="my-3 iranyekan">
            {" "}
            {info && convertNumberToFarsi(info.phone_number)}
          </span>
          <svg
            className="icon my-3 mx-4 "
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.05 14.95L9.2 16.8C8.81 17.19 8.19 17.19 7.79 16.81C7.68 16.7 7.57 16.6 7.46 16.49C6.43 15.45 5.5 14.36 4.67 13.22C3.85 12.08 3.19 10.94 2.71 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C10.83 13.32 10.94 13.42 11.04 13.52C11.44 13.91 11.45 14.55 11.05 14.95Z"
              fill="#154160"
            />
            <path
              d="M21.9696 18.33C21.9696 18.61 21.9196 18.9 21.8196 19.18C21.7896 19.26 21.7596 19.34 21.7196 19.42C21.5496 19.78 21.3296 20.12 21.0396 20.44C20.5496 20.98 20.0096 21.37 19.3996 21.62C19.3896 21.62 19.3796 21.63 19.3696 21.63C18.7796 21.87 18.1396 22 17.4496 22C16.4296 22 15.3396 21.76 14.1896 21.27C13.0396 20.78 11.8896 20.12 10.7496 19.29C10.3596 19 9.96961 18.71 9.59961 18.4L12.8696 15.13C13.1496 15.34 13.3996 15.5 13.6096 15.61C13.6596 15.63 13.7196 15.66 13.7896 15.69C13.8696 15.72 13.9496 15.73 14.0396 15.73C14.2096 15.73 14.3396 15.67 14.4496 15.56L15.2096 14.81C15.4596 14.56 15.6996 14.37 15.9296 14.25C16.1596 14.11 16.3896 14.04 16.6396 14.04C16.8296 14.04 17.0296 14.08 17.2496 14.17C17.4696 14.26 17.6996 14.39 17.9496 14.56L21.2596 16.91C21.5196 17.09 21.6996 17.3 21.8096 17.55C21.9096 17.8 21.9696 18.05 21.9696 18.33Z"
              fill="#154160"
            />
          </svg>
        </a>

        <a className="flex pr-2 " href={`mailto:${info && info.instagram}`}>
          <span className="my-6 mx-2 Lato-light  max-xl:mx-1">
            {" "}
            {info && info.instagram_id}
          </span>
          <svg
            className=" my-6 mx-2 max-xl:mx-1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM12 15.88C9.86 15.88 8.12 14.14 8.12 12C8.12 9.86 9.86 8.12 12 8.12C14.14 8.12 15.88 9.86 15.88 12C15.88 14.14 14.14 15.88 12 15.88ZM17.92 6.88C17.87 7 17.8 7.11 17.71 7.21C17.61 7.3 17.5 7.37 17.38 7.42C17.26 7.47 17.13 7.5 17 7.5C16.73 7.5 16.48 7.4 16.29 7.21C16.2 7.11 16.13 7 16.08 6.88C16.03 6.76 16 6.63 16 6.5C16 6.37 16.03 6.24 16.08 6.12C16.13 5.99 16.2 5.89 16.29 5.79C16.52 5.56 16.87 5.45 17.19 5.52C17.26 5.53 17.32 5.55 17.38 5.58C17.44 5.6 17.5 5.63 17.56 5.67C17.61 5.7 17.66 5.75 17.71 5.79C17.8 5.89 17.87 5.99 17.92 6.12C17.97 6.24 18 6.37 18 6.5C18 6.63 17.97 6.76 17.92 6.88Z"
              fill="#154160"
            />
          </svg>
        </a>

        {loggedIn && (
          <Link
            to="/cart"
            className="flex justify-center items-center m-4 max-xl:mx-1  p-1 rounded-3xl bg-blue-little-light"
          >
            <p className="bg-white p-1 rounded-full w-8 text-primary text-center iranyekan ">
              {convertNumberToFarsi(countAll)}
            </p>
            <img
              src={ShoppingCartWhiteIcon}
              alt="سبدخرید"
              className="w-6 mx-2"
            />
          </Link>
        )}
        
        {!loggedIn && (
          <Link
            to="/singup"
            className="my-4 mx-5 bg-primary text-font-white rounded-xl shadow-lg py-2 px-9"
          >
            ورود
          </Link>
        )}
        {loggedIn && (
          <div
            className="relative "
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <img
              src={ProfileIcon}
              alt="حساب کاربری"
              className="border rounded-full w-10 p-1 m-4 cursor-pointer"
            />

            <div
              className={`absolute top-14 left-2 w-56  max-xl:left-2 border p-2 bg-slate-50  m-1 z-30 rounded-2xl iranyekan ${
                showMenu ? "block" : "hidden"
              }`}
            >
              {" "}
              <Link to="/profile" onClick={()=>setShowMenu(false)} className="cursor-pointer flex border-b p-3">
                <img
                  src={SettingIcon}
                  alt="settings"
                  className="w-5 h-5 ml-2"
                />{" "}
                تنظیمات حساب کاربری
              </Link>
              <Link to="/history" onClick={()=>setShowMenu(false)}  className="cursor-pointer flex border-b p-3">
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
