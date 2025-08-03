import React from 'react'

// Card Import
import Card from '@/app/components/Card'

// React Icons
import { BsGraphUpArrow } from 'react-icons/bs'; 

const SalesOverview = () => {
    return (
        <div className="flex flex-row justify-around items-center gap-5 bg-gray-100 p-5 rounded-md w-full h-full">
            <Card
                Card_Title={"Monthly Sales"}
                Icon={<BsGraphUpArrow size={60} color='blue'/>}
                Card_Content={"$100k"}
            />
            <Card
                Card_Title={"Quaterly Sales"}
                Icon={<BsGraphUpArrow size={60} color='blue'/>}
                Card_Content={"$500k"}
            />
        </div>
    )
}

export default SalesOverview