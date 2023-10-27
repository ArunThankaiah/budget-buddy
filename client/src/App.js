import React from 'react'
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Register from './Pages/Register'
import Login from './Pages/Login'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

      <Route path='/' element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>

      </Routes>

    </BrowserRouter>
  )
}
export function ProtectedRoute(props){
  if(localStorage.getItem("user")){
    return props.children
  }else{
    return <Navigate to='/login'/>
  }
}


export default App
