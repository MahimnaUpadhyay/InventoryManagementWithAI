import React from 'react'
import SalesPage from './SalesPage'
import Sidebar from '@/app/components/Navbar'

const Page = () => {
  return (
    <>
      <Sidebar>
        <SalesPage />
      </Sidebar>
    </>
  )
}

export default Page