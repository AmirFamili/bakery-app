import React, { useContext, useEffect, useState } from "react";
import TrashIcon from "../../../images/icons/trash.png";
import AddIcon from "../../../images/icons/add.png";
import MinusIcon from "../../../images/icons/minus.png";
import { GlobalContext } from "../../../context/ContextWrapper";
import axios from "../../../api/axios";

export const CartProduct = ({ product, number }) => {
  const [id, setId] = useState(null);
  const { convertNumberToFarsi, countAll, setCountAll, cart } =
    useContext(GlobalContext);

  useEffect(() => {
    if (product) {
      setId(product.id);
    }
  }, []);

  const CheckCart = async () => {
    if (id) {
      await axios
        .patch(`/order/cart/${cart}/items/${id}/`, {
          quantity: product.quantity + 1,
        })
        .then((response) => {});
    }
  };

  const handlerIncrease = () => {
    CheckCart();
    setCountAll(countAll + 1);
  };
  const handlerDecrease = async () => {
    if (product.quantity > 0) {
      if (product.quantity > 1) {
        if (id) {
          setCountAll(countAll - 1);
          await axios
            .patch(`/order/cart/${cart}/items/${id}/`, {
              quantity: product.quantity - 1,
            })
            .then((response) => {});
        }
      } else if (product.quantity === 1) {
        setCountAll(countAll - 1);
        await axios
          .delete(`/order/cart/${cart}/items/${id}/`)
          .then((response) => {
            window.location.reload();
          });
      }
    }
  };

  const handlerDelete = async () => {
    await axios.delete(`/order/cart/${cart}/items/${id}/`).then((response) => {
      window.location.reload();
    });
  };

  return (
    <tr className="iranyekan-little-light  border-b  text-center">
      <td className="border-l w-10 p-7 max-md:w-5 max-md:p-5">{number + 1}</td>
      <td className="w-64 ">
        <div className="flex justify-start items-center text-gray-400 mr-5">
          <img
            src={product.cake.image}
            alt={product.cake.title}
            className="w-10 h-10 ml-2 rounded-full max-md:w-8  max-md:h-8"
          />
          <p className="">{product.cake.title}</p>
        </div>
      </td>
      <td className="w-52 ">
        {product.cake.pricemodel_set[0].price_with_discount
          ? product.cake.pricemodel_set[0].price_with_discount
          : product.cake.pricemodel_set[0].price_per_unit}{" "}
        تومان
      </td>
      <td className="w-52 ">
        {" "}
        <div className="flex justify-center items-center">
          <button
            onClick={handlerDecrease}
            className="minus rounded-full w-7 bg-primary   max-md:w-5"
          >
            <img src={MinusIcon} alt="minus" />
          </button>
          <p className="w-7 text-center  iranyekan max-md:w-5">
            {convertNumberToFarsi(product.quantity)}
          </p>
          <button
            onClick={handlerIncrease}
            className="bg-primary rounded-full w-7  max-md:w-5"
          >
            <img src={AddIcon} alt="plus" />
          </button>
        </div>
      </td>
      <td className="w-52 ">{product.total_price} تومان</td>
      <td className="w-32 max-sm:hidden">
        <button onClick={handlerDelete}>
          <img src={TrashIcon} alt="trash" className="w-6 m-auto" />
        </button>
      </td>
    </tr>
  );
};
