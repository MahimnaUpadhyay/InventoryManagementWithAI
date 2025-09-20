import React from 'react'
import UserPage from './UserPage'
import Navbar from '@/app/components/Navbar'

const page = () => {
  return (
    <>
      <Navbar>
        <UserPage />
      </Navbar>
    </>
  )
}

export default page