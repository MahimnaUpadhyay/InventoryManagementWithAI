import React from 'react'

import HomePage from './HomePage'
import Sidebar from '@/app/components/Navbar'


const page = () => {
  return (
    <>
      <Sidebar>
        <HomePage />
      </Sidebar>
    </>
  )
}

export default page