import React, { useContext } from "react";
import { GlobalContext } from "../../context/ContextWrapper";

export const Order = (order,key) => {
  const { convertNumberToFarsi } = useContext(GlobalContext);
  return (
    <tr key={key} className="iranyekan-little-light  border-b  text-center">
      <td className="border-l w-10 p-7 max-md:w-5 max-md:p-5">1</td>
      <td className="w-64">
        <ul className="list-disc w-2/3  mx-auto pr-5 py-3">
          {order &&
            order.order.items.map((item) => (
          <li key={item.id} className="text-right py-0.5">{item.cake.title} - {item.quantity}</li>
        
            ))}
            
        </ul>
      </td>
      <td className="w-52 "> { order && order.order.payment_status==='P'?<span className="text-orange-300">درحال آماده سازی</span>:''}</td>
      <td className="w-52 ">{convertNumberToFarsi(600.0)}تومان</td>
      <td className="w-52 ">_</td>
      <td className="w-32 max-md:hidden">{convertNumberToFarsi(order && order.order.code)}</td>
      <td className="w-32 max-md:hidden">
        {convertNumberToFarsi(order && order.order.created_at.split("T")[0])}
      </td>
      <td className="my-4 ml-2 hidden max-md:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
      </td>
    </tr>
  );
};
