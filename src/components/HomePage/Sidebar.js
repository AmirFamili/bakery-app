import React, { useContext, useState, useEffect } from "react";
import HomeIcon from "../../images/icons/home.png";
import HomeWhiteIcon from "../../images/icons/home-white.png";
import ElementIcon from "../../images/icons/element.png";
import ElementWhiteIcon from "../../images/icons/element-white.png";
import CallWhiteIcon from "../../images/icons/call-white.png";
import CallIcon from "../../images/icons/call-gray.png";
import AboutIcon from "../../images/icons/about.png";
import AboutWhiteIcon from "../../images/icons/about-white.png";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { GlobalContext } from "../../context/ContextWrapper";
import axios from "../../api/axios";

export const Sidebar = () => {

  const { setCategoryPage, categoryPage, logo } =
  useContext(GlobalContext);
  
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    async function getData() {
      await axios
        .get("/bakery/category/",{signal})
        .then((response) => setCategoryPage(response.data[0].id))
        .catch((err) => console.log(err));
    }

    getData();
    return () => {
      abortController.abort();
    };
  }, []);

 

  return (
    <section className="  side-bar p-2 h-screen flex justify-center z-50 max-lg:hidden ">
      <div className="fixed ">
        <Link to="/">
          <img src={logo} alt="logo" className="w-20 mt-3" />
        </Link>
        <nav className="mt-3 flex flex-col justify-center items-center ">
          <CustomLink
            to={"/"}
            icon={HomeIcon}
            whiteIcon={HomeWhiteIcon}
            name={"خانه"}
          >
            خانه
          </CustomLink>

          <CustomLink
            to={`/category/:${categoryPage}`}
            icon={ElementIcon}
            whiteIcon={ElementWhiteIcon}
            name={"دسته‌بندی"}
          >
            دسته‌بندی
          </CustomLink>

          <CustomLink
            to={"/call"}
            icon={CallIcon}
            whiteIcon={CallWhiteIcon}
            name={"تماس با ما"}
          >
            تماس با ما
          </CustomLink>
          <CustomLink
            to={"/about-us"}
            icon={AboutIcon}
            whiteIcon={AboutWhiteIcon}
            name={"درباره ما"}
          >
           درباره ما
          </CustomLink>
         
        </nav>
      </div>
    </section>
  );
};

const CustomLink = ({ to, children, icon, whiteIcon, name, ...props }) => {
  const [popUp, setPopUp] = useState(false);

  const resolvedPath = useResolvedPath(`${to}/*`);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <div className="h-20  mt-5 text-center">
      <Link
        to={to}
        {...props}
        onMouseEnter={() => {
          !isActive && setPopUp(true);
        }}
        onMouseLeave={() => setPopUp(false)}
      >
        <div
          className={` rounded-full p-3 inline-block shadow-sm  m-auto ${
            isActive ? "bg-primary  " : "bg-gray-main "
          }`}
        >
          {isActive ? (
            <img src={whiteIcon} alt={name} className="w-7" />
          ) : (
            <img src={icon} alt={name} className="w-6" />
          )}
        </div>
      </Link>
      <p className={popUp ? "iranyekan-very-light-white block" : "hidden"}>
        {children}
      </p>
    </div>
  );
};
