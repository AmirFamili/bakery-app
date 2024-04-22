import React, { useEffect, useState, useContext } from "react";
import { Product } from "../Product/Product";
import ArrowLeftBlack from "../../images/icons/arrow-circle-left-black.png";
import ArrowRightBlack from "../../images/icons/arrow-circle-right-gray.png";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context/ContextWrapper";

export const Products = () => {
  const [products, setProducts] = useState();
  const params = useParams();
  const { categoryPage } = useContext(GlobalContext);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function getData() {
      await axios
        .get(`/bakery/category/${params.id.split(":")[1]}`, { signal })
        .then((response) => setProducts(response.data))
        .catch((err) => console.log(err));
    }

    getData();
    return () => {
      abortController.abort();
    };
  }, [categoryPage]);

  return (
    <div className="p-5 max-md:p-1">
      <div className="flex justify-start items-center flex-wrap ">
        {products &&
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </div>
      {/* <div className="flex justify-center items-center">
        <img src={ArrowRightBlack} alt="Arrow right" className="w-6 mx-2" />
        <p className="px-5 vazir-very-little">1</p>
        <img src={ArrowLeftBlack} alt="Arrow left" className="w-6 mx-2" />
      </div> */}
    </div>
  );
};
