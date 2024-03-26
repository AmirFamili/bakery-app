import React from 'react';
import { Link } from "react-router-dom";
export const Group = ({group,image}) => {
  return (
    <Link to='#' className='text-center mx-auto  group w-44 '>
      <div className="h-40 w-40 mx-auto">
        <img src={image} alt={group} className='w-36  mx-auto rounded-full shadow-lg group-hover:w-44  max-md:w-32 group-hover:max-md:w-36 ' />
        </div>
        <h3 className="py-4 iranyekan-very-medium">{group} </h3>
         
    </Link>
  )
}
