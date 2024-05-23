import React, { useState, useContext, useEffect } from "react";
import UploadIcon from "../../images/icons/document-upload.png";
import ArrowLeftIcon from "../../images/icons/arrow-left.png";
import AddIcon from "../../images/icons/add.png";
import SuccessIcon from "../../images/icons/success.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { GlobalContext } from "../../context/ContextWrapper";
import axios from "../../api/axios";
import { useForm,Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const CustomerOrder = () => {
  const { convertNumberToFarsi, dispatchCalCart, accessToken, deliveryId } =
    useContext(GlobalContext);

  const [birthDayStep, setBirthDayStep] = useState(1);
  const [showSuccess, setShowSucccess] = useState(false);
  const [fileName, setFileName] = useState("");
  const [showCovers, setShowCovers] = useState(null);
  const [showFilling, setShowFilling] = useState(null);
  const [showTaste, setShowTaste] = useState(null);
  const [showWeight, setShowWeight] = useState(null);
  const [useWeight, setUseWeight] = useState();
  const [price, setPrice] = useState(0);

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
    setError,
    reset,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (values) => {
    console.log(values.weight);
    console.log(values.filling);
    console.log(values.cover);
    console.log(values.taste);
    axios
      .post(
        "/profile/costomize_cake/",
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
      })
      .catch((error) => {
        console.error(error);
        setBirthDayStep(2);
      });
  };

  return (
    <section className="py-6 px-10 pt-48 max-md:px-5 max-lg:mt-0  max-lg:pt-5 relative overflow-hidden">
      <div className="flex justify-center px-5 border  rounded-2xl">
        <div className="w-2/3 py-5 border-l">
          <div className="w-1/2 py-2 ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="pl-10">
                <div className=" mb-8 px-2 border rounded-xl bg-gray-main ">
                  <select
                    {...register("weight")}
                    disabled={birthDayStep === 2 && true}
                    name="weight"
                   
                    className={` outline-none w-full p-2 cursor-pointer  bg-gray-main iranyekan-little-light text-gray-400 ${
                      birthDayStep === 2 && "opacity-50"
                    }`}
                  >
                    <option >وزن کیک</option>
                    {showWeight &&
                      showWeight.map((weight) => (
                        <option
                          key={weight.id}
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
                  className="z-10 flex absolute bottom-5 left-24 my-4 mx-5 bg-primary text-font-white rounded-xl shadow-xl py-3 px-3 vazir-regular "
                >
                  تایید و تکمیل سفارش
                  <img
                    src={ArrowLeftIcon}
                    alt=" Arrow Left"
                    className="w-6 mr-3"
                  />
                </button>
              )}
            </form>

            {/* <Formik
              initialValues={{
                weight: "",
                filling: [],
                cover: "",
                taste: "",
                image: "",
                explanation: "",
              }}
              onSubmit={(values) => {
                // console.log(values.weight);
                // console.log(values.filing);
                // console.log(values.cover);
                // console.log(values.taste);
                // console.log(values.explain);
                 axios
                .post("/profile/costomize_cake/",{
                  weight: values.weight,
                  filling: values.filling,
                  cover: values.cover,
                  taste: values.taste,
                  // image: values.image,
                  // explanation: values.explanation,
                }, {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                  },
                })
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.error( error);
                  setBirthDayStep(2);
                });
                
                // const birthDayCake = {
                //   weight: values.weight,
                //   filing: values.filing,
                //   cover: values.cover,
                //   taste: values.taste,
                //   // image: values.image,
                //   explanation: values.explanation,
                // };

                // localStorage.setItem(
                //   "birthDayCake",
                //   JSON.stringify(birthDayCake)
                // );
                
              }}
              validate={(values) => {
                const errors = {};

                if (!values.filling.length) {
                  errors.filling = "لطفا این قسمت را خالی نگذارید.";
                }

                if (!values.cover.length) {
                  errors.cover = "لطفا این قسمت را خالی نگذارید.";
                }

                if (!values.taste.length) {
                  errors.taste = "لطفا این قسمت را خالی نگذارید.";
                }
                // if (values.explanation.length===0) {
                //   errors.explanation = "لطفا این قسمت را خالی نگذارید.";
                // }

                return errors;
              }}
            >
              {({ setFieldValue }) => (
                <Form

                // action="index.html"
                // enctype="multipart/form-data"
                >
                  <div className="pl-10">
                    <div className=" mb-8 px-2 border rounded-xl bg-gray-main ">
                      <Field
                        as="select"
                        disabled={birthDayStep === 2 && true}
                        name="weight"
                        value={useWeight}
                        className={` outline-none w-full p-2 cursor-pointer  bg-gray-main iranyekan-little-light text-gray-400 ${
                          birthDayStep === 2 && "opacity-50"
                        }`}
                      >
                        <option value="وزن کیک">
                          وزن کیک
                        </option>
                        {showWeight &&
                          showWeight.map((weight) => (
                            <option
                            key={weight.id}
                              onChange={(e) => setUseWeight(e.target.value)}
                            >
                              {weight.int}
                            </option>
                          ))}
                      </Field>
                    </div>
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
                            <Field
                              disabled={birthDayStep === 2 && true}
                              type="checkbox"
                              name="filling"
                              value={filling.name}
                              className="checkbox text-gray-200 border w-3.5 h-3.5 rounded checked:bg-secondry checked:border-none   border-gray-500 "
                            />
                            <p className="iranyekan-very-light-white pr-2 ">
                              {filling.name}
                            </p>
                          </label>
                        ))}
                    </div>
                    <ErrorMessage name="filling">
                      {(errorMsg) => (
                        <div className="mb-2 mt-1 text-red-600 iranyekan-very-light-white">
                          {errorMsg}
                        </div>
                      )}
                    </ErrorMessage>
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
                            <Field
                              disabled={birthDayStep === 2 && true}
                              key={cover.id}
                              type="radio"
                              name="cover"
                              value={cover.name}
                              className="checkbox text-gray-200 border  w-3.5 h-3.5 rounded checked:bg-secondry checked:border-none  border-gray-500 "
                            />
                            <p className="iranyekan-very-light-white pr-2">
                              {cover.name}
                            </p>
                          </div>
                        ))}

                      <ErrorMessage name="cover">
                        {(errorMsg) => (
                          <div className="mb-2 mt-1 text-red-600 iranyekan-very-light-white">
                            {errorMsg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                  </div>

                  <div>
                    <h3 className="iranyekan-little-light mb-3 mt-5">
                      مزه کیک:
                    </h3>
                    <div className="flex  items-start flex-wrap   ">
                      {showTaste &&
                        showTaste.map((taste) => (
                          <div
                            key={taste.id}
                            className={`flex w-32  my-2 ${
                              birthDayStep === 2 && "opacity-50 text-gray-400"
                            }`}
                          >
                            <Field
                              disabled={birthDayStep === 2 && true}
                              key={taste.id}
                              type="radio"
                              name="taste"
                              value={taste.name}
                              className="checkbox text-gray-200 border  w-3.5 h-3.5 rounded checked:bg-secondry checked:border-none  border-gray-500 "
                            />
                            <p className="iranyekan-very-light-white pr-2">
                              {taste.name}
                            </p>
                          </div>
                        ))}

                      <ErrorMessage name="taste">
                        {(errorMsg) => (
                          <div className="mb-2 mt-1 text-red-600 iranyekan-very-light-white">
                            {errorMsg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                  </div>

                  <div className="pl-10 ">
                    <label
                      className={` text-center border border-dashed block rounded-xl mt-5 p-4 iranyekan-very-light ${
                        birthDayStep === 2 && "opacity-50"
                      }`}
                    >
                      ایده کیک خود را درصورت نیاز اپلود کنید.
                      <input
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
                      />
                      <span className="flex flex-col justify-center items-center cursor-pointer">
                        <img className="m-2 w-5" src={UploadIcon} />
                        {fileName}
                      </span>
                    </label>
                  </div>

                  <div className="pl-10 ">
                    <Field
                      disabled={birthDayStep === 2 && true}
                      as="textarea"
                      name=" explanation"
                      cols="30"
                      rows="3"
                      placeholder="توضیحات..."
                      className={`outline-none w-full p-3 border rounded-xl bg-gray-main mt-5 vazir-very-little ${
                        birthDayStep === 2 && "opacity-50"
                      }`}
                    ></Field>
                     <ErrorMessage name="explanation">
                      {(errorMsg) => (
                        <div className="mb-2 mt-1 text-red-600 iranyekan-very-light-white">
                          {errorMsg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>

                  {birthDayStep === 1 && (
                    <button
                      type="submit"
                      className="z-10 flex absolute bottom-5 left-24 my-4 mx-5 bg-primary text-font-white rounded-xl shadow-xl py-3 px-3 vazir-regular "
                    >
                      تایید و تکمیل سفارش
                      <img
                        src={ArrowLeftIcon}
                        alt=" Arrow Left"
                        className="w-6 mr-3"
                      />
                    </button>
                  )}
                </Form>
              )}
            </Formik> */}
          </div>
        </div>

        <div className="w-1/3 p-5 relative">
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
              {convertNumberToFarsi(5700000)} تومان
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

          <div className="absolute bottom-5 right-2 flex  ">
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
          </div>
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
