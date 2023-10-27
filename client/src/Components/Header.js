import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const [loginUser, setLoginUser] = useState('')

 useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      setLoginUser(user)
    }
  },[])

  const logoutHandle = ()=>{
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <>
      <div className='p-5 bg-gray-700 '>
        <div className='container px-2  lg:px-10'>
          <div className='flex'>
              <h3 className='text-1xl font-border-0 lg:text-3xl font-bold text-white mr-5 cursor-pointer'>Budget Buddy</h3>
              <div className='flex ml-auto my-auto'> 

              <div className='flex  ml-auto pr-5 '>
                <p className='flex my-auto mr-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-6 h-6 text-white mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>

                  <span className='text-white'>{loginUser && loginUser.name}</span>
                  
                  </p>
              <button onClick={logoutHandle} className='hidden lg:flex px-3 py-2 bg-teal-500 text-white font-medium rounded-md transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-teal-700 duration-300 ...'>
                <span className='pr-1 '>Sign out</span>
              </button>
              <button onClick={logoutHandle} className='text-white lg:hidden' >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-6 h-6  ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
              </button>

              </div>

              </div>
          </div>
         
        </div>

      </div>

    </>
  )
}

export default Header
