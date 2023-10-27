import React from 'react'
import Header from './Header'
//import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <>
     <Header/>
     <div className='Header mb-auto lg:mb-52'>
        {children}
     </div>

    
    </>
  )
}

export default Layout
