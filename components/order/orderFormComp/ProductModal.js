import React from 'react'
import ProductSearchList from './ProductSearchList';

export default function ProductModal({isVisible, onClose, filterData, onSubmit}) {
    if(!isVisible) return null;
  return (
    <div className='w-full'>
        <div className='w-[100%] flex flex-col'>
            <div className='p-2 rounded-md'>
                <ProductSearchList data={filterData} onSubmit={onSubmit}/>
            </div>

        </div>
    </div>
  )
}
