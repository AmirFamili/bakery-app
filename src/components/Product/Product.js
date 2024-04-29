import React, { useState, useContext, useEffect } from "react";
import AddIcon from "../../images/icons/add.png";
import MinusIcon from "../../images/icons/minus.png";
import { GlobalContext } from "../../context/ContextWrapper";
import { Popup } from "./Popup";
import axios from "../../api/axios";

export const Product = ({ product }) => {
  const [count, setCount] = useState(0);
  const [id, setId] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const {
  loggedIn,
    convertNumberToFarsi,
    showProductModel,
    setShowProductModel,
    togglePopup,
    products,
    countAll,
    setCountAll,
    accessToken,
    navigate
  } = useContext(GlobalContext);

  useEffect(() => {
    if (products) {
      for (let i = 0; i < products.length; i++) {
        if (products[i].cake.title === product.title) {
          setCount(products[i].quantity);
          setId(products[i].id);
        }
      }
    }
  }, [products]);

  const handlerCheckCount = () => {
    if (count > 0) {
      return "group-hover:block max-md:block";
    }
  };

  const CheckCart = async () => {
    if (count === 0) {
      axios
        .post(
          `/order/items/`,
          {
            cake_id:product.id,
            quantity:1,
            unit_measure:product.pricemodel_set[0].unit_measure_id,
          
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
          console.log(response);
          setId(response.data.id);
          setCountAll(countAll + 1);
        });
    } else if (count >= 1) {
      if (id) {
        await axios
          .patch(
            `/order/items/${id}/`,
            {
              quantity: count + 1,
              unit_measure:product.pricemodel_set[0].unit_measure_id,
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
            console.log(response);
            setCountAll(countAll + 1);
           
          });
      }
    }
  };

  const handlerIncrease = () => {
    if(loggedIn){
       CheckCart();
    }else{
navigate('/login')
    }
   
  
   
  };
  
  const handlerDecrease = async () => {
    if (count > 0) {
      if (count > 1) {
        if (id) {
         
         
          await axios
            .patch(
              `/order/items/${id}/`,
              {
                quantity: count - 1,
                unit_measure:product.pricemodel_set[0].unit_measure_id,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            .then((response) => {
              setCount(count-1);
               setCountAll(countAll - 1);
             });
        }
      } else if (count === 1) {
        setButtonDisabled(true);
        await axios
          .delete(`/order/items/${id}/`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            setCount(count - 1);
            console.log(response);
            setCountAll(countAll - 1);
           
          });
          setTimeout(() => {
            setButtonDisabled(false);
          }, 3000);
      }
    }
  };

  return (
    <div className=" group p-6 ml-5 my-10 w-56 h-64 bg-white shadow-lg rounded-2xl  hover:bg-primary hover:text-white max-md:w-48 max-md:h-52 max-sm:w-36 max-sm:h-44 max-md:p-3">
      <img
        src={product.image}
        alt="cup cake"
        className="-mt-16 w-28 h-28 mx-auto shadow-md rounded-full max-md:w-20 max-md:h-20 max-md:-mt-12"
      />
      <h3 className="iranyekan-bold my-5 max-md:my-4">{product.title} </h3>
      <h4 className=" my-4 iranyekan-very-light   group-hover:text-white max-md:mb-3">
        {product.pricemodel_set.length === 1
          ? "هر " + product.pricemodel_set[0].unit_measure
          : "به صورت اسلایس و کیلویی موجود است"}
        :
      </h4>
      {product.pricemodel_set.length === 1 && (
        <div className="flex justify-between items-center">
          {product.pricemodel_set[0].price_with_discount ? (
            <div>
              {" "}
              <s className="">
                <h5 className="my-1 iranyekan-low-bold ">
                  {convertNumberToFarsi(
                    product.pricemodel_set[0].price_per_unit
                  )}

                  <span className="text-gray-400 group-hover:text-white ">
                    {" "}
                    تومان
                  </span>
                </h5>
              </s>
              <h5 className="my-2 iranyekan-low-bold">
                {convertNumberToFarsi(
                  product.pricemodel_set[0].price_with_discount
                )}
                <span className="text-gray-400  group-hover:text-white">
                  {" "}
                  تومان{" "}
                </span>
              </h5>
            </div>
          ) : (
            <h5 className="my-2 iranyekan-low-bold">
              {convertNumberToFarsi(product.pricemodel_set[0].price_per_unit)}
              <span className="text-gray-400  group-hover:text-white">
                تومان
              </span>
            </h5>
          )}

          <div className="flex">
            <button
              onClick={handlerDecrease}
              disabled={buttonDisabled}
              className={`minus rounded-full w-7 bg-blue-light hidden max-md:w-5 ${handlerCheckCount()} `}
            >
              <img src={MinusIcon} alt="minus" />
            </button>
            <p
              className={` w-7 text-center hidden iranyekan max-md:w-5 ${handlerCheckCount()}`}
            >
              {convertNumberToFarsi(count)}
            </p>
            <button
              onClick={handlerIncrease}
              className="bg-primary rounded-full w-7 group-hover:bg-blue-light max-md:w-5"
            >
              <img src={AddIcon} alt="plus" />
            </button>
          </div>
        </div>
      )}
      {product.pricemodel_set.length !== 1 && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowProductModel(true)}
            className="bg-primary rounded-full w-7 group-hover:bg-blue-light max-md:w-5"
          >
            <img src={AddIcon} alt="plus" />
          </button>
        </div>
      )}
      {product.pricemodel_set.length !== 1 && showProductModel && (
        <Popup onClose={togglePopup} product={product} />
      )}
    </div>
  );
};
