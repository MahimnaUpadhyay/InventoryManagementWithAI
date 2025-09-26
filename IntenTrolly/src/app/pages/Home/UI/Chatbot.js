"use client";

import React from "react";
import axios from "axios";
import { ML_BASE_URL } from "@/app/utility/API_END_POINT/Base_URL";
import { askQuestion } from "@/app/utility/API_END_POINT/Chatbot_End_Point";

const Chatbot = () => {
  const [chatbot, setChatbot] = React.useState({ question: "" });
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const askChatbot = async (e) => {
    e.preventDefault();
    if (!chatbot.question.trim()) return;

    const userQuestion = chatbot.question.trim();

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: userQuestion }]);
    setChatbot({ question: "" });
    setLoading(true);

    try {
      const response = await axios.post(`${ML_BASE_URL}${askQuestion}`, {
        question: userQuestion,
      });

      // Add bot response
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: response.data.answer || "No response" },
      ]);

      // console.log(response.data);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "error", text: error.response?.data || "Something went wrong" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onQuestionChange = (e) => {
    setChatbot({ ...chatbot, question: e.target.value });
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4 h-[400px]">
      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.role === "user"
                ? "bg-primary text-white self-end ml-auto"
                : msg.role === "bot"
                ? "bg-gray-100 text-gray-800 self-start"
                : "bg-red-100 text-red-800 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Thinking...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={askChatbot} className="flex items-center gap-3">
        <input
          placeholder="Ask me anything..."
          type="text"
          value={chatbot.question}
          onChange={onQuestionChange}
          disabled={loading}
          className="flex-1 border-2 border-gray-200 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-accent transition-colors px-4 py-2 rounded-lg text-white font-medium disabled:opacity-50"
        >
          Ask
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
