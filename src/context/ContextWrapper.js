import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

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
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [accessToken, setAccessToken] = useState(null);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [deliveryId, setDeliveryId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const refreshTokens = () => {
      if (localStorage.refresh) {
        axios
          .post("/auth/refresh/", {
            refresh: localStorage.refresh.split('"')[1],
          })
          .then((response) => {
            if (response.data.access) {
              setAccessToken(response.data.access);
              localStorage.setItem(
                "access",
                JSON.stringify(response.data.access)
              );
              setLoggedIn(true);
            }
          })
          .catch((err) => {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            navigate("/login");
          });
      }
    };
    refreshTokens();
    const minute = 1000 * 60;
    setInterval(refreshTokens, minute * 1);
  }, []);

  useEffect(() => {
    if (accessToken) {
      const getProduct = async () => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        await axios
          .get(
            `/order/cart/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            },
            { signal }
          )
          .then((response) => {
            if (response.data.length > 0) {
              if (response.data[0].delivery_method) {
                setDeliveryPrice(response.data[0].delivery_method.cost);
                setDeliveryId(response.data[0].delivery_method.id);
              }
              setTotalPayment(response.data[0].total_payment);
              setTotalPrice(response.data[0].total_price);
              setProducts(response.data[0].items);
              setCart(response.data[0].id);

              var x = 0;
              for (let i = 0; i < response.data[0].items.length; i++) {
                x += response.data[0].items[i].quantity;
              }

              setCountAll(x);
            }
          })
          .catch((err) => console.log(err));

        return () => {
          abortController.abort();
        };
      };
      getProduct();
    } else {
      setCountAll(0);
      setProducts(null);
      setTotalPrice(0);
    }
  }, [countAll, accessToken, navigate]);

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
        countAll,
        setCountAll,
        totalPrice,
        accessToken,
        setAccessToken,
        navigate,
        deliveryPrice,
        deliveryId,
        totalPayment,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
export default ContextWrapper;
