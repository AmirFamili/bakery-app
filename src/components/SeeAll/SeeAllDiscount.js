import React from 'react';
import { Discount } from '../HomePage/Discount';
import BackIcon from '../../images/icons/arrow-right.png';
import {Link}from 'react-router-dom'


export const SeeAllDiscount = () => {
  return (
    <div className='pt-32 min-h-screen '>
      <Link to='/' className="flex justify-start items-center iranyekan-font text-lg text"><img src={BackIcon} alt="back" className='w-6 m-6 ml-3' /> بازگشت</Link>
        <Discount/>
    </div>
  )
}


