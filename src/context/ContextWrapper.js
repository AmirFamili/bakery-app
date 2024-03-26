import React, { useState, useReducer, useEffect } from "react";

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
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
};

const initCart = () => {
  const storageCart = localStorage.getItem("cart");
  const parsedCart = Number(storageCart) ? storageCart : 0;
  return parsedCart;
};

const ContextWrapper = (props) => {
  // const [addCart, setAddCart] = useReducer(savedCartReduser, [], initCart);
  const [loggedIn, setLoggedIn] = useState(localStorage.access?true:false);
  const [cart, setCart] = useState(initCart);
  const [page, setPage] = useState("home");
 

  useEffect(() => {
    localStorage.setItem("cart", cart);
  }, [cart]);

  return (
    <GlobalContext.Provider
      value={{
        cart,
        setCart,
        page,
        setPage,
        convertNumberToFarsi,
        loggedIn,
        setLoggedIn,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
export default ContextWrapper;
