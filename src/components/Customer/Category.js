import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

export const Category = () => {
  const [categoryPage, setCategoryPage] = useState(1);

  useEffect(() => {
    window.location.pathname === "/category"
      ? setCategoryPage(1)
      : window.location.pathname === "/category/birthday-cake"
      ? setCategoryPage(2)
      : window.location.pathname === "/"
      ? setCategoryPage(3)
      : setCategoryPage(4);
  }, []);

  return (
    <div className="py-6 px-10 mt-28 max-md:px-5 max-lg:mt-0 ">
      <h1 className="py-5 iranyekan-very-bold ">دسته بندی محصولات</h1>
      <div className="flex border-b pt-3 mb-10 ">
        <div className="relative">
          <Link
            to=""
            onClick={() => setCategoryPage(1)}
            className={`pl-8 py-3 inline-block max-md:pl-6 max-sm:pl-3 ${
              categoryPage === 1 ? "vazir-regular-bold" : "vazir-regular"
            }`}
          >
            کیک عصرانه
          </Link>
          <div
            className={`absolute z-10  ${
              categoryPage === 1 && "border-bottom"
            }`}
          ></div>
        </div>

        <div className="relative">
          <Link
            onClick={() => setCategoryPage(2)}
            to="birthday-cake"
            className={`px-8 py-3 inline-block max-md:px-6 max-sm:px-3 ${
              categoryPage === 2 ? "vazir-regular-bold" : "vazir-regular"
            }`}
          >
            کیک تولد
          </Link>
          <div
            className={`absolute mr-5 z-10 max-sm:mr-2 ${
              categoryPage === 2 && "border-bottom"
            }`}
          ></div>
        </div>

        <div className="relative">
          <Link
            onClick={() => setCategoryPage(3)}
            to=""
            className={`px-8 py-3 inline-block max-md:px-6 max-sm:px-3 ${
              categoryPage === 3 ? "vazir-regular-bold" : "vazir-regular"
            }`}
          >
            کاپ کیک
          </Link>
          <div
            className={`absolute mr-5 z-10 max-sm:mr-2 ${
              categoryPage === 3 && "border-bottom"
            }`}
          ></div>
        </div>

        <div className="relative">
          <Link
            onClick={() => setCategoryPage(4)}
            to=""
            className={`px-8 py-3 inline-block max-md:px-6 max-sm:px-3 ${
              categoryPage === 4 ? "vazir-regular-bold" : "vazir-regular"
            }`}
          >
            جار کیک
          </Link>
          <div
            className={`absolute mr-5 z-10 max-sm:mr-2 ${
              categoryPage === 4 && "border-bottom"
            }`}
          ></div>
        </div>

        <div className="relative">
          <Link
            onClick={() => setCategoryPage(5)}
            to=""
            className={`px-8 py-3 inline-block max-md:px-6 max-sm:px-3 ${
              categoryPage === 5 ? "vazir-regular-bold" : "vazir-regular"
            }`}
          >
            دونات
          </Link>
          <div
            className={`absolute mr-3 z-10 max-sm:mr-1 ${
              categoryPage === 5 && "border-bottom"
            }`}
          ></div>
        </div>

        <div className="relative">
          <Link
            onClick={() => setCategoryPage(6)}
            to=""
            className={`px-8 py-3 inline-block max-md:px-6 max-sm:px-3 ${
              categoryPage === 6 ? "vazir-regular-bold" : "vazir-regular"
            }`}
          >
            متفرقه
          </Link>
          <div
            className={`absolute mr-3 z-10 max-sm:mr-1 ${
              categoryPage === 6 && "border-bottom"
            }`}
          ></div>
        </div>
      </div>
      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
};
