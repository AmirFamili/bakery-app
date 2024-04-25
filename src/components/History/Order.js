import React, { useContext } from "react";
import { GlobalContext } from "../../context/ContextWrapper";
import GroupPointIcon from "../../images/icons/group-point.png";

export const Order = ({ order, index }) => {

  const { convertNumberToFarsi } = useContext(GlobalContext);
  return (
    <tr className=" iranyekan-little-light  border-b  text-center">
      <td className="border-l w-10 p-7 max-md:w-5 max-md:p-5">{index + 1}</td>
      <td className="w-64">
        <ul className="list-disc w-3/4  mx-auto pr-5 py-3 max-md:w-full">
          {order &&
            order.items.map((item) => (
              <li key={item.id} className="text-right py-0.5">
                {item.cake.title} - {convertNumberToFarsi(item.quantity)}{" "}
                {item.cake.unit_measure}
              </li>
            ))}
        </ul>
      </td>
      <td className="w-52 ">
        {" "}
        {order && order.payment_status === "P" ? (
          <span className="text-orange-300">درحال آماده سازی</span>
        ) : order.payment_status === "C" ? (
          <span className="text-green-600"> آماده </span>
        ) : order.payment_status === "R" ? (
          <span className=""> تحویل </span>
        ) : (
          order.payment_status === "O" && (
            <span className="text-orange-300"> معلق </span>
          )
        )}
      </td>
      <td className="w-52 ">
        {convertNumberToFarsi(order && order.total_paid)} تومان
      </td>
      <td className="w-52">
        {order && order.rest_pay === "0"
          ? "-"
          : convertNumberToFarsi(order && order.rest_pay)}
      </td>
      <td className="w-32 max-md:hidden">
        {convertNumberToFarsi(order && order.code)}
      </td>
      <td className="w-32 max-md:hidden">
        {convertNumberToFarsi(order && order.created_at.split("T")[0])}
      </td>
      <td className=" p-2 w-10  hidden max-md:table-cell 	">
        <img src={GroupPointIcon} className="mt-1 mx-1" />
      </td>
    </tr>
  );
};
