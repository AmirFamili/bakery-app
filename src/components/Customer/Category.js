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
     }  else{
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

          
        </div>
      )}
      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
};
