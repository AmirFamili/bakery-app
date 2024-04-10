import React, { useState, useEffect } from "react";
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


const cartId = () => {
  const storageCart = localStorage.getItem("cart");
  const parsedCart = storageCart ? JSON.parse(storageCart) : null;
  return parsedCart;
};

const ContextWrapper = (props) => {
  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);
  const [showProductModel, setShowProductModel] = useState(false);
  const [categoryPage, setCategoryPage] = useState(null);
  const [cart, setCart] = useState(cartId);
  const [logo, setlogo] = useState();
  const [info, setInfo] = useState();
  const [activeMeasure, setActiveMeasure] = useState();
  const [products, setProducts] = useState(null);
  const [countAll, setCountAll] = useState(0);

  useEffect(() => {
    if (cart) {
      const getProduct = async () => {
        await axios.get(`/order/cart/${cart}/items/`).then((response) => {
          setProducts(response.data);
          var x = 0;
          for (let i = 0; i < response.data.length; i++) {
           
            x += response.data[i].quantity;
          }
          setCountAll(x);
        });
      };
      getProduct();
    }
  }, [showProductModel,countAll]);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function getData() {
      await axios
        .get("/settings/", { signal })
        .then((response) => {
          setlogo(response.data[0].logo);
          setInfo(response.data[0]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }

    getData();

    return () => {
      abortController.abort();
    };
  }, []);

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
        setCart,
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
        activeMeasure,
        setActiveMeasure,
        products,
        countAll,setCountAll
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
export default ContextWrapper;
