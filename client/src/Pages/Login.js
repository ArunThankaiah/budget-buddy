import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assest/Personal-Finance.jpg'
import {message} from "antd"
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const newUser = {email, password} ;

       try{
        const {data} = await axios.post("api/users/login", newUser)
        message.success("Successfuly Register")
        localStorage.setItem('user', JSON.stringify({...data, password: ''}))
        navigate('/')

       }catch(error){
        message.error("Incorrect pasword or email ")
       }
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

            <h2 className='text-4xl text-white font-bold text-center'>SIGN UP</h2>

            <div className='flex flex-col text-gray-400 py-2'>

              <label>User Name</label>
              <input
               className='rounded-lg bg-gray-700 mt-2 p-2 focus:bg-gray-800 focus:outline-none' 
               type='text'
               onChange={(e)=>setEmail(e.target.value)}
               value={email}
               />
            </div>

            <div className='flex flex-col text-gray-400 py-2'>
              <label>Password</label>
              <input 
              className='rounded-lg bg-gray-700 mt-2 p-2 focus:bg-gray-800 focus:outline-none' 
              type='password'
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              />
            </div>

            <div >
              <p className='text-white mt-2'>Create a account <Link className='text-gray-200 underline ml-1' to ="/register">Sign in</Link></p>
            </div>

            <button type='submit' className='w-full my-5 py-2 bg-teal-500 shadow-lg text-white font-medium rounded-md transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-teal-700 duration-300 ...'>Sing up</button>

            
          </form>
        </div>
  </div>
    </>
  )
}

export default Login
