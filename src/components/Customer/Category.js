import React, { useEffect, useContext, useState } from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import { GlobalContext } from "../../context/ContextWrapper";
import axios from "../../api/axios";

export const Category = () => {
  const { categoryPage, setCategoryPage, navigate } = useContext(GlobalContext);
  const params = useParams();
  const [groupsData, setGroupsData] = useState();
  const [birthdayCake, setBirthdayCake] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    async function getData() {
      await axios
        .get("/bakery/category/", { signal })
        .then((response) => setGroupsData(response.data))
        .catch((err) => console.log(err));
    }
    getData();

    if (params.id) {
      setCategoryPage(params.id.split(":")[1]);
    } else {
      navigate("/");
    }
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <section className="py-6 px-10 pt-28 max-md:px-5 max-lg:mt-0 h-screen max-lg:pt-5 max-md:h-auto">
      <h1 className="py-5 iranyekan-very-bold ">دسته بندی محصولات</h1>
      {categoryPage && (
        <div className="flex border-b pt-3 mb-10 ">
          {groupsData &&
            groupsData.map((group) => (
              <div className="relative" key={group.id}>
                <Link
                  onClick={() =>{ setCategoryPage(`${group.id}`)
                if(group.title==='کیک تولد'){
                  setBirthdayCake(true)
                }else{
                  setBirthdayCake(false)
                }}}
                  to={":" + group.id}
                  className={`ml-12  w-20 text-center  py-3 inline-block max-md:ml-8 max-sm:ml-0 max-md:w-15  ${
                    categoryPage === `${group.id}`
                      ? "vazir-regular-bold text-black"
                      : "vazir-regular text-blue-little-light "
                  }`}
                >
                  {group.title}
                </Link>
                <div
                  className={`absolute w-20  z-10 max-sm:w-4 ${
                    categoryPage === `${group.id}` && "border-bottom"
                  }`}
                ></div>
              </div>
            ))}
        </div>
      )}
      <div className="mt-5">
        <div className={`border rounded-xl px-5 flex justify-between items-center ${birthdayCake?'block':'hidden'}`}>
          <h4 className="iranyekan ">
            شما می توانید کیک مورد نظر را از کیک های موجود انتخاب کنید و یا کیک
            خود را<span className="font-extrabold"> سفارش دهید</span>.
          </h4>
          <Link to="/customer-order">
            <button className=" text-center w-40 m-3  bg-primary text-font-white  rounded-xl shadow-xl py-3  vazir-regular max-xl:w-28 max-lg:w-28 ">
              سفارش کیک
            </button>
          </Link>
        </div>
        <div className="h-dvh hidden max-md:block">
        <Outlet />
        </div>
        <div className=" block max-md:hidden">
        <Outlet />
        </div>
      </div>
    </section>
  );
};
