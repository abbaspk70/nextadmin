'use client'
import { useState, useEffect} from 'react';
import {AiOutlineMinusCircle} from 'react-icons/ai'
import { Fragment } from 'react';
import ProductModal from './ProductModal';
import { getOneProduct } from '@/src/actions/productAction';

export default function OrderSummary({data}) {
    const [product, setProduct] = useState("")
    const [filterData, setFilterData] = useState({})
    const [showModal, setShowModal] = useState(false);
    let subTotal = 0;
    const item = {itemId: '', itemName: '', quantity: 1, price: 0, description: '',itemIdRef:null, modal: '' }
    const [items, setItems] = useState(data? JSON.parse(data):[{itemId: '', itemName: '', quantity: 1, price: 0, description: '',itemIdRef:null, modal: ''}]);

    const handleClick = async(itemData,e,i) => {
        const res = await getOneProduct({_id: itemData})
        const productData = JSON.parse(res)
        setProduct(productData);
        items.push({itemId: productData.productId, itemName: productData.title, quantity: 1, price: productData.price, description: '',itemIdRef:null, modal: '' })
        console.log(items);
     };
    //set focus
    useEffect(()=>{
        if (items[items.length - 1].itemIdRef)
        items[items.length - 1].itemIdRef.focus();
    }, [items.length])

    //add item
    const onKeyPress = (e,i) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setItems([...items,item]);
        }
    };
    //remove item
    const handleDelete = (i) => {
        const updateVal = [...items]
        updateVal.splice(i, 1)
        setItems(updateVal)
    };
   // handle onchange
   const handleChange = (e,i) => {
    const {name,value} = e.target;
    const updateVal = [...items]
    updateVal[i][name] = value
    console.log(product)
    setItems(updateVal)

    if(name === "itemId"){
    setFilterData({...filterData, productId: {$regex: `(?i)${value}`}})
    items[i].modal = <ProductModal isVisible={true} onClose={() => setShowModal(false)}
    filterData={filterData} onSubmit={handleClick}/>
}
if(name === "itemName"){
    setFilterData({...filterData, title: {$regex: `(?i)${value}`}})
}
  };
  items.forEach(item => {
    subTotal += item.price * item.quantity;
  })

    return (
        <Fragment>
        <div className='flex flex-col gap-3'>
            <h3>Order Info</h3>
            {items.map((item,i) => {
                return (
            <div key={i} className={`itemWrapper flex flex-col gap-2`}>
                <div className='grid grid-cols-12 gap-x-3 items-center'>
                    <div className='relative'>
                    <input ref={e=>item.itemIdRef = e} onChange={(e)=>handleChange(e,i)} value={item.itemId} className='col-span-2' type='text' name='itemId' placeholder='Item Id'/>
                    <div>{item.modal}</div>
                    </div>
                    <input onChange={(e)=>handleChange(e,i)} value={item.itemName} className='col-span-5' type='text' name='itemName' placeholder='Item Name'/>

                    <input onChange={(e)=>handleChange(e,i)} value={item.quantity} className='col-span-2' type='text' name='quantity' placeholder='Quantity' />
                    <input onChange={(e)=>handleChange(e,i)} value={item.price} className='col-span-2' type='text' name='price' placeholder='Price' onKeyPress={(e)=>{onKeyPress(e,i)}} />
                    <button type='button' onClick={(e)=>handleDelete(i)} className='text-red-500'><AiOutlineMinusCircle/></button>
                </div>
                <div className='grid grid-cols-12 gap-x-3'>
                    <input onChange={(e)=>handleChange(e,i)} className='col-span-8' type='text' value={item.description} name='description' placeholder='Description' />
                    <div className='col-span-4 text-center'>sum {item.quantity * item.price}</div>
                </div>
            </div>
                 )
                })}
            <div className='flex justify-end text-primary' >
                <h4 className='rounded-md flex-grow-5 bg-black/80 w-[33%] xl:w-[20%] px-4 py-2'>Total: {subTotal}</h4>
            </div>
        </div>
        <ProductModal isVisible={showModal} onClose={()=>setShowModal(false)} filterData={filterData} onSubmit={handleClick}/>
        </Fragment>
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