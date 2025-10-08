import React from 'react'

import EmployeePage from './EmployeePage'
import Sidebar from '@/app/components/Navbar'


const page = () => {
  return (
    <>
      <Sidebar>
        <EmployeePage />
      </Sidebar>
    </>
  )
}

export default page