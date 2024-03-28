import React, { useContext, useState,useEffect } from "react";
import Logo from "../../images/logo.png";
import HomeIcon from "../../images/icons/home.png";
import HomeWhiteIcon from "../../images/icons/home-white.png";
import ElementIcon from "../../images/icons/element.png";
import ElementWhiteIcon from "../../images/icons/element-white.png";
import CallWhiteIcon from "../../images/icons/call-white.png";
import CallIcon from "../../images/icons/call-gray.png";
import ProfileIcon from "../../images/icons/profile.png";
import ProfileWhiteIcon from "../../images/icons/profile-white.png";
import TaskSquareIcon from "../../images/icons/task-square.png";
import TaskSquareWhiteIcon from "../../images/icons/task-square-white.png";
import ShoppingCartIcon from "../../images/icons/shopping-cart.png";
import ShoppingCartWhiteIcon from "../../images/icons/shopping-cart-white.png";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/ContextWrapper";

export const Sidebar = () => {
  const [home, setHome] = useState("");
  const [category, setCategory] = useState("");
  const [call, setCall] = useState("");
  const [profile, setProfile] = useState("");
  const [history, setHistory] = useState("");
  const [cart, setCart] = useState("");

  useEffect(() => {
    window.location.pathname === "/"
      ? setPage("home")
      :window.location.pathname.includes('/category')
      ?setPage("category")
      :setPage("");
  }, []);

  const { page, setPage,loggedIn } = useContext(GlobalContext);

  
  return (
    <section className="side-bar p-2 h-screen flex justify-center z-50 max-lg:hidden ">
      <div className="fixed ">
        <Link to="/" onClick={() => setPage("home")}>
          <img src={Logo} alt="logo" className="w-20 mt-3" />
        </Link>
        <div className="mt-3 flex flex-col justify-center items-center ">
          <div className="h-20  mt-5 text-center">
            <Link
              to="/"
              onMouseEnter={() => {
                if (page !== "home") {
                  setHome("خانه");
                }
              }}
              onMouseLeave={() => setHome("")}
              onClick={() => setPage("home")}
            >
              <div
                className={` rounded-full p-3 inline-block shadow-sm  m-auto ${
                  page === "home" ? "bg-primary  " : "bg-gray-main "
                }`}
              >
                {page === "home" ? (
                  <img src={HomeWhiteIcon} alt="خانه" className="w-7" />
                ) : (
                  <img src={HomeIcon} alt="خانه" className="w-6" />
                )}
              </div>
            </Link>
            <p className="iranyekan-very-light-white">{home}</p>
          </div>

          <div className="h-20  mt-3 text-center ">
            <Link  
              to="/category"
              onMouseEnter={() => {
                if (page !== "category") {
                  setCategory("دسته‌بندی");
                }
              }}
              onMouseLeave={() => setCategory("")}
              onClick={() => setPage("category")}
            >
              <div  
                className={` rounded-full p-3 shadow-sm  inline-block m-auto ${
                  page === "category" ? "bg-primary  " : "bg-gray-main "
                }`}
              >
                {page === "category" ? (
                  <img src={ElementWhiteIcon} alt="دسته‌بندی" className="w-7" />
                ) : (
                  <img src={ElementIcon} alt="دسته‌بندی" className="w-6" />
                )}
              </div>
            </Link>
            <p className="iranyekan-very-light-white">{category}</p>
          </div>

          <div className="h-20  mt-3  text-center  ">
            <Link
              to="#"
              onMouseEnter={() => {
                if (page !== "call") {
                  setCall("تماس با ما");
                }
              }}
              onMouseLeave={() => setCall("")}
              onClick={() => setPage("call")}
            >
              <div
                className={` rounded-full p-3 shadow-sm  inline-block m-auto ${
                  page === "call" ? "bg-primary  " : "bg-gray-main "
                }`}
              >
                {page === "call" ? (
                  <img src={CallWhiteIcon} alt="تماس با ما" className="w-7 m-auto" />
                ) : (
                  <img src={CallIcon} alt="تماس با ما" className="w-6 m-auto" />
                )}
              </div>
            </Link>
            <p className="iranyekan-very-light-white">{call}</p>
          </div>

          <span className="border-t mb-3  w-12"></span>

          


          {loggedIn &&  <div className="h-20 mt-5  text-center  ">
            <Link
              to="#"
              onMouseEnter={() => {
                if (page !== "history") {
                  setHistory("تاریخچه خرید");
                }
              }}
              onMouseLeave={() => setHistory("")}
              onClick={() => setPage("history")}
            >
              <div
                className={` rounded-full p-3.5 inline-block  m-auto ${
                  page === "history" ? "bg-primary  " : "bg-gray-main "
                }`}
              >
                {page === "history" ? (
                  <img src={TaskSquareWhiteIcon} alt="تاریخچه خرید" className="w-7" />
                ) : (
                  <img src={TaskSquareIcon} alt="تاریخچه خرید" className="w-6" />
                )}
              </div>
            </Link>
            <p className="iranyekan-very-light-white">{history}</p>
          </div>}







          {loggedIn &&  <div className="h-20 mt-3  text-center  ">
            <Link
              to="cart"
              onMouseEnter={() => {
                if (page !== "cart") {
                  setCart("سبد خرید");
                }
              }}
              onMouseLeave={() => setCart("")}
              onClick={() => setPage("cart")}
            >
              <div
                className={` rounded-full p-3.5 inline-block  m-auto ${
                  page === "cart" ? "bg-primary  " : "bg-gray-main "
                }`}
              >
                {page === "cart" ? (
                  <img src={ShoppingCartWhiteIcon} alt="سبد خرید " className="w-7" />
                ) : (
                  <img src={ShoppingCartIcon} alt="سبد خرید" className="w-6" />
                )}
              </div>
            </Link>
            <p className="iranyekan-very-light-white">{cart}</p>
          </div>}

          <div className={loggedIn?'h-20 mt-5  text-center ':'h-20 mt-3  text-center '}>
            <Link
              to="#"
              onMouseEnter={() => {
                if (page !== "profile") {
                  setProfile("حساب کاربری");
                }
              }}
              onMouseLeave={() => setProfile("")}
              onClick={() => setPage("profile")}
            >
              <div
                className={` rounded-full p-3 inline-block  m-auto ${
                  page === "profile" ? "bg-primary  " : "bg-gray-main "
                }`}
              >
                {page === "profile" ? (
                  <img src={ProfileWhiteIcon} alt="حساب کاربری" className="w-7" />
                ) : (
                  <img src={ProfileIcon} alt="حساب کاربری" className="w-6" />
                )}
              </div>
            </Link>
            <p className="iranyekan-very-light-white">{profile}</p>
          </div>



        </div>
      </div>
    </section>
  );
};
