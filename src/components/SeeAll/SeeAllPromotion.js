import React, { useEffect, useState } from "react";
import { Product } from "../Product/Product";
import BackIcon from "../../images/icons/arrow-right.png";
import { Link, useParams } from "react-router-dom";
import axios from "../../api/axios";
import Loading from "../../images/icons/loading.gif";
import NoProducts from "../../images/icons/no_products.webp";

export const SeeAllPromotion = () => {
  const [productPromotion, setProductPromotion] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `/bakery/promotion/${params.id.split(":")[1]}`
          ); 
           setProductPromotion(response.data);
          setLoading(false);
        
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  },[]);
  return (
    <div className="pt-32 min-h-screen ">
      <Link
        to="/"
        className="flex justify-start items-center iranyekan-font text-lg text"
      >
        <img src={BackIcon} alt="back" className="w-6 m-6 ml-3" /> بازگشت
      </Link>
      {loading ? (
        <div className=" w-full h-screen ">
          <div className="flex justify-center items-center ">
            <img src={Loading} alt="loading" className="w-10 mt-36 " />
          </div>
        </div>
      ) :!productPromotion.length? (
        <div className=" w-full  ">
          <div className="flex justify-center items-center   ">
            <div className="">
              <img src={NoProducts} alt="no products" className=" " />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5 max-md:p-1">
        <div className="flex justify-start items-center flex-wrap ">
          {productPromotion &&
            productPromotion.map((product) => <Product key={product.id} product={product} />)}
        </div>
      </div>
      )}
     
    </div>
  );
};
