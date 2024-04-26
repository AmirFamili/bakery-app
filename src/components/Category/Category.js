import React, { useEffect, useContext} from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import { GlobalContext } from "../../context/ContextWrapper";


export const Category = () => {
  const { categoryPage, setCategoryPage, categories, navigate } =
    useContext(GlobalContext);
  const params = useParams();

  useEffect(() => {
   
    if (params.id) {
      setCategoryPage(params.id.split(":")[1]);
    } else {
      navigate("/");
    }
    
  }, []);

  return (
    <section className="py-6 px-10 pt-28 max-md:px-5 h-screen max-lg:pt-5 max-md:h-auto max-lg:mt-20">
      <h1 className="py-5 iranyekan-very-bold ">دسته بندی محصولات</h1>
      {categoryPage && (
        <div className="flex border-b pt-3 mb-10 ">
          {categories &&
            categories.map((category) => (
              <div className="relative" key={category.id}>
                <Link
                  onClick={() => {
                    setCategoryPage(`${category.id}`);
                   
                  }}
                  to={":" + category.id}
                  className={`ml-12  w-20 text-center  py-3 inline-block max-md:ml-8 max-sm:ml-0 max-md:w-15  ${
                    categoryPage === `${category.id}`
                      ? "vazir-regular-bold text-black"
                      : "vazir-regular text-blue-little-light "
                  }`}
                >
                  {category.title}
                </Link>
                <div
                  className={`absolute w-20  z-10 max-sm:w-4 ${
                    categoryPage === `${category.id}` && "border-bottom"
                  }`}
                ></div>
              </div>
            ))}
        </div>
      )}
      <div className="mt-5">
    
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
