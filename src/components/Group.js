import React from 'react';

export const Group = ({group,image}) => {
  return (
    <div className='text-center  mx-auto'>
        <img src={image} alt="" className='w-36 rounded-full shadow-lg' />
        <h3 className="py-4 iranyekan-very-medium ">{group} </h3>
         
    </div>
  )
}
