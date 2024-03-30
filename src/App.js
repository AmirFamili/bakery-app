import React, { useEffect, useContext } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { Login } from "./components/Register/Login";
import { SignUp } from "./components/Register/SingUp";
import { ChangePassword } from "./components/Register/ChangePassword";
import { Category } from "./components/Customer/Category";
import { Header } from "./components/HomePage/Header";
import { HeaderMobile } from "./components/HomePage/Mobile/HeaderMobile";
import { Sidebar } from "./components/HomePage/Sidebar";
import { Home } from "./components/HomePage/Home";
import {  Products } from "./components/Customer/Products";
import axios from "./api/axios";
import { GlobalContext } from "./context/ContextWrapper";
import { Footer } from "./components/HomePage/Footer";
import { Cart } from "./components/Customer/Cart/Cart";

function App() {
  const { setLoggedIn } = useContext(GlobalContext);
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
              localStorage.setItem(
                "access",
                JSON.stringify(response.data.access)
              );
              setLoggedIn(true);
            } 
          }).catch(
            err=>{
              localStorage.removeItem("access");
              localStorage.removeItem("refresh");
              navigate("/login");
            }
          );
      }
    };
    refreshTokens();
    const minute = 1000 * 60;
    setInterval(refreshTokens, minute * 1);
  }, []);

  return (
    <div dir="rtl" className="App ">
      <Routes>
        <Route
          path="/*"
          element={
            <div className="">
              <div className="flex ">
                <Sidebar />
                <div className="main  ">
                  <Header />
                  <HeaderMobile />
                  <main className="bg-gray-main ">
                    <Outlet />
                  </main>
                </div>
              </div>
              <Footer />
            </div>
          }
        >
          <Route path="" element={<Home />}></Route>
          <Route path="category/*" element={<Category />}>
            <Route path=":id" element={<Products />}></Route>
          </Route> 
          <Route path="cart/*" element={<Cart/>}></Route>
        </Route>
        <Route path="/singup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/change-password" element={<ChangePassword />}></Route>
      </Routes>
    </div>
  );
}

export default App;
