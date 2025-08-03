import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const Card = ({ Card_Title, Card_Content, Button_Title, Icon }) => {
    return (
        <div className="w-[250px] h-auto p-6 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div className='flex flex-row w-full h-auto justify-between items-center gap-10'>
                <div className='w-20 h-20'>
                    {Icon}
                </div>
                <a href="#">
                    <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">{Card_Title}</h5>
                </a>
            </div>
            <p className="text-lg mt-3 mb-3 font-normal text-gray-700 dark:text-gray-400">{Card_Content}</p>
        </div >
    )
}

export default Card;
