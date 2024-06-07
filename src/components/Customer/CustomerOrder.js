import React, { useState, useContext, useEffect,useRef } from "react";
import UploadIcon from "../../images/icons/document-upload.png";
import ArrowLeftIcon from "../../images/icons/arrow-left.png";
import AddIcon from "../../images/icons/add.png";
import SuccessIcon from "../../images/icons/success.png";
import { GlobalContext } from "../../context/ContextWrapper";
import axios from "../../api/axios";
import { useForm, } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const CustomerOrder = () => {
  const { convertNumberToFarsi, dispatchCalCart, accessToken,navigate,countAll, setCountAll,  } =
    useContext(GlobalContext);

  const [birthDayStep, setBirthDayStep] = useState(1);
  const [showSuccess, setShowSucccess] = useState(false);
  const [fileName, setFileName] = useState("");
  const [showCovers, setShowCovers] = useState(null);
  const [showFilling, setShowFilling] = useState(null);
  const [showTaste, setShowTaste] = useState(null);
  const [showWeight, setShowWeight] = useState(null);

const [priceWeight,setPriceWeight]=useState(0);
const [priceFilling,setPriceFilling]=useState(0);
const [priceCover,setPriceCover]=useState(0);
const [priceTaste,setPriceTaste]=useState(0);

  const [totalPrice,  setTotalPrice] = useState(0);

  const goBackBox = () => {
    setTimeout(() => {
      setShowSucccess(false);
    }, 5000);
  };

  useEffect(() => {
    if (accessToken) {
      const getData = async () => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        await axios
          .get(
            `/profile/cake_cover/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            },
            { signal }
          )
          .then((response) => {
            setShowCovers(response.data);
          })
          .catch((err) => console.log(err));

        await axios
          .get(
            `/profile/cake_filling/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            },
            { signal }
          )
          .then((response) => {
            setShowFilling(response.data);
         })
          .catch((err) => console.log(err));

        await axios
          .get(
            `/profile/cake_taste/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            },
            { signal }
          )
          .then((response) => {
            setShowTaste(response.data);
          })
          .catch((err) => console.log(err));

        await axios
          .get(
            `/profile/cake_weight/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            },
            { signal }
          )
          .then((response) => {
            setShowWeight(response.data);
           
          })
          .catch((err) => console.log(err));

        return () => {
          abortController.abort();
        };
      };
      getData();
    }
  }, [accessToken]);

  const validationSchema = Yup.object().shape({
    weight: Yup.string().required("لطفا این قسمت را خالی نگذارید."),
    filling: Yup.array().of(Yup.string()).min(1,"لطفا این قسمت را خالی نگذارید."),
    cover: Yup.string().required("لطفا این قسمت را خالی نگذارید."),
    taste: Yup.string().required("لطفا این قسمت را خالی نگذارید."),
    explanation:Yup.string().required("لطفا این قسمت را خالی نگذارید."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    reset,
  } = useForm({ resolver: yupResolver(validationSchema) });



  const onSubmit = async (values) => {
    
    axios
      .post(
        "/profile/customize_cake/",
        {
          weight: values.weight,
          filling: values.filling,
          cover: values.cover,
          taste: values.taste,
          // image: values.image,
          explanation: values.explanation,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setCountAll(countAll+1)
        navigate('/cart');
      })
      .catch((error) => {
        console.error(error);
        setBirthDayStep(2);
      });
  };

  const handleCheckboxChangeFilling = (event) => {
    const priceValue = parseFloat(event.target.getAttribute('data-price'));
    setPriceFilling((prevTotal) =>
      event.target.checked ? prevTotal + priceValue : prevTotal - priceValue
    );
  };


  const handleRadioChangeCover = (event) => {
    const priceValue = parseFloat(event.target.getAttribute('data-price'));
    setPriceCover(priceValue);
  };
  const handleRadioChangeTaste = (event) => {
    const priceValue = parseFloat(event.target.getAttribute('data-price'));
    setPriceTaste(priceValue);
  };
  
  const handleDropdownChangeWeight = (event) => {
    const selectedOption =showWeight && showWeight.find(weight => weight.id === parseInt(event.target.value));
    if (selectedOption) {
      setPriceWeight(selectedOption.price);
    } 
  };
  
  useEffect(()=>{
    setTotalPrice(priceFilling+priceCover+priceTaste+priceWeight)
  },[priceFilling,priceCover,priceTaste,priceWeight])


  return (
    <section className="py-6 px-10 pt-48 max-md:px-5 max-lg:mt-0  max-lg:pt-36 relative overflow-hidden">
      <div className="flex justify-center px-5 border  rounded-2xl max-md:block">
        <div className="w-2/3 py-5 border-l max-md:border-0 max-md:w-full">
          <div className="w-1/2 py-2 max-md:w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="pl-10">
                <div className=" mb-8 px-2 border rounded-xl bg-gray-main ">
                  <select
                    {...register("weight")}
                    disabled={birthDayStep === 2 && true}
                    name="weight"
                    defaultValue=''
                    onChange={handleDropdownChangeWeight}
                    className={` outline-none w-full p-2 cursor-pointer  bg-gray-main iranyekan-little-light text-gray-400 ${
                      birthDayStep === 2 && "opacity-50"
                    }`}
                  >
                    <option value='' disabled>وزن کیک</option>
                    {showWeight &&
                      showWeight.map((weight) => (
                        <option
                          key={weight.id}
                          value={weight.id}
                          data-price={weight.price}
                         
                        >
                          {weight.int}
                        </option>
                      ))}
                  </select>
                </div>
                {errors.weight && (
                  <span className="error text-red-600 iranyekan-very-light-white">
                    {errors.weight.message}
                  </span>
                )}
              </div>

              <div>
                <h3 className="iranyekan-little-light mb-3 ">فیلینگ:</h3>
                <div className="flex justify-between items-start flex-wrap">
                  {showFilling &&
                    showFilling.map((filling) => (
                      <label
                        key={filling.id}
                        className={`flex w-32  my-2 ${
                          birthDayStep === 2 && "opacity-50 text-gray-400 "
                        }`}
                      >
                        
                        <input
                          {...register("filling")}
                          disabled={birthDayStep === 2 && true}
                          type="checkbox"
                          name="filling"
                          data-price={filling.price}
                          onChange={handleCheckboxChangeFilling}
                          value={filling.id}
                          className="checkbox text-gray-200 border w-3.5 h-3.5 rounded checked:bg-secondry checked:border-none   border-gray-500 "
                        />
                        <p className="iranyekan-very-light-white pr-2 ">
                          {filling.name}
                        </p>
                      </label>
                    ))}
                </div>
                {errors.filling && (
                  <span className="error text-red-600 iranyekan-very-light-white">
                    {errors.filling.message}
                  </span>
                )}
              </div>

              <div>
                <h3 className="iranyekan-little-light mb-3 mt-5">روکش:</h3>
                <div className="flex  items-start flex-wrap   ">
                  {showCovers &&
                    showCovers.map((cover) => (
                      <div
                        key={cover.id}
                        className={`flex w-32  my-2 ${
                          birthDayStep === 2 && "opacity-50 text-gray-400"
                        }`}
                      >
                        <input
                          {...register("cover")}
                          disabled={birthDayStep === 2 && true}
                          key={cover.id}
                          type="radio"
                          name="cover"
                          data-price={cover.price}
                          onChange={handleRadioChangeCover}
                          value={cover.id}
                          className="checkbox text-gray-200 border  w-3.5 h-3.5 rounded checked:bg-secondry checked:border-none  border-gray-500 "
                        />
                        <p className="iranyekan-very-light-white pr-2">
                          {cover.name}
                        </p>
                      </div>
                    ))}

                  {errors.cover && (
                    <span className="error text-red-600 iranyekan-very-light-white">
                      {errors.cover.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="iranyekan-little-light mb-3 mt-5">مزه کیک:</h3>
                <div className="flex  items-start flex-wrap   ">
                  {showTaste &&
                    showTaste.map((taste) => (
                      <div
                        key={taste.id}
                        className={`flex w-32  my-2 ${
                          birthDayStep === 2 && "opacity-50 text-gray-400"
                        }`}
                      >
                        <input
                          {...register("taste")}
                          disabled={birthDayStep === 2 && true}
                          key={taste.id}
                          type="radio"
                          name="taste"
                          data-price={taste.price}
                          onChange={handleRadioChangeTaste}
                          value={taste.id}
                          className="checkbox text-gray-200 border  w-3.5 h-3.5 rounded checked:bg-secondry checked:border-none  border-gray-500 "
                        />
                        <p className="iranyekan-very-light-white pr-2">
                          {taste.name}
                        </p>
                      </div>
                    ))}

                  {errors.taste && (
                    <span className="error text-red-600 iranyekan-very-light-white">
                      {errors.taste.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="pl-10 ">
                <label
                  className={` text-center border border-dashed block rounded-xl mt-5 p-4 iranyekan-very-light ${
                    birthDayStep === 2 && "opacity-50"
                  }`}
                >
                  ایده کیک خود را درصورت نیاز اپلود کنید.
                  {/* <input
                        disabled={birthDayStep === 2 && true}
                        type="file"
                        name="image"
                        accept=".jpg, .jpeg, .png, .gif"
                        className="hidden"
                        onChange={(event) => {
                          const file = event.target.files[0];
                          setFieldValue("image", file);
                          setFileName(file.name);
                        }}
                      /> */}
                  <span className="flex flex-col justify-center items-center cursor-pointer">
                    <img className="m-2 w-5" src={UploadIcon} />
                    {fileName}
                  </span>
                </label>
              </div>

              <div className="pl-10 ">
                <textarea
                  {...register("explanation")}
                  disabled={birthDayStep === 2 && true}
                  name="explanation"
                  cols="30"
                  rows="3"
                  placeholder="توضیحات..."
                  className={`outline-none w-full p-3 border rounded-xl bg-gray-main mt-5 vazir-very-little ${
                    birthDayStep === 2 && "opacity-50"
                  }`}
                ></textarea>
                {errors.explanation && (
                  <span className="error text-red-600 iranyekan-very-light-white">
                    {errors.explanation.message}
                  </span>
                )}
              </div>

              {birthDayStep === 1 && (
                <button
                  type="submit"
                  className="z-10 flex absolute bottom-5 left-24 max-md:left-5 my-4 mx-5 bg-primary text-font-white rounded-xl shadow-xl py-3 px-3 vazir-regular "
                >
                   افزودن به سبد خرید
                  <img
                    src={ArrowLeftIcon}
                    alt=" Arrow Left"
                    className="w-6 mr-3 max-md:hidden"
                  />
                </button>
              )}
            </form>
          </div>
        </div>

        <div className="w-1/3 p-5 relative max-md:w-1/2 max-md:pr-2">
          {/* {birthDayStep === 1 && (
            <div className="mt-3">
              <h3 className="iranyekan-little-light"> نحوه تحویل سفارش:</h3>
              {delivery &&
            delivery.map((delivey) => (
              <div key={delivey.id} className="flex mt-5 z-30">
                <input
                  type="radio"
                  checked={selectedDelivery === delivey.id}
                  onChange={() => setSelectedDelivery(delivey.id)}
                  name="price"
                  className=" accent-primary"
                />

                <p className="pr-2 iranyekan-very-light-white">
                  {delivey.name} _{" "}
                  <span className="iranyekan-very-light-small">
                    هزینه ارسال{" "}
                    {delivey.cost === 0
                      ? "رایگان"
                      : convertNumberToFarsi(delivey.cost)}{" "}
                  </span>
                </p>
              </div>
            ))}
            </div>
          )} */}
          <div className="flex justify-between items-center mt-7">
            {" "}
            <h3 className="iranyekan-little-light "> قیمت:</h3>
            <h3 className="iranyekan-little-light">
              {convertNumberToFarsi(totalPrice)} تومان
            </h3>
          </div>

          {/*               
          {birthDayStep === 2 && (
            <div className="mt-3">
              <div className="flex justify-between items-center">
                {" "}
                <h3 className="iranyekan-little-light"> مبلغ نهایی کیک:</h3>
                <h3 className="iranyekan-little-light">
                  {convertNumberToFarsi(530000)} تومان
                </h3>
              </div>

              <div className="flex justify-between items-center mt-7">
                {" "}
                <h3 className="iranyekan-little-light "> هزینه ارسال:</h3>
                <h3 className="iranyekan-little-light">
                  {convertNumberToFarsi(40000)} تومان
                </h3>
              </div>

              <div className="flex justify-between items-center mt-7">
                {" "}
                <h3 className="iranyekan-little-light "> مبلغ قابل پرداخت:</h3>
                <h3 className="iranyekan-little-light">
                  {convertNumberToFarsi(5700000)} تومان
                </h3>
              </div>
              <div className="border-t my-7"></div>
              <h3 className="iranyekan-very-light-white text-font-green">
                *1/2 مبلغ نهایی دریافت می شود، مابقی نیز هنگام تحویل سفارش
                پرداخت می شود.
              </h3>

              <div className="flex justify-between items-center mt-7 iranyekan">
                {" "}
                <h3> قابل پرداخت اولیه:</h3>
                <h3>{convertNumberToFarsi(230000)} تومان</h3>
              </div>
            </div>
          )} */}

          {/* <div className="absolute bottom-5 right-2 flex  ">
            {birthDayStep === 2 && (
              <button
                onClick={() => birthDayStep === 2 && setBirthDayStep(1)}
                className="w-48 text-center  my-6 mx-3 bg-blue-very-light  rounded-xl shadow-xl py-3  vazir-regular "
              >
                مرحله قبل
              </button>
            )}

            {birthDayStep === 2 && (
              <button
                onClick={() => {
                  const birthDayCake = JSON.parse(
                    localStorage.getItem("birthDayCake")
                  );
                  dispatchCalCart({ type: "add", payload: birthDayCake });
                  localStorage.removeItem("birthDayCake");
                  setShowSucccess(true);
                }}
                className=" text-center w-48 flex my-6 bg-primary text-font-white  rounded-xl shadow-xl py-3  vazir-regular "
              >
                <img src={AddIcon} alt=" Arrow Left" className="w-6 mx-2" />
                افزودن به سبد خرید
              </button>
            )}
          </div> */}
        </div>
      </div>
      <div
        className={`absolute bottom-16  transition  flex justify-center items-center p-4 bg-white rounded-2xl shadow-lg border iranyekan ${
          showSuccess
            ? "-translate-x-full mr-20 delay-75"
            : " translate-x-full -right-1/2"
        } ${goBackBox()}`}
      >
        <img src={SuccessIcon} alt="success" className="w-11 ml-2" />
        سفارش شما به سبد خرید اضافه شد.{" "}
      </div>
    </section>
  );
};
