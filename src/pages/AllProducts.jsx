import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../componets/BestSeller/ProductCard'

function AllProducts() {
    const { products, searchQuery } = useAppContext()
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilteredProducts(products.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        }
        else {
            setFilteredProducts(products)
        }

    }, [products, searchQuery])
    return (
        <div className='mt-16 flex flex-col'>
            {/* title */}
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium uppercase'> <span className='text-primary font-semibold'>All</span> Products</p>

                <div className='w-16 h-0.5 bg-primary rounded-b-full'></div>
            </div>
            {/* container for all product */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
                {
                    filteredProducts.filter((product) => product.inStock).map((prompt, index) => (
                        <ProductCard key={index} product={prompt}></ProductCard>
                    ))
                }


            </div>


        </div>
    )
}

export default AllProducts
