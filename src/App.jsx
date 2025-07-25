import React from 'react'
import NavBar from './componets/navBar/NavBar'
import Home from './pages/Home'
import { Route, Routes } from 'react-router'
import { useLocation } from 'react-router'
import { Toaster } from 'react-hot-toast';

import Footer from './componets/footer/Footer'
import { useAppContext } from './context/AppContext'
import Login from './componets/Login/Login'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/Addresh'
import MyOrder from './pages/MyOrder'
import SellerLogIn from './componets/selar/SellerLogIn'
import SellerLayOut from './pages/seller/SellerLayOut'
import AddProduct from './pages/seller/sellerPages/AddProduct'
import ProductList from './pages/seller/sellerPages/ProductList'
import Orders from './pages/seller/sellerPages/Orders'

function App() {
  const isSellerPath = useLocation().pathname.includes('seller')
  const { showUserLogin, isSllar } = useAppContext()
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {isSellerPath ? null : (<NavBar></NavBar>)}
      {showUserLogin ? <Login></Login> : null}
      <Toaster></Toaster>

      <div className={` ${isSellerPath ? "" : "px-6 md:-16 lg:px-24 xl:px-32"}`}>
        <Routes >
          <Route path='/' element={<Home></Home>} />
          <Route path='/product' element={<AllProducts></AllProducts>} />
          <Route path='/product/:category' element={<ProductCategory></ProductCategory>} />
          <Route path='/product/:category/:id' element={<ProductDetails></ProductDetails>} />
          <Route path='/cart' element={<Cart></Cart>} />
          <Route path='/add-address' element={<AddAddress></AddAddress>} />
          <Route path='/my-orders' element={<MyOrder />} />
          <Route path='/seller' element={isSllar ? <SellerLayOut></SellerLayOut> : <SellerLogIn></SellerLogIn>}>
           {/* seller folder path */}
          <Route index element={isSllar ? <AddProduct></AddProduct> : null} />
          <Route path='product-list' element={<ProductList></ProductList>} />
          <Route path='order' element={<Orders></Orders>} />
          
          </Route>

         



        </Routes>
      </div>
      <div>
        {!isSellerPath && <Footer></Footer>}
      </div>


    </div>
  )
}

export default App
