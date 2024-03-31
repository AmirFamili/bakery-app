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
  const [loggedIn, setLoggedIn] = useState(localStorage.access?true:false);
  const [page, setPage] = useState("home");
  const [categoryPage, setCategoryPage] = useState(null);
  const [cart,  dispatchCalCart] = useReducer(savedCartReduser, [], initCart);

  useEffect(() => {
    localStorage.setItem("cart",JSON.stringify(cart));
  }, [cart]);

  return (
    <GlobalContext.Provider
      value={{
        cart,
        dispatchCalCart,
        page,
        setPage,
        convertNumberToFarsi,
        loggedIn,
        setLoggedIn,categoryPage, setCategoryPage
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
export default ContextWrapper;
