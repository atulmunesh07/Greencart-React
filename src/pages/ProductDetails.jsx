import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { Link, useParams } from 'react-router';
import { assets } from '../../public/assets';
import ProductCard from '../componets/BestSeller/ProductCard';

function ProductDetails() {
    const { products, navigate, currency, addToCart } = useAppContext()
    const { id } = useParams()


    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = React.useState(null);

    const product = products.find((item) => item._id === id)
    useEffect(() => {
        if (products.length > 0) {
            let productCopy = products.slice()
            productCopy = productCopy.filter((item) =>  product.category === item.category )
            setRelatedProducts(productCopy.slice(0, 5))
        }

    }, [product])


    useEffect(() => {
        setThumbnail(product.image[0] ? (product.image[0]) : (null))
    }, [product])


    return product && (
        <div className="mt-12">
            <p>
                <Link to={'/'}>Home</Link> /
                <Link to={'/product'}> Products</Link> /
                <Link to={`/product/${product.category.toLowerCase()}`}> {product.category}</Link> /
                <span className="text-indigo-500"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-primary/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-primary/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (

                            <img src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                                className='w-3.5 md:w-4'
                            />

                        ))}
                        <p className="text-base ml-2">(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-primary/70 line-through">MRP:{currency} {product.price}</p>
                        <p className="text-2xl font-medium">MRP: {currency} {product.offerPrice}</p>
                        <span className="text-primary/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-primary/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={() => addToCart(product._id)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button onClick={() => { addToCart(product._id); navigate('cart') }} className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            {/* ---------------related product------------------------- */}

            <div className='mt-10 flex flex-col items-center '>
                <div className='flex flex-col items-center w-max'>
                <p className='font-semibold text-3xl'><samp className='text-primary'>R</samp>elated Products</p>
                <div className='w-20 h-0.5 bg-primary rounded-b-full mt-2'></div>
                </div>


                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full'>
                   {relatedProducts.filter((product)=> product.inStock).map((product,index)=>(<ProductCard key={index} product={product}></ProductCard>))}
                </div>
                <button onClick={()=>{navigate('/product');scrollTo(0,0)}} className='mx-auto cursor-pointer px-12 my-16 py-2.5 border
                     rounded text-primary hover:bg-primary-dull hover:text-white font-semibold'>See more</button>
            </div>
        </div>
    );
}

export default ProductDetails
