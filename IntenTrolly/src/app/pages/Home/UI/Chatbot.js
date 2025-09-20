"use client";

import React from "react";
import axios from "axios";
import { ML_BASE_URL } from "@/app/utility/API_END_POINT/Base_URL";
import { askQuestion } from "@/app/utility/API_END_POINT/Chatbot_End_Point";

const Chatbot = () => {
  const [chatbot, setChatbot] = React.useState({ question: "" });

  const askChatbot = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${ML_BASE_URL}${askQuestion}`, chatbot);
      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const onQuestionChange = () => {
    setChatbot({ ...chatbot, question: e.target.value });
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-5">
      <form
        onSubmit={askChatbot}
        className="flex items-center gap-3 w-full"
      >
        <input
          placeholder="Ask me anything..."
          type="text"
          value={chatbot.question}
          onChange={onQuestionChange}
          className="flex-1 border-2 border-gray-200 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
        />
        <button
          type="submit"
          className="bg-primary hover:bg-accent transition-colors px-4 py-2 rounded-lg text-white font-medium"
        >
          Ask
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
