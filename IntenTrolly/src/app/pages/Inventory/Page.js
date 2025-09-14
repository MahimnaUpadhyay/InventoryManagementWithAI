import React from 'react'
import InventoryPage from './InventoryPage'
import Sidebar from '@/app/components/Navbar'

const Page = () => {
  return (
    <>
      <Sidebar>
        <InventoryPage />
      </Sidebar>
    </>
  )
}

export default Page