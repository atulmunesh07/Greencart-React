import React from 'react'
import MainBanner from '../componets/banner/MainBanner'
import Categories from '../componets/categories/Categories'
import BestSeller from '../componets/BestSeller/BestSeller'
import BottomBanner from '../componets/BottomBanner/BottomBanner'
import NewsLetter from '../componets/NewsLetter/NewsLetter'


function Home() {
  return (
    <div>
        <div className='mt-10 '>
            <MainBanner></MainBanner>
            <Categories></Categories>
            <BestSeller></BestSeller>
            <BottomBanner></BottomBanner>
            <NewsLetter></NewsLetter>
           
        </div>
      
    </div>
  )
}

export default Home
