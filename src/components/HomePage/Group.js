import React from "react";
import { Link } from "react-router-dom";

export const Group = ({ title, image, id }) => {
  return (
    <Link to={`category/:${id}`} className="text-center mx-auto  group w-44 ">
      <div className="h-40 w-40 mx-auto max-md:w-36 max-md:h-36">
        <img
          src={image}
          alt={title}
          className="w-36 h-36  mx-auto rounded-full shadow-lg group-hover:w-44 group-hover:h-40 max-md:w-28 max-md:h-28 group-hover:max-md:w-32 group-hover:max-md:h-32"
        />
      </div>
      <h3 className="py-4 iranyekan-very-medium ">{title} </h3>
    </Link>
  );
};
