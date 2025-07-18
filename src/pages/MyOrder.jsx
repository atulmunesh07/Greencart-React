import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { dummyOrders } from '../../public/assets'

function MyOrder() {
  const [myOrder, setMyOrder] = useState([])
  const { currency } = useAppContext()

  const featchMyOrder = () => {
    setMyOrder(dummyOrders)
  }
  useEffect(() => {
    featchMyOrder()
  }, [])


  return (
    <div className='mt-12 pb-10'>
      <div className='  '>
        <p className='text-3xl'><span className='text-primary font-bold text-4xl'>My</span> Order </p>
        <div className='W-16 h-0.5 bg-primary rounded-full mt-0.5'></div>
      </div>
      <div>
        {myOrder.map((Order, index) => (
          <div key={index} className='border  border-gray-300 rounded-lg md-10 p-4 py-5 max-w-4xl'>
            <p className='flex justify-between  md:items-center text-gray-400 md:font-medium max-md:flex-col'>
              <span>Order Id : {Order._id}</span>
              <span>Payment : {Order.paymentType}</span>
              <span>Total amount :{currency} {Order.amount}</span>
            </p>
            {Order.items.map((items, index) => (
              <div key={index} className={`relative mt-5 bg-white text-gray-500/70 ${Order.items.length !== index + 1 && 'order-b'}
              border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4
              py-5 md:gap-16 w-full max-w-4xl
              `}>
                <div className='flex items-center md-4 md:mb-0'>
                  <div className='bg-primary/10 p-4 rounder-lg'>
                    <img src={items.product.image[0]} alt="order"
                      className='w-16 h-16'
                    />
                  </div>
                </div>
                <div className='ml-4 '>
                  <h2 className='text-xl font-medium text-gray-800'>{items.product.name}</h2>
                  <p>Category : {items.product.category}</p>
                </div>

                <div className='text-primary text-lg font-medium'>
                  <p>Quantity : {items.quantity || "1"}</p>
                  <p>Status : {items.status}</p>
                  <p>Date : { new Date(Order.createdAt).toLocaleDateString()}</p>
                </div>
                <p className='text-primary text-lg font-medium'>
                  Amount : {currency}{items.product.offerPrice * items.quantity}
                </p>
              </div>
            ))}
          </div>
        ))}

      </div>


    </div>
  )
}

export default MyOrder
