import React,{useState,useContext} from "react";
import CupCake from "../../images/cup-cake.png";
import AddIcon from "../../images/icons/add.png";
import MinusIcon from "../../images/icons/minus.png";
import { GlobalContext } from "../../context/ContextWrapper";

export const DiscountProduct = () => {
  const [count, setCount] = useState(0);

  const { cart, setCart,convertNumberToFarsi } = useContext(GlobalContext);

  const handlerCheckCount = () => {
if (count > 0) {
      return 'group-hover:block';
    }
  };
 

  const handlerIncrease = () => {
    setCart(cart+1)
    setCount(count + 1);
  };

  const handlerDecrease = () => {
    if (count > 0) {
      setCart(cart-1)
      setCount(count - 1);
    }
  };

  return (
   
      <div className="group p-6 ml-5 my-5 w-56  bg-white shadow-lg rounded-2xl text-primary hover:bg-primary hover:text-white">
        <img
          src={CupCake}
          alt="cup cake"
          className="-mt-16 w-28 mx-auto shadow-md rounded-full"
        />
        <h3 className="iranyekan-bold my-5 ">کاپ کیک کدوحلوایی</h3>
        <h4 className=" mt-4 iranyekan-very-light group-hover:text-white  ">هر اسلایس:</h4>
        <div className="flex justify-between items-center">
          <div className="">
           <s className=""> <h5 className="my-1 iranyekan-low-bold ">
              ۱۲.۰۰۰ <span className="text-gray-400 group-hover:text-white ">تومان</span>
            </h5></s>
            <h5 className="my-1 iranyekan-low-bold">
              ۱۲.۰۰۰ <span className="text-gray-400 group-hover:text-white ">تومان</span>
            </h5>
          </div>

          <div className="flex">
          <button
            onClick={handlerDecrease}
            className={`minus rounded-full w-7 bg-blue-light hidden max-md:w-6  ${handlerCheckCount()} `}
          >
            <img src={MinusIcon} alt="minus" />
          </button>
          <p className={`px-3 hidden iranyekan ${handlerCheckCount()}`}>{convertNumberToFarsi(count)}</p>
          <button
            onClick={handlerIncrease}
            className="bg-primary rounded-full w-7 group-hover:bg-blue-light max-md:w-6"
          >
            <img src={AddIcon} alt="plus" />
          </button>
        </div>
        </div>
      </div>

  );
};
