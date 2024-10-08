import React, { useEffect, useState, useContext } from "react";
import CakeImg from "../../images/assortment-pieces-cake.png";
import ArrowLeftICon from "../../images/icons/arrow-circle-left.png";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { GlobalContext } from "../../context/ContextWrapper";

export const Hero = () => {
  const [images, setImages] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { info, loggedIn, navigate } = useContext(GlobalContext);

  const checkedLoggedIn = () => {
    if (loggedIn) {
      navigate("/customer-order");
    } else {
      navigate("/login");
    }
  };

  const second = 10000;
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    async function getImages() {
      await axios
        .get("/bakery/promotion/", { signal })
        .then((response) => setImages(response.data))
        .catch((err) => console.log(err));
    }
    getImages();
    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    
    if(images && images.length>1){
    const intervalId = setInterval(() => {
         images && currentImageIndex === images.length - 1
        ? setCurrentImageIndex(0)
        : setCurrentImageIndex(currentImageIndex + 1);
    }, second);
    return () => clearInterval(intervalId);
  }
   
  }, [currentImageIndex]);

  return (
    <section className="hero bg-hero mt-28 flex p-5 pb-20 relative max-lg:mt-20 max-sm:px-3">
      <div className="px-1 w-9/12 max-xl:w-full ">
        <img
          src={CakeImg}
          alt="assortment-pieces-cake"
          className=" w-full h-86 rounded-3xl "
        />
        <div className="absolute top-20 right-16 z-10  max-xl:top-14  max-md:top-12 max-sm:top-8 max-sm:right-10">
          <h1 className="vazir-very-bold text-primary ">
            {info && info.website}
          </h1>
          <h3 className=" mt-5 mb-4 vazir-bold  text-primary max-xl:mt-4 max-md:mb-3 max-sm:mb-2 max-md:mt-2">
            {info && info.title}
          </h3>
          <h4 className="vazir-light text-primary ">
            {info && info.explanation}
          </h4>

          <h5 className="mt-10 max-md:mt-5 ">
         
            <span
              onClick={checkedLoggedIn}
              className=" bg-primary cursor-pointer text-font-white rounded-xl shadow-lg py-2 px-9  vazir-regular max-sm:px-3  max-sm:py-1.5 "
            >
              کیک خودتو بساز
            </span>
          </h5>
        </div>
      </div>
      <div className="px-1 relative max-sm:px-0 w-3/12 overflow-hidden rounded-3xl max-xl:hidden">
        <img
          src={images && images[currentImageIndex].image}
          alt={images && images[currentImageIndex].description}
          className="absolute bottom-0 left-0 object-cover shadow-lg "
        />
        <div className="dark absolute bottom-0 left-0 w-full h-full  opacity-50 roundedb-3xl"></div>
        <div className="absolute bottom-5 w-full z-10 text-font-white text-center max-md:bottom-3">
          <h5 className="vazir-medium  ">
            {images && images[currentImageIndex].discount}%
            {images && images[currentImageIndex].description}
          </h5>

          <Link
            to="#"
            className="flex justify-center items-center cursor-pointer mt-3 max-md:mt-1"
          >
            <p className=" vazir-regular ">مشاهده</p>
            <img
              src={ArrowLeftICon}
              alt="arrow-circle-left"
              className="w-5 mr-2 max-md:w-4 max-sm:w-3"
            />
          </Link>

          <div
            dir="ltr"
            className="flex justify-center items-center mt-2 max-md:mt-1 "
          >
            {images &&
              images.length !== 1 &&
              images.map((image, idx) => (
                <div
                  key={image.description}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`border border-white w-2 h-2 rounded-full m-1 max-md:h-1 max-md:w-1  ${
                    currentImageIndex === idx && "bg-white"
                  }`}
                ></div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
