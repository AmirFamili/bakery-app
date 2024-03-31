import React, { useEffect, useContext, useState } from "react";
import { Outlet, Link, useParams,useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/ContextWrapper";
import axios from "../../api/axios";

export const Category = () => {
  const { categoryPage, setCategoryPage } = useContext(GlobalContext);
  const params = useParams();
  const navigate = useNavigate();
  const [groupsData, setGroupsData] = useState();

  useEffect(() => {
    async function getData() {
      await axios
        .get("/bakery/category/")
        .then((response) => setGroupsData(response.data));
    }
    getData();
    if(params.id){
       setCategoryPage(params.id.split(":")[1]);
    }else{
      navigate("/");
    }
   
  }, []);

  return (
    <div className="py-6 px-10 pt-28 max-md:px-5 max-lg:mt-0 h-screen max-lg:pt-5">
      <h1 className="py-5 iranyekan-very-bold ">دسته بندی محصولات</h1>
      {categoryPage && (
        <div className="flex border-b pt-3 mb-10 ">
          {groupsData &&
            groupsData.map((group) => (
              <div className="relative"  key={group.id}>
            <Link
           
              onClick={() => setCategoryPage(`${group.id}`)}
              to={':'+group.id}
              className={`ml-12  w-20 text-center py-3 inline-block max-md:ml-8 max-sm:ml-4 max-md:w-14 ${
                categoryPage === `${group.id}` ? "vazir-regular-bold text-black" : "vazir-regular text-blue-little-light "
              }`}
            >
            {group.title}
           
            </Link>
            <div
              className={`absolute w-20  z-10 max-sm:w-10 ${
                categoryPage === `${group.id}` && "border-bottom"
              }`}
            ></div>
          </div>
            ))}

          {/* <div className="relative">
            <Link
              to=":1"
              onClick={() => setCategoryPage(1)}
              className={`pl-8 py-3 inline-block max-md:pl-6 max-sm:pl-3 ${
                categoryPage === "1" ? "vazir-regular-bold" : "vazir-regular"
              }`}
            >
              کیک عصرانه
            </Link>
            <div
              className={`absolute z-10  ${
                categoryPage === "1" && "border-bottom"
              }`}
            ></div>
          </div>

          <div className="relative">
            <Link
              onClick={() => {
                setCategoryPage(2);
              }}
              to=":2"
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
              to=":3"
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
              to=":4"
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
              to=":5"
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
              to=":6"
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
          </div> */}
        </div>
      )}
      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
};
