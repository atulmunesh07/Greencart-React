import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets, dummyAddress } from '../../public/assets'

function Cart() {

    const { products, currency, cartItems, removeCartData, getCardAmount, getCartCount, updateCart, navigate } = useAppContext()

    const [cartArray, setCartArray] = useState([])
    const [address, setAddress] = useState(dummyAddress)
    const [showAddress, setShowAddress] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState()
    const [paymentOption, setPaymentOption] = useState()

    const getCart = () => {
        let tempArray = []
        for (const key in cartItems) {
            const product = products.find((item) => item._id === key)
            product.quantity == cartItems[key]
            tempArray.push(product)
        }
        setCartArray(tempArray)
    }

    const placeOder = async ()=>{}

    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart()
        }

    }, [products, cartItems])




    return products.length > 0 && cartItems ? (
        <div>
            <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto mt-20">
                <div className='flex-1 max-w-4xl'>
                    <h1 className="text-3xl font-medium mb-6">
                        Shopping Cart <span className="text-sm text-indigo-500">{getCartCount()} Items</span>
                    </h1>

                    <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                        <p className="text-left">Product Details</p>
                        <p className="text-center">Subtotal</p>
                        <p className="text-center">Action</p>
                    </div>

                    {cartArray.map((product, index) => (
                        <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                            <div className="flex items-center md:gap-6 gap-3">
                                <div onClick={() => { navigate(`/product/${product.category.toLowerCase()}/${product._id}`), scrollTo(0, 0) }} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                    <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                                </div>
                                <div>
                                    <p className="hidden md:block font-semibold">{product.name}</p>
                                    <div className="font-normal text-gray-500/70">
                                        <p>weight: <span>{product.weight || "N/A"}</span></p>
                                        <div className='flex items-center'>
                                            <p>Qty:</p>
                                            <select onChange={e=> updateCart(product._id,Number(e.target.value))} value={cartItems[product._id]} className='outline-none'>
                                                {Array(cartItems[product._id] > 9 ? cartItems[product._id] : 9).fill('').map((_, index) => (
                                                    <option key={index} value={index + 1}>{index + 1}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* ---------------subTotal ------------------------------------ not */}
                            <p className="text-center">{currency} {product.offerPrice}</p>
                            <button onClick={() => removeCartData(product._id)} className="cursor-pointer mx-auto">
                                <img src={assets.remove_icon} alt="remove" className='inline-block w-6 h-6' />
                            </button>
                        </div>)
                    )}

                    <button onClick={() => { navigate('/'), scrollTo(0, 0) }} className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium">
                        <img src={assets.arrow_right_icon_colored} alt="" className='group-hover:-translate-x-1 transition' />
                        Continue Shopping
                    </button>

                </div>

                <div className="max-w-[360px] w-full bg-primary/40 p-5 max-md:mt-16 border border-gray-300/70">
                    <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                    <hr className="border-gray-300 my-5" />

                       {/*------------------------------- address part--------------------------------------- */}

                    <div className="mb-6">
                        <p className="text-sm font-medium uppercase">Delivery Address</p>
                        <div className="relative flex justify-between items-start mt-2">
                            <p className="text-gray-500">{selectedAddress ? `${selectedAddress.select} , ${selectedAddress.city} ${selectedAddress.state} ${selectedAddress.country}` : 'No address found'}</p>
                        
                            <button onClick={() => setShowAddress(!showAddress)} className="text-indigo-500 hover:underline cursor-pointer">
                                Change
                            </button>
                            {showAddress && (
                                <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                    {address.street} {address.map((address,index)=>(<p onClick={() =>{setSelectedAddress(address); setShowAddress(false)}} className="text-gray-500 p-2 hover:bg-primary">
                                        {address.state},{address.city},{address.country}
                                    </p>)) }
                                    <p onClick={() => navigate('/add-address')} className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10">
                                        Add address
                                    </p>
                                </div>
                            )}
                        </div>

                        <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                        <select onChange={e=>setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                            <option value="COD">Cash On Delivery</option>
                            <option value="Online">Online Payment</option>
                        </select>
                    </div>

                    <hr className="border-gray-300" />

                    <div className="text-gray-500 mt-4 space-y-2">
                        <p className="flex justify-between">
                            <span>Price</span><span>{currency}{getCardAmount()}</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Shipping Fee</span><span className="text-green-600">Free</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Tax (2%)</span><span>{currency}{(getCardAmount()*2)/100}</span>
                        </p>
                        <p className="flex justify-between text-lg font-medium mt-3">
                            <span>Total Amount:</span><span>{currency}{getCardAmount()+ getCardAmount()*2/100}</span>
                        </p>
                    </div>

                    <button onClick={placeOder} className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
                        { paymentOption === 'COD' ? "Place Order" : 'Place Order to checkout' }
                    </button>
                </div>
            </div>
        </div>
    ) : (null)
}

export default Cart
