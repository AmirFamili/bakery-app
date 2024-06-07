import React, { useContext } from "react";
import { GlobalContext } from "../../context/ContextWrapper";
import GroupPointIcon from "../../images/icons/group-point.png";

export const Order = ({ order, index }) => {

  const { convertNumberToFarsi,setShowSituation } = useContext(GlobalContext);
  return (
    
    <tr onClick={()=>setShowSituation(true)} className="cursor-pointer iranyekan-little-light  border-b  text-center">
      <td className="border-l w-10 py-5 px-3 max-md:w-5 max-md:p-3">{index + 1}</td>
      <td className="w-64 max-lg:w-80">
        <ul className="list-disc w-3/4  mx-auto pr-5 py-3 max-md:w-full  ">
          {order &&
            order.items.map((item) => (
              <li key={item.id} className="text-right py-0.5 ">
                {item.cake? item.cake.title:'کیک سفارشی'} - {convertNumberToFarsi(item.quantity)}{" "}
                {item.cake?item.cake.unit_measure:'عدد'}
              </li>
            ))}
        </ul>
      </td>
      <td className="w-52 ">
        {" "}
        {order && order.rest_pay === "0"?order && order.payment_status === "P" ? (
          <span className="text-orange-300">درحال آماده سازی</span>
        ) : order.payment_status === "C" ? (
          <span className="text-green-600"> آماده </span>
        ) : order.payment_status === "R" ? (
          <span className=""> تحویل </span>
        ) : order.payment_status === "A" ? (
          <span className="">ثبت شده </span>
        ): (
          order.payment_status === "O" && (
            <span className="text-orange-300"> درحال بررسی پرداخت</span>
          )
        ):<button  className="iranyekan-low-bold  my-4 mx-5 bg-primary text-font-white rounded-xl shadow-lg py-2 px-7"
        >تسویه حساب</button>}
      </td>
      <td className="w-52 ">
        {convertNumberToFarsi(order && order.total_paid)} تومان
      </td>
      <td className="w-52">
        {order && order.rest_pay === "0"
          ? "-"
          : `${convertNumberToFarsi(order && order.rest_pay)} تومان`}
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
