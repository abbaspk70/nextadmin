import React from 'react'

export default function DataLoading() {
  return (
    <div className='text-black w-full mx-auto skeleton animate-pulse'>
      <div className="p-3 w-full bg-accent/50 rounded-md my-3"></div>
      <div className="p-2 w-full bg-accent/50 rounded-md my-2"></div>
      <div className="p-2 w-full bg-accent/50 rounded-md my-2"></div>
      <div className="p-2 w-full bg-accent/50 rounded-md my-2"></div>

    </div>
  )
}
