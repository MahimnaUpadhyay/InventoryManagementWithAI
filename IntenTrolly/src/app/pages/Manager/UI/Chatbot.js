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

    setMessages((prev) => [...prev, { role: "user", text: userQuestion }]);
    setChatbot({ question: "" });
    setLoading(true);

    try {
      const response = await axios.post(`${ML_BASE_URL}${askQuestion}`, {
        question: userQuestion,
      });

      const data = response?.data || {};
      const mode = data.mode || "qa";
      const intent = data.intent || null;
      const products = Array.isArray(data.products) ? data.products : [];
      const confidence = data.confidence ?? null;

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          mode,
          intent,
          products,
          confidence,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "error",
          text:
            error?.response?.data?.error ||
            error?.response?.data ||
            "Something went wrong",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onQuestionChange = (e) => {
    setChatbot({ ...chatbot, question: e.target.value });
  };

  // Small helper: pretty label for known intents
  const getIntentLabel = (intent) => {
    switch (intent) {
      case "highest_sales":
        return "Top selling products";
      case "low_stock":
        return "Low stock products";
      case "cheapest":
        return "Cheapest products";
      case "expensive":
        return "Most expensive products";
      case "out_of_stock":
        return "Out of stock products";
      case "discontinued":
        return "Discontinued products";
      default:
        return "Matched products";
    }
  };

  return (
    <div className="w-full h-[400px] max-w-xl mx-auto rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl border border-slate-700/70 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-700/60 flex items-center justify-between bg-slate-900/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-[var(--primary)] flex items-center justify-center shadow-lg shadow-[rgba(147,204,73,0.55)]">
            <span className="text-[var(--background)] text-lg font-semibold">
              AI
            </span>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-50 tracking-wide">
              Inventory Assistant
            </h2>
            <p className="text-[11px] text-slate-400">
              Ask anything about your grocery inventory
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border ${loading
                ? "border-[var(--primary)]/40 bg-[var(--primary)]/10 text-[var(--primary)]"
                : "border-slate-600 bg-slate-800/80"
              }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${loading ? "bg-[var(--primary)] animate-pulse" : "bg-slate-500"
                }`}
            ></span>
            {loading ? "Thinking..." : "Online"}
          </span>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto bg-gradient-to-b from-slate-900/80 to-slate-950">
        {messages.length === 0 && !loading && (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 text-xs gap-2">
            <div className="h-10 w-10 rounded-2xl bg-slate-800 flex items-center justify-center mb-1">
              <span className="text-slate-300 text-lg">💬</span>
            </div>
            <p className="font-medium text-slate-200">
              Start a conversation with your assistant
            </p>
            <p className="max-w-xs">
              Try asking: “Show products with low stock” or “Which item has the
              highest sales?”
            </p>
          </div>
        )}

        {messages.map((msg, i) => {
          const isUser = msg.role === "user";
          const isError = msg.role === "error";
          const isBot = msg.role === "bot";

          return (
            <div
              key={i}
              className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="mr-2 mt-5">
                  <div className="h-7 w-7 rounded-xl bg-slate-800 flex items-center justify-center text-[11px] text-slate-300">
                    {isError ? "!" : "AI"}
                  </div>
                </div>
              )}

              <div className="max-w-[78%] space-y-2">
                {/* Main bubble text */}
                <div
                  className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${isError
                      ? "bg-rose-500/10 text-rose-200 border border-rose-500/40"
                      : isUser
                        ? "bg-[var(--primary)] text-[var(--background)] rounded-br-sm"
                        : "bg-slate-800/90 text-slate-100 border border-slate-700/70 rounded-bl-sm"
                    }`}
                >
                  {msg.text}
                </div>

                {/* Intent products panel */}
                {isBot &&
                  msg.mode === "intent" &&
                  Array.isArray(msg.products) &&
                  msg.products.length > 0 && (
                    <div className="rounded-2xl border border-[var(--primary)]/30 bg-slate-900/80 px-3 py-2.5 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[var(--primary)]/20 text-[10px] text-[var(--primary)] font-semibold">
                            {msg.products.length}
                          </span>
                          <p className="text-[11px] font-semibold text-[var(--secondary)]">
                            {getIntentLabel(msg.intent)}
                          </p>
                        </div>
                        {typeof msg.confidence === "number" && (
                          <span className="text-[10px] text-slate-400">
                            {(msg.confidence * 100).toFixed(0)}% match
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {msg.products.map((p, idx) => (
                          <div
                            key={p + idx}
                            className="flex items-center gap-2 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 px-2 py-1 transition-colors"
                          >
                            <span className="flex items-center justify-center h-5 w-5 rounded-full bg-[var(--primary)]/15 text-[10px] font-semibold text-[var(--primary)]">
                              {idx + 1}
                            </span>
                            <span className="text-[11px] text-slate-100 truncate">
                              {p}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs mt-2">
            <div className="flex gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.1s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
            </div>
            <span>Generating a response…</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={askChatbot}
        className="px-4 py-3 border-t border-slate-800 bg-slate-900/95 backdrop-blur flex items-center gap-2"
      >
        <div className="flex-1 flex items-center gap-2 rounded-2xl bg-slate-800/80 border border-slate-700 px-3 py-1.5 shadow-inner shadow-black/30">
          <input
            placeholder="Ask about stock, prices, or sales..."
            type="text"
            value={chatbot.question}
            onChange={onQuestionChange}
            disabled={loading}
            className="flex-1 bg-transparent outline-none border-none text-xs text-slate-100 placeholder:text-slate-500"
          />
          {!loading && (
            <span className="text-[10px] text-slate-500 hidden sm:inline">
              Press Enter to send
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-2xl bg-[var(--primary)] hover:bg-[var(--accent)] disabled:bg-[var(--secondary)]/60 text-xs font-semibold text-[var(--text)] px-3 py-2 shadow-lg shadow-[rgba(147,204,73,0.55)] transition-colors"
        >
          {loading ? (
            <div className="h-4 w-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span className="hidden sm:inline mr-1">Ask</span>
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 17L17 10L3 3L3.5 8.5L11 10L3.5 11.5L3 17Z"
                  fill="currentColor"
                />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
