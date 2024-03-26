import React from "react";
import { Hero } from "./Hero";
import { News } from "./News";
import { Discount } from "./Discount";
import { Grouping } from "./Grouping";
import { Footer } from "./FooterCustomer";

export const Home = () => {
  return (
          <main className="bg-gray-main ">
            <Hero />
            <News />
            <Grouping />
            <Discount />
            <Footer/>
          </main>
  );
};
