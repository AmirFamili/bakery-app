import React, { useEffect, useState } from "react";
import Tag from "../../images/icons/tag.png";
import ArrowCircleLeftPrimary from "../../images/icons/arrow-circle-left-primary.png";
import axios from "../../api/axios";
import { Product } from "../Product/Product";

export const News = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    async function getData() {
      await axios
        .get("/bakery/recent_cake/")
        .then((response) => setProducts(response.data));
    }

    getData();
  }, []);

  return (
    <section className="p-6 pt-0">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={Tag}
            alt="tag"
            className="w-5 h-5 mt-1 max-md:w-4 max-md:h-4"
          />
          <h2 className="iranyekan-medium pr-3">تازه‌ها</h2>
        </div>
        <div className="flex justify-center items-center cursor-pointer mt-3 max-md:hidden">
          <p className=" iranyekan-light ">مشاهده همه</p>
          <img
            src={ArrowCircleLeftPrimary}
            alt="arrow-circle-left"
            className="w-7 mr-2"
          />
        </div>
      </div>

      <div className=" grid grid-flow-col overflow-x-auto justify-start overscroll-x-auto py-6 mt-10 ">
      {products && products.map(product =>(
       <Product key={product.id} product={product}/>
      ))}
      </div>
    </section>
  );
};
