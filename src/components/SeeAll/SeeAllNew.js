import React from 'react'
import { News } from '../HomePage/News';
import BackIcon from '../../images/icons/arrow-right.png';
import {Link}from 'react-router-dom'

export const SeeAllNewProduct = () => {
    return (
        <div className='pt-32 min-h-screen '>
        <Link to='/' className="flex justify-start items-center iranyekan-font text-lg mb-5 max-md:text-xs"><img src={BackIcon} alt="back" className='w-6 m-6 ml-3' /> بازگشت</Link>
          <News/>
      </div>
    )
  }