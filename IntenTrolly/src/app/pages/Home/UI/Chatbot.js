import React from 'react'

const Chatbot = () => {
  return (
    <>
        <div className="flex w-full h-auto bg-gray-100 justify-center items-center rounded-md p-5">
            <div className="flex flex-row w-full h-[100px] justify-around items-center bg-white rounded-lg shadow-lg gap-5 p-5">
                    <input 
                        placeholder="Hey there!!"
                        className="w-full border-2 p-2 rounded-xl"
                    />
                    <button className="bg-[#2f27ce] rounded-lg w-[100px] h-[30px] text-white">
                        Ask
                    </button>
            </div>
        </div>
    </>
  )
}

export default Chatbot