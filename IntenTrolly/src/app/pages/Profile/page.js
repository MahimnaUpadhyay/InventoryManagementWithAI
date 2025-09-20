import React from 'react'
import ProfilePage from './ProfilePage'
import Navbar from '@/app/components/Navbar'

const page = () => {
    return (
        <>
            <Navbar>
                <ProfilePage />
            </Navbar>
        </>
    )
}

export default page