import React, { useEffect, useState } from "react";
import ElementIcon from "../../images/icons/element-black.png";
import axios from "../../api/axios";
import { Group } from "./Group";

export const Grouping = () => {
  const [groupsData,setGroupsData]=useState();
  useEffect(() => {
    async function getData() {
      await axios
        .get("/bakery/category/")
        .then((response) => setGroupsData(response.data));
    }

    getData();
  }, []);
  return (
    <section className="p-6   ">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={ElementIcon}
            alt="tag"
            className="w-5 h-5 mt-1 max-md:w-4 max-md:h-4"
          />
          <h2 className="iranyekan-medium pr-3">دسته‌بندی‌ها</h2>
        </div>
      </div>

      <div className=" grid grid-flow-col  overflow-x-auto overscroll-x-auto py-6 mt-10 ">
      {groupsData && groupsData.map((group)=>  <Group title={group.title} key={group.id} image={group.image} id={group.id} />)}
        
      </div>
    </section>
  );
};
