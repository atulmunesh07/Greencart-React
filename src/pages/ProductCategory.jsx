import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router'
import { categories } from '../../public/assets'
import ProductCard from '../componets/BestSeller/ProductCard'

function ProductCategory() {
    const { products } = useAppContext()
    const { category } = useParams()

    const searchCategory = categories.find((item) => item.path.toLowerCase() === category)

    const filteredProducts = products.filter((product) => product.category.toLowerCase() === category)
    return (
        <div className='mt-16'>
            { searchCategory && (
                <div className='flex flex-col items-end w-max'>
                    <p className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</p>
                    {/* under line to use them */}
                    <div className='w-16 h-0.5 bg-primary rounded-b-full'> </div>
                    {/* end */}
                </div>
            )}
            {filteredProducts.length > 0 ?
             (<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
             lg:grid-cols-5 gap-3 md:gap-6 mt-6'>
                {filteredProducts.map((product)=>(
                    <ProductCard key={product._id} product={product}></ProductCard>
                ))}
             </div>):
             
             (
                <div className='flex items-center justify-center h-[60vh]'>
                    <p className=''> No Data found</p>
                    
                    </div>
            )}

        </div>
    )
}

export default ProductCategory
