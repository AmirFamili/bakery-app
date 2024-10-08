import React, { useContext, useEffect, useState } from "react";
import TrashIcon from "../../images/icons/trash.png";
import AddIcon from "../../images/icons/add.png";
import MinusIcon from "../../images/icons/minus.png";
import { GlobalContext } from "../../context/ContextWrapper";
import axios from "../../api/axios";

export const CartCustomizeProduct = ({ product, number }) => {
  const [id, setId] = useState(null);
 const [buttonDisabled, setButtonDisabled] = useState(false);

  const { convertNumberToFarsi, countAll, setCountAll, accessToken } =
    useContext(GlobalContext);

  // useEffect(() => {
  //   for (let i = 0; i < product.cake.pricemodel_set.length; i++) {
  //     if (product.cake.pricemodel_set[i].choice === true) {
  //       setMeasureId(product.cake.pricemodel_set[i].unit_measure_id);
  //       if (product.cake.pricemodel_set[i].price_with_discount) {
  //         setPrice(product.cake.pricemodel_set[i].price_with_discount);
  //       } else {
  //         setPrice(product.cake.pricemodel_set[i].price_per_unit);
  //       }
  //     }
  //   }
  // }, []);

  useEffect(() => {
    if (product) {
      setId(product.id);
    }
  }, []);

  // const CheckCart = async () => {
  //   if (id) {
  //     await axios
  //       .patch(
  //         `/order/items/${id}/`,
  //         {
  //           quantity: product.quantity + 1,
  //           unit_measure: measureId,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         setCountAll(countAll + 1);
  //         setCount(count + 1);
  //       });
  //   }
  // };

  // const handlerIncrease = () => {
  //   CheckCart();
  // };
  // const handlerDecrease = async () => {
  //   if (product.quantity > 0) {
  //     if (product.quantity > product.cake.limitation) {
  //       if (id) {
  //         await axios
  //           .patch(
  //             `/order/items/${id}/`,
  //             {
  //               quantity: product.quantity - 1,
  //               unit_measure: measureId,
  //             },
  //             {
  //               headers: {
  //                 "Content-Type": "application/json",
  //                 Authorization: `Bearer ${accessToken}`,
  //               },
  //             }
  //           )
  //           .then((response) => {
  //             setCountAll(countAll - 1);
  //             setCount(count - 1);
  //           });
  //       }
       
  //     } else if (product.quantity === product.cake.limitation) {
  //       setButtonDisabled(true);
  //       await axios
  //         .delete(`/order/items/${id}/`, {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         })
  //         .then((response) => {
  //           setCountAll(countAll -  product.cake.limitation);
  //           setCount(count -  product.cake.limitation);
  //         });
  //         setTimeout(() => {
  //           setButtonDisabled(false);
  //         }, 3000);
  //     }
  //   }
  // };

  const handlerDelete = async () => {
    setButtonDisabled(true);
    await axios
      .delete(`/profile/customize_cake/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setCountAll(countAll - 1);
      });
      setTimeout(() => {
        setButtonDisabled(false);
      }, 3000);
  };
  
  return (
    <tr className="iranyekan-little-light h-16  border-b  text-center">
      <td className="border-l ">{number + 1}</td>
      <td className="w-64 ">
        <div className="flex justify-start items-center w-full  text-gray-400 mr-5 max-md:mr-1">
          {/* <img
            src={product.cake.image}
            alt={product.cake.title}
            className="w-10 h-10 ml-2 rounded-full max-md:min-w-7  max-md:min-h-7 "
          /> */}
          <p className="text-right">کیک سفارشی</p>
        </div>
      </td>
      <td className="w-52 max-sm:hidden">
      {convertNumberToFarsi(product.total_price)} تومان
        </td>
      <td className="w-52 ">
      {convertNumberToFarsi(1)}
        {/* <div className="flex justify-center items-center">
          <button
            onClick={handlerDecrease}
            disabled={buttonDisabled}
            className="minus rounded-full w-7 bg-primary   max-md:w-4"
          >
            <img src={MinusIcon} alt="minus" />
          </button>
          <p className="w-7 text-center  iranyekan max-md:w-4">
            {convertNumberToFarsi(count)}
          </p>
          <button
            onClick={handlerIncrease}
            className="bg-primary rounded-full w-7  max-md:w-4"
          >
            <img src={AddIcon} alt="plus" />
          </button>
        </div> */}
      </td>
      <td className="w-52 ">{convertNumberToFarsi(product.total_price)} تومان</td>
      <td className="w-32 max-sm:hidden">
        <button onClick={handlerDelete}>
          <img src={TrashIcon} alt="trash" className="w-6 m-auto" />
        </button>
      </td>
    </tr>
  );
};
