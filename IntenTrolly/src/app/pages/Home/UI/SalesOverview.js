import React from 'react'

// Card Import
import Card from '@/app/components/Card'

// React Icons
import { CiLocationOn, CiGlobe } from 'react-icons/ci'; 
import { FaInstagram } from 'react-icons/fa';

const SalesOverview = () => {
    return (
        <div className="flex flex-row justify-between items-center gap-5 bg-gray-100 p-5 rounded-md w-full h-full">
            <Card
                Card_Title={"Offline Store"}
                Icon={<CiLocationOn size={60} />}
                Card_Content={"Something"}
            />
            <Card
                Card_Title={"Online Store"}
                Icon={<CiGlobe size={60} />}
                Card_Content={"Something"}
            />
            <Card
                Card_Title={"Overall Store"}
                Icon={<FaInstagram size={60} />}
                Card_Content={"Something"}
            />
        </div>
    )
}

export default SalesOverview