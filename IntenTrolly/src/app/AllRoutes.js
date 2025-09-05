import React from 'react'
import Navbar from './components/Navbar.js'
import HomePage from './pages/Home/page.js'
import SignUp from '@/app/pages/Auth/Signup/page.js';

const AllRoutes = () => {
  return (
    <>
        {/* <Navbar />
        <HomePage /> */}
        <SignUp />
    </>
  )
}

export default AllRoutes