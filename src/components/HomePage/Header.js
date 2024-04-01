import React, { useContext, useState ,useEffect} from "react";
import EmailIcon from "../../images/icons/email.png";
import CallIcon from "../../images/icons/call.png";
import SearchIcon from "../../images/icons/search-normal.png";
import ProfileIcon from "../../images/icons/profile.png";
import ShoppingCartWhiteIcon from "../../images/icons/shopping-cart-white.png";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/ContextWrapper";
import axios from "../../api/axios";

export const Header = () => {
  const {setPage, cart, convertNumberToFarsi, loggedIn, setLoggedIn } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const [showLogOut, setShowLogOut] = useState(false);
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



  const handlerLogOut = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="fixed w-11/12 z-40 iranyekan-light flex justify-between items-center bg-white px-2 py-4 border-r-2 border-gray-main max-lg:hidden">
      <div className="mr-5 w-1/2 max-xl:w-2/5 ">
        <div  className=" border rounded-3xl flex items-center w-5/6 bg-gray-main h-11  ">
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
          href={`tel:${info &&  info.phone_number}`}
        >
          <span className="my-3 iranyekan">  {info &&  convertNumberToFarsi(info.phone_number)}</span>
          <img
            className="icon my-3 mx-4 w-6"
            src={CallIcon}
            alt="phone-number"
          />
        </a>

        <a className="flex pr-2 "   href={`mailto:${info &&  info.email}`}>
          <span className="my-6 mx-2 Lato-light  max-xl:mx-1">   {info &&  info.email}</span>
          <img className=" my-6 mx-2 w-6 max-xl:mx-1" src={EmailIcon} alt="Email" />
        </a>
        {!loggedIn && (
          <Link
            to="/singup"
            className="my-4 mx-5 bg-primary text-font-white rounded-xl shadow-lg py-2 px-9"
          >
            ورود
          </Link>
        )}
        {loggedIn && (
          <Link
             to="cart"
             onClick={() => setPage("cart")}
            className="flex justify-center items-center m-4 max-xl:mx-1  p-1 rounded-3xl bg-blue-little-light"
          >
            <p className="bg-white p-1 rounded-full w-8 text-primary text-center iranyekan ">
              {convertNumberToFarsi(cart.length)}
            </p>
            <img
              src={ShoppingCartWhiteIcon}
              alt="سبدخرید"
              className="w-6 mx-2"
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
              className="border rounded-full w-10 p-1 m-4 cursor-pointer"
            />

            <div
              className={`absolute top-14 left-6  max-xl:left-2 border p-5 bg-slate-50  m-1 z-30 rounded-xl iranyekan-very-light-white  ${
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
