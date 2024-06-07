import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Login } from "./components/Register/Login";
import { LoginActivate } from "./components/Register/LoginActivate";
import { SignUp } from "./components/Register/SingUp";
import { ChangePassword } from "./components/Register/ChangePassword";
import { Category } from "./components/Category/Category";
import { Header } from "./components/HomePage/Header";
import { HeaderMobile } from "./components/HomePage/Mobile/HeaderMobile";
import { Sidebar } from "./components/HomePage/Sidebar";
import { Home } from "./components/HomePage/Home";
import { Products } from "./components/Category/Products";
import { Cart } from "./components/Cart/Cart";
import { CallToUs } from "./components/Call/CallToUs";
import { History } from "./components/History/History";
import { Profile } from "./components/Profile/Profile";
import { InfoCart } from "./components/Cart/InfoCart";
import { InfoSend } from "./components/Cart/InfoSend";
import { AboutUs } from "./components/AboutUs/AboutUs";
import { CustomerOrder } from "./components/Customer/CustomerOrder";
import { Menu } from "./components/HomePage/Mobile/Menu";
import { SeeAllDiscount } from "./components/SeeAll/SeeAllDiscount";
import { SeeAllNewProduct } from "./components/SeeAll/SeeAllNew";
import { GlobalContext } from "./context/ContextWrapper";
import { Product } from "./components/Product/Product";
import { ConfirmNewPassword } from "./components/Register/ConfirmNewPassword";
import axios from "./api/axios";
import BackIcon from "./images/icons/arrow-right.png";
import { Payment } from "./components/Cart/Payment";
import Loading from "./images/icons/loading.gif";
import NoProducts from "./images/icons/no_products.webp";

function App() {
  const { showSearchPage, search, setSearch } = useContext(GlobalContext);

  const [searchProduct, setSearchProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/bakery/search_cake/?search=${search}`
        );
        setSearchProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (search.length > 0) {
      fetchData();
    } else {
      setSearchProduct([]);
    }
  }, [search]);

  return (
    <div dir="rtl" className="App relative">
      <Routes>
        <Route
          path="/*"
          element={
            <div className="">
              <div className="flex relative ">
                <Sidebar />
                <Menu />
                <div className="main ">
                  <Header />
                  <HeaderMobile />
                  <main className="bg-gray-main relative">
                    <Outlet />
                    <div
                      className={` pt-32 fixed w-11/12 h-screen top-0 left-0 z-30 bg-gray-main max-lg:w-full  ${
                        showSearchPage ? "" : "-translate-x-full"
                      }`}
                    >
                      <button
                        onClick={() => setSearch("")}
                        className="flex justify-start items-center iranyekan-font text-lg text"
                      >
                        <img
                          src={BackIcon}
                          alt="back"
                          className="w-6 m-6 ml-3"
                        />{" "}
                        بازگشت
                      </button>

                      {loading ? (
                        <div className=" w-full h-screen ">
                          {" "}
                          <div className="flex justify-center items-center ">
                            <img
                              src={Loading}
                              alt="loading"
                              className="w-10 mt-36 "
                            />
                          </div>
                        </div>
                      ) : !searchProduct.length ? (
                        <div className=" w-full  ">
                          <div className="flex justify-center items-center   ">
                            <div className="">
                              <img
                                src={NoProducts}
                                alt="no products"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-start  flex-wrap p-5">
                          {searchProduct &&
                            searchProduct.map((product) => (
                              <Product product={product} />
                            ))}
                        </div>
                      )}
                    </div>
                  </main>
                </div>
              </div>
            </div>
          }
        >
          <Route path="" element={<Home />}></Route>
          <Route path="category/*" element={<Category />}>
            <Route path=":id" element={<Products />}></Route>
          </Route>
          <Route path="customer-order" element={<CustomerOrder />}></Route>
          <Route path="cart/*" element={<Cart />}>
            <Route path="" element={<InfoCart />}></Route>
            <Route path="show-info" element={<InfoSend />}></Route>
            <Route path="payment" element={<Payment />}></Route>
          </Route>
          <Route path="call" element={<CallToUs />}></Route>
          <Route path="history" element={<History />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="about-us" element={<AboutUs />}></Route>
          <Route path="see-all-discount" element={<SeeAllDiscount />}></Route>
          <Route
            path="see-all-new-product"
            element={<SeeAllNewProduct />}
          ></Route>
        </Route>
        <Route path="/singup" element={<SignUp />}></Route>
        <Route path="/login/:id" element={<LoginActivate />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/change-password" element={<ChangePassword />}></Route>
        <Route
          path="/confirm-new-password/:id"
          element={<ConfirmNewPassword />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
