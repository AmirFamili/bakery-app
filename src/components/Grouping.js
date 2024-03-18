import React from "react";
import ElementIcon from "../images/icons/element-black.png";
import ArrowCircleLeftPrimary from "../images/icons/arrow-circle-left-primary.png";
import AfternoonCakeImg from '../images/Groups/afternon-cake.png';
import BirthdayCakeImg from '../images/Groups/birthday-cake.png';
import CupCakeImg from '../images/Groups/cup-cake.png';
import JarCakeImg from '../images/Groups/jar-cake.png';
import DonutCakeImg from '../images/Groups/donut-cake.png';
import AnotherCakeImg from '../images/Groups/another-cake.png';

import { Group } from "./Group";

export const Grouping = () => {
  return (
    <section className="p-6   ">
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <img src={ElementIcon} alt="tag" className="w-5 h-5 mt-1" />
        <h2 className="iranyekan-medium pr-3">دسته‌بندی‌ها</h2>
      </div>
      <div className="flex justify-center items-center cursor-pointer mt-3">
        <p className=" iranyekan-light ">مشاهده همه</p>
        <img
          src={ArrowCircleLeftPrimary}
          alt="arrow-circle-left"
          className="w-7 mr-2"
        />
      </div>
    </div>

    <div className=" grid grid-flow-col  overflow-x-auto overscroll-x-auto py-6 mt-10 ">
     
     <Group group={"کیک عصرانه"} image={AfternoonCakeImg }/>
     <Group group={"کیک تولد "} image={BirthdayCakeImg} />
     <Group group={"کاپ کیک"} image={CupCakeImg }/>
     <Group group={"جار کیک"} image={JarCakeImg }/>
     <Group group={"دونات"} image={ DonutCakeImg }/>
     <Group group={"متفرقه"} image={AnotherCakeImg }/>

    </div>
  </section>
  )
}
