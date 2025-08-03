import React from 'react'

// Card Import
import Card from '@/app/components/Card';

// React Icons
import { MdInventory2 } from 'react-icons/md'; 

const InventoryOverview = () => {
    return (
        <>
            <div className="flex flex-row justify-around items-center bg-gray-100 p-5 rounded-md w-full h-full">
                <Card
                    Card_Title={"Total Inventory"}
                    Icon={<MdInventory2 size={60} color='blue'/>}
                    Card_Content={"10k products"}
                />
                <Card
                    Card_Title={"Total Category"}
                    Icon={<MdInventory2 size={60} color='blue'/>}
                    Card_Content={"100 unique category"}
                />
            </div>
        </>
    )
}

export default InventoryOverview