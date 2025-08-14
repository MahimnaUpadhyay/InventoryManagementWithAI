"use client"

import React from 'react'

// For API
import axios from 'axios'
import { ML_BASE_URL } from '@/app/utility/Base_URL'
import { askQuestion } from '@/app/utility/Chatbot_End_Point'

const Chatbot = () => {
  const [chatbot, setChatbot] = React.useState("")

  const askChatbot = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${ML_BASE_URL}${askQuestion}`, chatbot)
      console.log(response.data)
    } catch (error) {
      console.error(error.response?.data || error.message)
    }
  }

  return (
    <div className="flex w-full h-auto bg-gray-100 justify-center items-center rounded-md p-5">
      <div className="flex flex-row w-full h-[100px] justify-around items-center bg-white rounded-lg shadow-lg gap-5 p-5">
        <input 
          placeholder="Hey there!!"
          type='text'
          value={chatbot}
          onChange={(e) => setChatbot(e.target.value)}
          className="w-full border-2 p-2 rounded-xl"
        />
        <button 
          onClick={askChatbot} 
          className="bg-[#2f27ce] rounded-lg w-[100px] h-[30px] text-white hover:cursor-pointer"
        >
          Ask
        </button>
      </div>
    </div>
  )
}

export default Chatbot
