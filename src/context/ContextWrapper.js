import React, { useState, useReducer, useEffect } from "react";
import axios from "../api/axios";

export const GlobalContext = React.createContext();
const farsiDigits = {
  0: "۰",
  1: "۱",
  2: "۲",
  3: "۳",
  4: "۴",
  5: "۵",
  6: "۶",
  7: "۷",
  8: "۸",
  9: "۹",
};

const convertNumberToFarsi = (num) => {
  return String(num)
    .split("")
    .map((digit) => farsiDigits[digit] || digit)
    .join("");
};

const savedCartReduser = (state, { type, payload }) => {
  switch (type) {
    case "add":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
};

const initCart = () => {
  const storageCart = localStorage.getItem("cart");
  const parsedCart = storageCart ? JSON.parse(storageCart) : [];
  return parsedCart;
};

const ContextWrapper = (props) => {
  // const [addCart, setAddCart] = useReducer(savedCartReduser, [], initCart);
  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);
  const [showProductModel, setShowProductModel] = useState(false);
  const [categoryPage, setCategoryPage] = useState(null);
  const [cart, dispatchCalCart] = useReducer(savedCartReduser, [], initCart);
  const [logo, setlogo] = useState();
  const [info, setInfo] = useState();
  const [activeMeasure, setActiveMeasure] = useState();

  useEffect(() => {
    async function getData() {
      await axios.get("/settings/").then((response) => {
        setlogo(response.data[0].logo);
        setInfo(response.data[0]);
      });
    }

    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const togglePopup = () => {
    setShowProductModel(!showProductModel);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (showProductModel) {
        setShowProductModel(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showProductModel]);

  return (
    <GlobalContext.Provider
      value={{
        cart,
        dispatchCalCart,
        convertNumberToFarsi,
        loggedIn,
        setLoggedIn,
        categoryPage,
        setCategoryPage,
        showProductModel,
        setShowProductModel,
        togglePopup,
        logo,
        info,
        activeMeasure, setActiveMeasure
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
export default ContextWrapper;
