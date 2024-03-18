import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Hero } from "./components/Hero";
import { News } from "./components/News";
import { Discount } from "./components/Discount";
import { Grouping } from "./components/Grouping";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div dir="rtl" className="App ">

        <div className="flex ">
          <Sidebar />
          <div className="main">
            <Header />
            <div className="bg-gray-main ">
              <Hero />
              <News />
              <Grouping />
              <Discount />
            </div>
          </div>
        </div>
        <Footer />
  
    </div>
  );
}

export default App;
