import React, { useContext, useEffect, useState } from "react";
import HomeIcon from "../../../images/icons/home.png";
import ProfileIcon from "../../../images/icons/profile.png";
import TaskIcon from "../../../images/icons/task-square.png";
import CartIcon from "../../../images/icons/shopping-cart.png";
import ArrowLeftIcon from "../../../images/icons/arrowLeft.png";
import ElementIcon from "../../../images/icons/element.png";
import CallIcon from "../../../images/icons/call-gray.png";
import AboutIcon from "../../../images/icons/about.png";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../../context/ContextWrapper";

export const Menu = () => {
  const {
    loggedIn,
    showMenu,
    categoryPage,
    setCategoryPage,
    categories,
    setShowMenu,
  } = useContext(GlobalContext);
  const [showCategory, setShowCategory] = useState(false);

  return (
    <section
      className={`hidden transition duration-200 ease-in-out w-2/6 mt-20 h-lvh fixed bg-gray-main z-50 rounded-l-2xl shadow-xl max-lg:block max-sm:w-1/2 ${
        showMenu ? "" : " translate-x-80 "
      }`}
    >
      <h2 className="iranyekan-medium text-center p-5 pb-0">منو</h2>
      <nav className="">
        <CustomLink to={"/"} icon={HomeIcon}>
          خانه
        </CustomLink>

        <div className="flex justify-between items-center  m-6 mb-0">
          <Link
            onClick={() => setShowMenu(false)}
            to={`/category/:${categoryPage}`}
            className="flex"
          >
            <img src={ElementIcon} alt="دسته‌بندی" className="w-5 h-5 ml-2" />
            <p className="iranyekan"> دسته‌بندی</p>
          </Link>
          <img
            onClick={() => setShowCategory(!showCategory)}
            src={ArrowLeftIcon}
            className={`w-5 h-5  ${showCategory && "-rotate-90"}`}
          />
        </div>
        <div className={`${showCategory ? "block" : "hidden"}`}>
          {categories &&
            categories.map((category) => (
              <div className=" my-4" key={category.id}>
                <Link
                  onClick={() => {
                    setShowMenu(false);
                    setCategoryPage(`${category.id}`);
                  }}
                  to={`category/:${category.id}`}
                  className="mx-7  iranyekan "
                >
                  {category.title}
                </Link>
              </div>
            ))}
        </div>

        <CustomLink to={"/call"} icon={CallIcon}>
          تماس با ما
        </CustomLink>
        <CustomLink to={"/about-us"} icon={AboutIcon}>
          درباره ما
        </CustomLink>
        {loggedIn && (
          <span>
            <CustomLink to={"/history"} icon={TaskIcon}>
              تاریخچه خرید
            </CustomLink>
            <CustomLink to={"/cart"} icon={CartIcon}>
              سبد خرید
            </CustomLink>
            <CustomLink to={"/profile"} icon={ProfileIcon}>
              حساب کاربری
            </CustomLink>
          </span>
        )}
      </nav>
    </section>
  );
};

const CustomLink = ({ to, children, icon, name, ...props }) => {
  const { setShowMenu } = useContext(GlobalContext);
  return (
    <Link
      to={to}
      onClick={() => setShowMenu(false)}
      {...props}
      className="flex m-5"
    >
      <img src={icon} alt={children} className="w-5 h-5 ml-2" />
      <p className="iranyekan">{children}</p>
    </Link>
  );
};
