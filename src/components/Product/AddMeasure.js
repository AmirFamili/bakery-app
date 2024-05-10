import React, { useState, useContext, useEffect } from "react";
import AddIcon from "../../images/icons/add.png";
import MinusIcon from "../../images/icons/minus.png";
import { GlobalContext } from "../../context/ContextWrapper";
import axios from "../../api/axios";

export const AddMeasure = ({ measure, product }) => {
  const [count, setCount] = useState(0);
  const [id, setId] = useState(null);

  const {
    convertNumberToFarsi,
    activeMeasure,
    setActiveMeasure,
    accessToken,
    products,
    countAll,
    setCountAll,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (products) {
      for (let i = 0; i < products.length; i++) {
        if (products[i].cake.title === product.title) {
         
          for (let y = 0; y < products[i].cake.pricemodel_set.length; y++) {
            if (
              products[i].cake.pricemodel_set[y].unit_measure_id ===
              measure.unit_measure_id
            ) {
              if (products[i].cake.pricemodel_set[y].choice === true) {
                setActiveMeasure(measure.unit_measure_id);
                setCount(products[i].quantity);
                setId(products[i].id);
              }
            }
          }
        }
      }
    }
  }, [products,activeMeasure]);

  const handleChange = (event) => {
    setActiveMeasure(event.target.value);
  };

  const handlerCheckCount = () => {
    if (count > 0) {
      return "group-hover:block";
    }
  };

  const CheckCart = async () => {
    if (count === 0) {
      axios
        .post(
          `/order/items/`,
          {
            cake_id: product.id,
            quantity: product.limitation,
            unit_measure: measure.unit_measure_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          setCount(count + product.limitation);
          setId(response.data.id);
          setCountAll(countAll + product.limitation);
        });
    } else if (count >= product.limitation) {
      if (id) {
        await axios
          .patch(
            `/order/items/${id}/`,
            {
              quantity: count + 1,
              unit_measure: measure.unit_measure_id,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            setCount(count + 1);
            setCountAll(countAll + 1);
          });
      }
    }
  };
  const handlerIncrease = () => {
    CheckCart();

    
  };

  const handlerDecrease = async () => {
    if (count > 0) {
      if (count >  product.limitation) {
        if (id) {
          setCount(count - 1);
          await axios
            .patch(
              `/order/items/${id}/`,
              {
                quantity: count - 1,
                unit_measure: measure.unit_measure_id,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            .then((response) => {
              setCountAll(countAll - 1);
            });
        }
      } else if (count ===  product.limitation) {
        setCount(count -  product.limitation);
        await axios
          .delete(`/order/items/${id}/`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            console.log(response);
            setCountAll(countAll -  product.limitation);
          });
      }
    }
  };

  useEffect(() => {
    Number(activeMeasure) !== measure.unit_measure_id && setCount(0);
  }, [activeMeasure]);

  return (
    <div key={measure.unit_measure_id} className="flex justify-between mt-5 ">
      <div className="flex">
        <input
          onChange={handleChange}
          checked={Number(activeMeasure) === measure.unit_measure_id}
          type="radio"
          name="price"
          value={measure.unit_measure_id}
          className=" accent-primary"
        />
        <div className="flex iranyekan-very-light-white mt-1">
          <p className="pr-2 w-10">{measure.unit_measure}</p>
          {measure.price_with_discount ? (
            <div className="flex">
              {" "}
              <s>
                <span className="pr-10"> {measure.price_per_unit} تومان</span>
              </s>
              <span className="pr-10">
                {" "}
                {measure.price_with_discount} تومان
              </span>
            </div>
          ) : (
            <span className="pr-10"> {measure.price_per_unit} تومان</span>
          )}
        </div>
      </div>

      <div className="flex">
        <button
          onClick={handlerDecrease}
          className={`minus rounded-full w-7 bg-primary hidden max-md:w-6 ${handlerCheckCount()} `}
        >
          <img src={MinusIcon} alt="minus" />
        </button>

        <p className={`px-2 w-7  iranyekan  hidden ${handlerCheckCount()} `}>
          {convertNumberToFarsi(count)}
        </p>

        <button
          disabled={
            Number(activeMeasure) === measure.unit_measure_id ? false : true
          }
          onClick={handlerIncrease}
          className="bg-primary rounded-full w-7  max-md:w-6"
        >
          <img src={AddIcon} alt="plus" />
        </button>
      </div>
    </div>
  );
};
