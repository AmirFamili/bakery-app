import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Login } from "./components/Register/Login";
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

function App() {
  return (
    <div dir="rtl" className="App relative">
      <Routes>
        <Route
          path="/*"
          element={
            <div className="">
              <div className="flex relative ">
                <Sidebar />
                <Menu/>
                <div className="main  ">
                  <Header />
                  <HeaderMobile />
                  <main className="bg-gray-main ">
                    <Outlet />
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
          </Route>
          <Route path="call" element={<CallToUs />}></Route>
          <Route path="history" element={<History />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="about-us" element={<AboutUs />}></Route>
          <Route path="see-all-discount" element={<SeeAllDiscount/>}></Route>
          <Route path="see-all-new-product" element={< SeeAllNewProduct/>}></Route>
         
        </Route>
        <Route path="/singup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/change-password" element={<ChangePassword />}></Route>
      </Routes>
    </div>
  );
}

export default App;
