import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Card = ({ Card_Title, Card_Content, Button_Title, Icon }) => {
  return (
    <div className="w-[280px] h-auto p-6 bg-white border border-gray-200 rounded-2xl shadow-md 
      hover:shadow-xl transition-all duration-300 flex flex-col justify-between dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
      
      {/* Icon + Title */}
      <div className="flex flex-row items-center gap-4">
        <div className="flex items-center justify-center w-14 h-14 p-2 rounded-xl bg-secondary text-text shadow">
          {Icon}
        </div>
        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {Card_Title}
        </h5>
      </div>

      {/* Content */}
      <p className="text-base mt-4 mb-6 font-normal text-gray-700 dark:text-gray-300 leading-relaxed">
        {Card_Content}
      </p>

      {/* Button (if provided) */}
      {Button_Title && (
        <button
          className="flex items-center justify-between px-4 py-2 bg-primary text-white rounded-lg 
            hover:bg-accent transition-colors duration-200 font-medium shadow-sm"
        >
          {Button_Title}
          <FaArrowRight className="ml-2" />
        </button>
      )}
    </div>
  );
};

export default Card;
