import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios'

axios.defaults.withCredentials=true
//backend connection to clint
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL


export const AppContext = createContext();

export const AppContextPovider = ({ children }) => {

  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSllar, setIsSllar] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);


  //fetch seller states

   const fetchSeller = async ()=>{
    try{
       const {data} =  await axios.get('/api/seller/is-auth')// they can het the Backend seller state
       if(data.success){
        setIsSllar(true)
       }
       else{
        setIsSllar(false)
       }
    }catch (error) {
      setIsSllar(false)
    }
   
   }

  //  Fetch userAuth state, and cart
  const fetchUSer = async ()=>{
    try{
     const {data} = await axios.get('/api/user/is-auth')
     if(data.success){
      setUser(true)
      setUser(data.user)
      setCartItems(data.user.cartItems)
     }
    }catch(error){
      setUser(null)
      

    }
  }


  //seller 
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState({})

  // search query
  const [searchQuery, setSearchQuery] = useState({});

  //
  
// fetch product to the database
  const fetchProduct = async () => {
    try{
      const {data} = await axios.get('/api/product/list')
      if(data.success){
        setProducts(data.product)
      }else{
        toast.error(data.message)
      }

    }catch(error){
      toast.error(error.message)

    }


    // setProducts to the backend data to fetch
  }
  useEffect(() => {
    fetchUSer()
    fetchSeller()
    fetchProduct()
    
  }, [])

  //add to cart to Backend update function
  useEffect(()=>{
      const updateCart= async () =>{
    try{
    const {data} = await axios.post('/api/cart/update',{cartItems})
    if(!data.success){
      toast.error(data.message)
    }
  }catch (error){
    toast.error(data.message)
  }

  }
  if(user){
    updateCart()
  }


  },[cartItems])
  // end cat Items

  // Add to cart
  const addToCart = (itemId) =>{
    let cartData = structuredClone(cartItems)
    if(cartData[itemId]){
      cartData[itemId] += 1
    }
    else{
      cartData[itemId] = 1
    }
    setCartItems(cartData)
    toast.success('Added to cart successfully');
  }

  //update cart 
  const updateCart =(itemId,quantity)=>{
    let cartData =structuredClone(cartItems)
    cartData[itemId] =quantity
    setCartItems(cartData)
    toast.success('Cart updated successfully');

  }

  // Remove from cart

  const removeCartData = (itemId)=>{
    let cartData = structuredClone(cartItems)
    if(cartData[itemId]){
      cartData[itemId] -= 1
      if(cartData[itemId]=== 0){
        delete cartData[itemId]

      }

    }
    toast.success('Removed from cart successfully');
    setCartItems(cartData)

  }

  // get total data cart
  const getCartCount =()=>{
    let totalCount = 0
    for(const item in cartItems ){
      totalCount += cartItems[item]

    }
    return totalCount;
  }
  //end

  //total amount 
  const  getCardAmount = ()=>{
    let totalAmount = 0
    for(const items in cartItems){
      let itemInfo = products.find((product)=>product._id === items)
      if(cartItems[items] > 0){
        totalAmount += itemInfo.offerPrice * cartItems[items]
      }

    }
    return Math.floor(totalAmount*100)/100
  }
  //end

  const value = {
    navigate,
    user,
    setUser,
    isSllar,
    setIsSllar,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    cartItems,
    setCartItems,
    addToCart,
    updateCart,
    removeCartData,
    searchQuery,
    setSearchQuery,
    getCardAmount,
    getCartCount,
    // npm i axios to used api
    axios,
    fetchSeller,
    fetchProduct,
   



  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export const useAppContext = () => {
  return useContext(AppContext);
};
