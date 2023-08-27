'use client'
import { useState, useEffect} from 'react';
import {AiOutlineMinusCircle} from 'react-icons/ai'
import ProductModal from './ProductModal';
import { getOneProduct } from '@/src/actions/productAction';

export default function OrderSummary({data}) {
    const [filterData, setFilterData] = useState({})
    const [showModal, setShowModal] = useState(false);
    let subTotal = 0;
    const item = {itemId: '', itemName: '', quantity: 1, price: 0, description: '',itemIdRef:null, modal: '' }
    const [items, setItems] = useState(data? JSON.parse(data):[{itemId: '', itemName: '', quantity: 1, price: 0, description: '',itemIdRef:null, modal: ''}]);

    //grab data and set properties
    const handleClick = async(itemData,i) => {
        const res = await getOneProduct({_id: itemData})
        const productData = JSON.parse(res)
        let updateVal = [...items]
        updateVal[i] = {itemId: productData.productId, itemName: productData.title, quantity: 1, price: productData.price, description: '',itemIdRef:null, modal: '' }
        updateVal = [...updateVal,item];
        setItems(updateVal)
        setFilterData({});
        setShowModal(false);
     };
    //set focus
    useEffect(()=>{
        if (items[items.length - 1].itemIdRef)
        items[items.length - 1].itemIdRef.focus();
    }, [items.length])

    //add item
    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setItems([...items,item]);
            setFilterData({});
        }
    };
    //remove item
    const handleDelete = (i) => {
        const updateVal = [...items]
        updateVal.splice(i, 1)
        setItems(updateVal);
        setFilterData({});
    };
   // handle onchange
   const handleChange = (e,i) => {
    const {name,value} = e.target;
    const updateVal = [...items]
    updateVal[i][name] = value
    setItems(updateVal)
    console.log("from handle change",[items[i]].itemId)
    console.log("from handle change",value)

    if(name === "itemId"){
        setFilterData({...filterData, productId: {$regex: `(?i)${value}`}})
    }
    if(name === "itemName"){
        setFilterData({...filterData, title: {$regex: `(?i)${value}`}})
    }
    
    if(name === 'itemId' || name === 'itemName'){
    setShowModal(true)   
    items[i].modal = <ProductModal isVisible={showModal} onClose={() => setShowModal(false)}
    filterData={filterData} onSubmit={async(e)=>handleClick(e,i)}/>
}

  };
  items.forEach(item => {
    subTotal += item.price * item.quantity;
  })

    return (
        <div className='flex flex-col gap-3'>
            <h3>Order Info</h3>
            {items.map((item,i) => {
                return (
            <div key={i} className={`itemWrapper flex flex-col gap-2`}>
                <div className='grid grid-cols-12 gap-x-3 items-center'>
                    <input ref={e=>item.itemIdRef = e} onChange={(e)=>handleChange(e,i)} value={item.itemId} className='col-span-2' type='text' name='itemId' placeholder='Item Id' autoComplete="off"/>
                    <input onChange={(e)=>handleChange(e,i)} value={item.itemName} className='col-span-5' type='text' name='itemName' placeholder='Item Name'/>

                    <input onChange={(e)=>handleChange(e,i)} value={item.quantity} className='col-span-2' type='text' name='quantity' placeholder='Quantity' autoComplete="off"/>
                    <input onChange={(e)=>handleChange(e,i)} value={item.price} className='col-span-2' type='text' name='price' placeholder='Price' onKeyPress={(e)=>{onKeyPress(e)}} autoComplete="off" />
                    <button type='button' onClick={(e)=>handleDelete(i)} className='text-red-500'><AiOutlineMinusCircle/></button>
                </div>
                <div className='grid grid-cols-12 gap-x-3'>
                    <input onChange={(e)=>handleChange(e,i)} className='col-span-8' type='text' value={item.description} name='description' placeholder='Description' autoComplete="off"/>
                    <div className='col-span-4 text-center'>sum {item.quantity * item.price}</div>
                </div>
                {item.modal && (<div className='relative bg-black/30 p-3 rounded-md'>{item.modal}</div>)}
            </div>
                 )
                })}
            <div className='flex justify-end text-primary' >
                <h4 className='rounded-md flex-grow-5 bg-black/80 w-[33%] xl:w-[20%] px-4 py-2'>Total: {subTotal}</h4>
            </div>
        </div>
    )
}




// save for later use 
// const cart = [
//     {quantity: 1, product: {price: 5.00}},
//     {quantity: 2, product: {price: 1.99}},
//   ];
  
//   const calculatedSubtotal = (detail) => {
//     return detail.map(detailItem => {
//       return detailItem.quantity * detailItem.product.price;
//     });
//   };
  
//   const calculateTotalFromSubtotal = subtotals => {
//     return subtotals.reduce((grandTotal, itemSubtotal) => {
//       return grandTotal + itemSubtotal;
//     }, 0);
//   }
  
//   console.log(calculatedSubtotal(cart));
//   console.log(calculateTotalFromSubtotal(calculatedSubtotal(cart)));