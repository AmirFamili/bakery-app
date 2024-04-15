import React, { useContext } from "react";
import { GlobalContext } from "../../context/ContextWrapper";

export const Order = (order) => {
  const { convertNumberToFarsi } = useContext(GlobalContext);

  return (
    <tr className="iranyekan-little-light  border-b  text-center">
      <td className="border-l w-10 p-7 max-md:w-5 max-md:p-5">1</td>
      <td className="w-64 ">
        <ul>
          <li>کیک هویج - 1 عدد</li>
          <li>کیک تولد - 2 کیلو</li>
        </ul>
      </td>
      <td className="w-52 ">درحال آماده سازی</td>
      <td className="w-52 ">{convertNumberToFarsi(600.000) }تومان</td>
      <td className="w-52 ">_</td>
      <td className="w-32 max-md:hidden">{convertNumberToFarsi(74589)}</td>
      <td className="w-32 max-md:hidden">1402/10/19</td>
      <td className="my-4 ml-2 hidden max-md:block">
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
       
      </td>
    </tr>
  );
};
