import React from 'react'

// Card Import
import Card from '@/app/components/Card';

// React Icons
import { CiLocationOn, CiGlobe } from 'react-icons/ci'; 

const InventoryOverview = () => {
    return (
        <>
            <div className="flex flex-row justify-around items-center bg-gray-100 p-5 rounded-md w-full h-full">
                <Card
                    Card_Title={"Total Inventory"}
                    Icon={<CiGlobe size={60} />}
                    Card_Content={"Something"}
                />
                <Card
                    Card_Title={"Total Category"}
                    Icon={<CiLocationOn size={60} />}
                    Card_Content={"Something"}
                />
            </div>
        </>
    )
}

export default InventoryOverview