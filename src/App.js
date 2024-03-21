import React from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Hero } from "./components/Hero";
import { News } from "./components/News";
import { Discount } from "./components/Discount";
import { Grouping } from "./components/Grouping";
import { Footer } from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { SignUp } from "./components/SingUp";
import { ChangePassword } from "./components/ChangePassword";
import { HeaderUser } from "./components/User/HeaderUser";
import { SidebarUser } from "./components/User/SidebarUser";
import { FooterUser } from "./components/User/FooterUser";

function App() {
  return (
    <div dir="rtl" className="App ">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="flex ">
                <Sidebar />
                <div className="main">
                  <Header />
                  <main className="bg-gray-main ">
                    <Hero />
                    <News />
                    <Grouping />
                    <Discount />
                  </main>
                </div>
              </div>
              <Footer />
            </div>
          }
        ></Route>
        <Route path="/singup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/change-password" element={<ChangePassword />}></Route>
        <Route
          path="/home"
          element={
            <div className="flex ">
              <SidebarUser />
              <div className="main">
                <HeaderUser />
                <div className="bg-gray-main ">
                  <Hero />
                  <News />
                  <Grouping />
                  <Discount />

                  <FooterUser />
                </div>
              </div>
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
