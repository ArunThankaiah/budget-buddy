import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assest/Personal-Finance.jpg'
import {message} from "antd"
import axios from 'axios'

const Register = () => {
    
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})

    const handleSubmit = async(e)=>{
        e.preventDefault()
       if (validateForm()){
        const newUser = {name, phonenumber, email, password} ;
        
       try{
        await axios.post("api/users/register", newUser)
        message.success("Successfuly Register")
        navigate('/login')

       }catch(error){
        message.error("Invalid data please check data again")
       }
       }
        
    }
    const validateForm  = ()=>{
      let isValid = true
      const newError = {}

      if(name.trim()=== ""){
        newError.name = "Name is required"
        isValid = false
      }
      else if(name.length <4 || name.length>10){
        newError.name = "Enter a valid name"
        isValid = false
      }
      if(email.trim() === ""){
        newError.email = "Email is required"
        isValid = false
      }else if (!/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(email)){
        newError.email = "Email is invalide"
        isValid = false
      }
      if(phonenumber.trim()=== ""){
        newError.phonenumber = "Phonenumber is requied"
        isValid = false
      }
      else if(phonenumber.length <10 ){
        newError.phonenumber = "Enter your 10 digit phone number"
        isValid = false
      }
      
      if(password.trim()=== ""){
        newError.password = "Password is requied"
        isValid = false
      }
      else if (password.length <6 || password.length >15){
        newError.password = "Enter a strong password "
        isValid = false
      }
      setError(newError)
      return isValid
    }

    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/')
          }
    },[navigate])

  return (
    <>
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'> 
        <div className='hidden sm:block'>
        <img className='w-full h-full object-cover' src={loginImg} alt='Loginimg'/>
        </div>

        <div className='bg-gray-800 flex flex-col justify-center'>
          <form 
          className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg'
          onSubmit={handleSubmit}
          >

            <h2 className='text-4xl text-white font-bold text-center'>SIGN IN</h2>

            <div className='flex flex-col text-gray-400 py-2'>
              <label>User Name</label>

              <input 
              className='rounded-lg bg-gray-700 mt-2 p-2 focus:bg-gray-800 focus:outline-none' 
              type='text'
              onChange={(e)=>setName(e.target.value)}
              value={name}
              
              />
               {error.name && <p className='text-red-400 text-sm mt-2'>{error.name}</p>}
            </div>

            <div className='flex flex-col text-gray-400 py-2'>
              <label>Phone Number</label>

              <input
               className='rounded-lg bg-gray-700 mt-2 p-2 focus:bg-gray-800 focus:outline-none' 
               type='numper'
               onChange={(e)=>setPhonenumber(e.target.value)}
               value={phonenumber}
               />
                {error.phonenumber && <p className='text-red-400 text-sm mt-2'>{error.phonenumber}</p>}
            </div>

            <div className='flex flex-col text-gray-400 py-2'>
              <label>Email</label>

              <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:bg-gray-800 focus:outline-none' 
              type='email'
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              
              />
               {error.email && <p className='text-red-400 text-sm mt-2'>{error.email}</p>}
            </div>

            <div className='flex flex-col text-gray-400 py-2'>
              <label>Password</label>

              <input
               className='rounded-lg bg-gray-700 mt-2 p-2 focus:bg-gray-800 focus:outline-none' 
               type='password'
               onChange={(e)=>setPassword(e.target.value)}
               value={password}
               />
                {error.password && <p className='text-red-400 text-sm mt-2'>{error.password}</p>}
            </div>
            <div >
              <p className='text-white mt-1'>Already a member <Link className='text-gray-200 no-underline' to ="/login"><span className='text-blue-400 no-underline'>Sign up</span></Link></p>
              
            </div>


            <button type='submit'
             className='w-full my-5 py-2 bg-teal-500  text-white font-medium rounded-md transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-teal-700 duration-300 ...'>
              Sign in
              </button>
           
           
          </form>
        </div>
  </div>
    </>
  )
}

export default Register
