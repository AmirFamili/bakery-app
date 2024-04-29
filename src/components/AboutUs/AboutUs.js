import React, { useEffect, useState } from 'react'
import axios from '../../api/axios';

export const AboutUs = () => {
  const [about,setAbout]=useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    async function getData() {
      await axios
        .get("/settings/about/", { signal })
        .then((response) => {setAbout(response.data)
        console.log(response.data);
        })
        .catch((err) => console.log(err));
    }
    getData();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <section className="py-32 max-md:px-5 h-screen min-h-screen max-lg:pt-5 max-lg:mt-20 relative w-full max-lg:h-auto">
      <h1 className="py-5 iranyekan-very-bold px-10"> درباره ما</h1>
      
  <div className="flex justify-between items-center px-5 h-full max-lg:block">
        <div className="w-1/2 px-5 leading-8  max-lg:w-10/12 max-md:w-full  max-lg:h-auto max-lg:mx-auto">{about && about.about}</div>
        <div className="hidden border-b mx-10 my-10 max-lg:block max-md:mx-4"></div>
        <div className=" w-1/2 px-5 max-lg:w-10/12 max-md:w-full max-lg:mx-auto"><img src={`http://onlinelbakery.pythonanywhere.com${about && about.image}`} alt="درباره ما" className=' rounded-2xl shadow-lg ' /></div>
   </div>
      </section>
  )
}
