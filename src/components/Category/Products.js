import React, { useEffect, useState, useContext } from "react";
import { Product } from "../Product/Product";
import Loading from "../../images/icons/loading.gif";
import NoProducts from "../../images/icons/no_products.webp";
import ArrowLeftBlack from "../../images/icons/arrow-circle-left-black.png";
import ArrowRightBlack from "../../images/icons/arrow-circle-right-gray.png";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context/ContextWrapper";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const { categoryPage } = useContext(GlobalContext);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);
    async function getData() {
      await axios
        .get(`/bakery/category/${params.id.split(":")[1]}`, { signal })
        .then((response) => {
          setLoading(false);
          setProducts(response.data);
        })
        .catch((err) => console.log(err));
    }

    getData();
    return () => {
      abortController.abort();
    };
  }, [categoryPage]);

  if (loading) {
    return (
      <div className=" w-full h-screen ">
        {" "}
        <div className="flex justify-center items-center ">
          <img src={Loading} alt="loading" className="w-10 mt-36 " />
        </div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className=" w-full  ">
        {" "}
        <div className="flex justify-center items-center   ">
          <div className="">
            {/* <h2 className="vazir-medium text-center">محصولی یافت نشد</h2> */}
            <img src={NoProducts} alt="no products" className=" " />{" "}
          </div>
        </div>
      </div>
    );
  }

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
