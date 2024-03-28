import React, { useState, useContext } from "react";
import UploadIcon from "../../images/icons/document-upload.png";
import ArrowLeftIcon from "../../images/icons/arrow-left.png";
import AddIcon from "../../images/icons/add.png";
import SuccessIcon from "../../images/icons/success.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { GlobalContext } from "../../context/ContextWrapper";

export const BirthDayCake = () => {
  const [birthDayStep, setBirthDayStep] = useState(1);
  const [showSuccess, setShowSucccess] = useState(false);
  const [fileName, setFileName] = useState("");

  const { convertNumberToFarsi, dispatchCalCart } = useContext(GlobalContext);
  const goBackBox = () => {
    setTimeout(() => {
      setShowSucccess(false);
    }, 5000);
  };

  return (
    <section className="mb-14 relative overflow-hidden">
      <div className="flex justify-center px-5 border  rounded-2xl">
        <div className="w-2/3 py-5 border-l">
          <div className="w-1/2 py-2 ">
            <Formik
              initialValues={{
                weight: "",
                filing: [],
                filingType: "",
                cover: [],
                coverType: "",
                image: "",
                explain: "",
              }}
              onSubmit={(values) => {
                const birthDayCake = {
                  weight: values.weight,
                  filing: values.filing,
                  filingType: values.filingType,
                  cover: values.cover,
                  coverType: values.coverType,
                  image: values.image,
                  explain: values.explain,
                };

                localStorage.setItem(
                  "birthDayCake",
                  JSON.stringify(birthDayCake)
                );
                setBirthDayStep(2);
              }}
              validate={(values) => {
                const errors = {};

                if (!values.filing.length) {
                  errors.filing = "لطفا این قسمت را خالی نگذارید.";
                }

                if (!values.cover.length) {
                  errors.cover = "لطفا این قسمت را خالی نگذارید.";
                }

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
                        value="وزن کیک"
                        className={` outline-none w-full p-2 cursor-pointer  bg-gray-main iranyekan-little-light text-gray-400 ${
                          birthDayStep === 2 && "opacity-50"
                        }`}
                      >
                        <option disabled value="وزن کیک">
                          وزن کیک
                        </option>
                      </Field>
                    </div>
                  </div>

                  <div>
                    <h3 className="iranyekan-little-light mb-3 ">فیلینگ:</h3>
                    <div className="flex justify-between items-start flex-wrap">
                      <label
                        className={`flex w-32  my-2 ${
                          birthDayStep === 2 && "opacity-50 text-gray-400 "
                        }`}
                      >
                        <Field
                          disabled={birthDayStep === 2 && true}
                          type="checkbox"
                          name="filing"
                          value="caramel"
                          className="checkbox text-gray-200 border w-3.5 h-3.5 rounded checked:bg-secondry checked:border-none   border-gray-500 "
                        />
                        <p className="iranyekan-very-light-white pr-2 ">
                          کارامل
                        </p>
                      </label>

                      <label
                        className={`flex w-32  my-2 ${
                          birthDayStep === 2 && "opacity-50 text-gray-400"
                        }`}
                      >
                        <Field
                          disabled={birthDayStep === 2 && true}
                          type="checkbox"
                          name="filing"
                          value="walnut"
                          className="checkbox text-gray-200 border  w-3.5 h-3.5 rounded checked:bg-secondry checked:border-none  border-gray-500 "
                        />
                        <p className="iranyekan-very-light-white pr-2">گردو</p>
                      </label>

                      <label
                        className={`flex w-32  my-2 ${
                          birthDayStep === 2 && "opacity-50 text-gray-400"
                        }`}
                      >
                        <Field
                          disabled={birthDayStep === 2 && true}
                          type="checkbox"
                          name="filing"
                          value="chocolate"
                          className="checkbox text-gray-200 border  w-3.5 h-3.5 rounded checked:bg-secondry checked:border-none  border-gray-500  "
                        />
                        <p className="iranyekan-very-light-white pr-2 ">
                          دبل چاکلت
                        </p>
                      </label>

                      <label
                        className={`flex w-32  my-2 ${
                          birthDayStep === 2 && "opacity-50 text-gray-400"
                        }`}
                      >
                        <Field
                          disabled={birthDayStep === 2 && true}
                          type="checkbox"
                          name="filing"
                          value="pineapple"
                          className="checkbox text-gray-200 border  w-3.5 h-3.5 rounded checked:bg-secondry checked:border-none border-gray-500"
                        />
                        <p className="iranyekan-very-light-white pr-2 ">
                          آناناس
                        </p>
                      </label>

                      <label
                        className={`flex w-32  my-2 ${
                          birthDayStep === 2 && "opacity-50 text-gray-400"
                        }`}
                      >
                        <Field
                          disabled={birthDayStep === 2 && true}
                          type="checkbox"
                          name="filing"
                          value="strawberry"
                          className="checkbox text-gray-200 border  w-3.5 h-3.5 rounded checked:bg-secondry checked:border-none  border-gray-500 "
                        />
                        <p className="iranyekan-very-light-white pr-2 ">
                          توت فرنگی
                        </p>
                      </label>

                      <label
                        className={`flex w-32  my-2 ${
                          birthDayStep === 2 && "opacity-50 text-gray-400"
                        }`}
                      >
                        <Field
                          disabled={birthDayStep === 2 && true}
                          type="checkbox"
                          name="filing"
                          value="banana"
                          className="checkbox text-gray-200 border  w-3.5 h-3.5 rounded checked:bg-secondry checked:border-none  border-gray-500 "
                        />
                        <p className="iranyekan-very-light-white pr-2 ">موز</p>
                      </label>
                    </div>
                    <ErrorMessage name="filing">
                      {(errorMsg) => (
                        <div className="mb-2 mt-1 text-red-600 iranyekan-very-light-white">
                          {errorMsg}
                        </div>
                      )}
                    </ErrorMessage>

                    <div className="pl-10">
                      <Field
                        disabled={birthDayStep === 2 && true}
                        type="text"
                        name="filingType"
                        className={`outline-none w-full p-3 border rounded-xl bg-gray-main mt-2 vazir-very-little ${
                          birthDayStep === 2 && "opacity-50"
                        }`}
                        placeholder="موارد دیگر..."
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="iranyekan-little-light mb-3 mt-5">روکش:</h3>
                    <div className="flex  items-start flex-wrap   ">
                      <div
                        className={`flex w-32  my-2 ${
                          birthDayStep === 2 && "opacity-50 text-gray-400"
                        }`}
                      >
                        <Field
                          disabled={birthDayStep === 2 && true}
                          type="checkbox"
                          name="cover"
                          value="cream"
                          className="checkbox text-gray-200 border  w-3.5 h-3.5 rounded checked:bg-secondry checked:border-none  border-gray-500 "
                        />
                        <p className="iranyekan-very-light-white pr-2">خامه</p>
                      </div>
                      <div
                        className={`flex w-32  my-2 ${
                          birthDayStep === 2 && "opacity-50 text-gray-400"
                        }`}
                      >
                        <Field
                          disabled={birthDayStep === 2 && true}
                          type="checkbox"
                          name="cover"
                          value="fond"
                          className="checkbox text-gray-200 border  w-3.5 h-3.5 rounded checked:bg-secondry checked:border-none  border-gray-500 "
                        />
                        <p className="iranyekan-very-light-white pr-2">
                          فوندانت
                        </p>
                      </div>
                      <ErrorMessage name="cover">
                        {(errorMsg) => (
                          <div className="mb-2 mt-1 text-red-600 iranyekan-very-light-white">
                            {errorMsg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="pl-10">
                      <Field
                        disabled={birthDayStep === 2 && true}
                        type="text"
                        name="coverType"
                        className={`outline-none w-full p-3 border rounded-xl bg-gray-main mt-2 vazir-very-little ${
                          birthDayStep === 2 && "opacity-50"
                        }`}
                        placeholder="موارد دیگر..."
                      />
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
                      name="explain"
                      cols="30"
                      rows="3"
                      placeholder="توضیحات..."
                      className={`outline-none w-full p-3 border rounded-xl bg-gray-main mt-5 vazir-very-little ${
                        birthDayStep === 2 && "opacity-50"
                      }`}
                    ></Field>
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
            </Formik>
          </div>
        </div>

        <div className="w-1/3 p-5 relative">
          {birthDayStep === 1 && (
            <div className="mt-3">
              <h3 className="iranyekan-little-light"> نحوه تحویل سفارش:</h3>
              <div className="flex mt-5">
                <input type="radio" name="price" className=" accent-primary" />

                <p className="pr-2 iranyekan-very-light-white">
                  تحویل حضوری _
                  <span className="iranyekan-very-light-small">
                    هزینه ارسال رایگان
                  </span>
                </p>
              </div>
              <div className="flex mt-5">
                <input type="radio" name="price" className="accent-primary" />

                <p className="pr-2 iranyekan-very-light-white">
                  تحویل با پیک _
                  <span className="iranyekan-very-light-small">
                    هزینه ارسال 40.000 تومان
                  </span>
                </p>
              </div>
            </div>
          )}

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
          )}

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
                  localStorage.removeItem("birthDayCake")
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
