import React from 'react'

import Sidebar from '@/app/components/Navbar'
import SuppliersPage from './SuppliersPage'

const Page = () => {
  return (
   <>
      <Sidebar>
        <SuppliersPage/>
      </Sidebar>
   </>
  )
}

export default Page