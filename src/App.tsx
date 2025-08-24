import { useState } from 'react'

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayOut from './Components/AuthLayout/AuthLayOut'
import Login from './Components/Login/Login'
import MasterLayout from './Components/MasterLayout/MasterLayout'
import Home from './Components/Home/Home'
import UsersList from './Components/UsersList/UsersList'
import UserData from './Components/UserData/UserData'
import Profile from './Components/Profile/Profile'
import NotFound from './Components/NotFound/NotFound'
import { ToastContainer } from 'react-toastify'
import MUI from './Components/MUI/MUI'

function App() {
  const routes = createBrowserRouter([
    {
      path:"",
      element:<AuthLayOut/>,
      children:[
        {index:true,element:<Login/>},
        {path:"login",element:<Login/>},
        {path:"mui",element:<MUI/>}
      ],
      errorElement:<NotFound/>

    },
    {
      path:"dashboard",
      element:<MasterLayout/>,
      children:[
        {index:true,element:<Home/>},
        {path:"home",element:<Home/>},
        {path:"userlist",element:<UsersList/>},
        {path:"userdata",element:<UserData/>},
        {path:"profile",element:<Profile/>}
      ],
      errorElement:<NotFound/>
    }
  ])

  return (

    <>
    
      <ToastContainer />

      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
