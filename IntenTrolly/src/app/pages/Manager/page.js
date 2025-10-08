import React from 'react'

import ManagerPage from './ManagerPage.js';
import Sidebar from '@/app/components/Navbar'


const page = () => {
  return (
    <>
      <Sidebar>
        <ManagerPage />
      </Sidebar>
    </>
  )
}

export default page