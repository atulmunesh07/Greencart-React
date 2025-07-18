import React, { useContext, useState } from 'react'
import { assets } from '../../public/assets'
import {  useAppContext} from '../context/AppContext'

// Input filed
// const InputFields = ({ type, name, placeholder, handleChang, address }) => {
//   <input
//     className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
//     type={type}
//     name={name}
//     placeholder={placeholder}
//     onChange={handleChang}

//     required

//   />
// }


function AddAddress() {
  const [firstName,setFirstname]= useState("")
const [lastName,setLastName] = useState('')
const [email,setEmail] = useState('')
const [street,setStreet] = useState('')
const [city,setCity] = useState('')
const [zipcode,setZipcode] = useState('')
const [country,setCountry] = useState('')
const [phone,setPhone] = useState('')
const[state,setState] = useState('')

 const {axios} =useAppContext()
  

  const onSumitHandler = async (e) => {
    e.preventDefault()
    try{
       const productData = {
                firstName,
                lastName,
                email,
                state,
                city,
                zipcode,
                country,
                phone,
                street

              }
       const formData = new FormData()
             
              const {data} = await axios.post('/api/address/add',formData)

              if(data.success){
                toast.success(data.message)
                setFirstname("")
                setLastName("")
                setEmail("")
                setStreet("")
                setCity('')
                setZipcode("")
                setPhone('')
                setCountry('')
                setState('')
              }else{
                toast.error(data.message)
              }
      // const {data} = await axios.post()

    }catch (error){
       toast.error(data.message)

    }
  }

  return (
    <div className='mt-16 pd-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping
        <span className='font-semibold text-primary'>  Address</span></p>

      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
          <form onSubmit={onSumitHandler} className='space-y-4 mt-6 text-sm'>
            <div className='grid grid-cols-2 gap-2'>
              <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
                type="text"
                placeholder='Enter your name'
                onChange={(e)=>setFirstname(e.target.value)}
                value={firstName}
              />
              <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
                type="text"
                placeholder='Enter your name'
                 onChange={(e)=>setLastName(e.target.value)}
                value={lastName}
              />

            </div>
            <div  className='grid  gap-2'>
                <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
                type="email"
                placeholder='Enter your email'
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
              />

               <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
                type="text"
                placeholder='Enter your street'
                onChange={(e)=>setStreet(e.target.value)}
                value={street}
              />
            </div>

            <div className='grid grid-cols-2 gap-2'>
               <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
                type="text"
                placeholder='Enter your city'
                 onChange={(e)=>setCity(e.target.value)}
                value={city}
              />
               <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
                type="text"
                placeholder='Enter your country'
                 onChange={(e)=>setCountry(e.target.value)}
                value={country}
              />
            </div>

              <div className='grid grid-cols-2 gap-2'>
               <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
                type="text"
                placeholder='Enter your zipcode'
                 onChange={(e)=>setZipcode(e.target.value)}
                value={zipcode}
              />
               <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
                type="text"
                placeholder='Enter your state'
                 onChange={(e)=>setState(e.target.value)}
                value={state}

              />
            </div>

             <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
                type="Number"
                placeholder='Phone No'
                 onChange={(e)=>setPhone(e.target.value)}
                value={phone}
                
              />

              <button onSubmit={onSumitHandler} className='bg-primary hover:bg-primary-dull w-full h-12'>SAVE ADDRESS</button>


            
          </form>

        </div>
        <img src={assets.add_address_iamge} alt="address" className='md:mr-16 md-16 md:mt-0' />

      </div>

    </div>
  )
}

export default AddAddress
