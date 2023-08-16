'use client'
import React from 'react'
import { useState} from 'react'

export default function page() {
  const [items, setItems] = useState([{itemId: "", itemName: "",quantity: 0, price:0},])
  //handle click
  const handleclick = () => { 
    console.log("handleClick")
    setItems([...items,{itemId: "", itemName: "",quantity: 0, price:0}])
    console.log(items)
  }
  //handle delete
  const handleDelete = (i) => {
    const deletVal = [...items]
    deletVal.splice(i, 1)
    setItems(deletVal)
  };
  const handleChange = (e,i) => {
    const {name,value} = e.target;
    console.log(name, value)
    const updateVal = [...items]
    updateVal[i][name] = value
    setItems(updateVal)
  };
  return (
    <div className='text-black my-20 xl:px-8 px-5 md:ml-[300px] w-full h-screen'>
     <button onClick={handleclick} className='bg-slate-600 p-4'>Add Item</button>
      
      {items.map((item, index)=>{
        return (
          <div className='bg-amber-400 p-10' key={index}>
              <input type='text' defaultValue={item.itemId} name="itemId" placeholder='itemId' onChange={(e)=>handleChange(e,index)}/>
              <input type='text' defaultValue={item.itemName} name="itemName" placeholder='item name' onChange={(e)=>handleChange(e,index)}/>
              <input type='text' defaultValue={item.quantity} name="quantity" placeholder='itemId' onChange={(e)=>handleChange(e,index)}/>
              <input type='text' defaultValue={item.price} name="price" placeholder='itemId' onChange={(e)=>handleChange(e,index)}/>
              <button className='bg-slate-600 p-4' onClick={()=>handleDelete(index)}>Delete</button>
          </div>
        )
      })}
      <p>{JSON.stringify(items)}</p>
      </div>
   
  )
}
