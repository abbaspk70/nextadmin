import React from 'react'
import ProductSearchList from './ProductSearchList';

export default function ProductModal({isVisible, filterData, onSubmit}) {
    if(!isVisible) return null;
  return (
    <div className='w-full'>
        <div className='flex flex-col'>
            <div className='p-2 rounded-md'>
                <ProductSearchList data={filterData} onSubmit={onSubmit}/>
            </div>

        </div>
    </div>
  )
}
