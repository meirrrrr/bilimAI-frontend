"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  HomeIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import dotenv from "dotenv";

dotenv.config();

const ChatComponent = () => {
  const [messages, setMessages] = useState([
    {
      message:
        "Привет! Я твой персонализированный преподаватель по подготовке к эказменам. Как я могу помочь тебе сегодня?",
      sender: "ChatGPT",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSend = async () => {
    const newMessage = {
      message: input,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    console.log(newMessages);
    setTyping(true);
    setInput("");
    await processMessageToChatGpt(newMessages);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  async function processMessageToChatGpt(chatMessages: any) {
    let apiMessages = chatMessages.map((message: any) => {
      let role = "";
      if (message.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: message.message };
    });

    try {
      const systemMessage = {
        role: "system",
        content:
          "Explain things like you're talking to a 5-6 graders that prepares to exams for gifted schools for good pupils on russian.",
      };

      const apiRequestBody = {
        model: "gpt-4",
        messages: [systemMessage, ...apiMessages],
      };

      await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      })
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          setMessages([
            ...chatMessages,
            {
              message: data.choices[0].message.content,
              sender: "ChatGPT",
            },
          ]);
          setTyping(false);
        });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white shadow-md z-50`}
      >
        <div className="pt-4 px-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1CB0F6]">Bilim AI</h1>
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-8 pl-[10px]">
          <Link
            href="/dashboard"
            className="flex items-center p-3 mt-2 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Главная
          </Link>
          <Link
            href="/about-test"
            className="flex items-center p-3 mt-2 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            <BookOpenIcon className="w-5 h-5 mr-2" />
            Тесты
          </Link>
          <Link
            href="/chat"
            className="flex items-center p-3 mt-2 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            <ChartBarIcon className="w-5 h-5 mr-2" />
            AI Chat
          </Link>
          <Link
            href="/profile"
            className="flex items-center p-3 mt-2 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            <UserIcon className="w-5 h-5 mr-2" />
            Профиль
          </Link>
          <Link
            href="/"
            className="flex items-center p-3 mt-2 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            <ArrowLeftEndOnRectangleIcon className="w-5 h-5 mr-2" />
            Выйти
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-grow lg:ml-64">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md lg:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
          <h1 className="text-xl font-bold">AI chat</h1>
          <div className="flex items-center">
            <Link href="/profile">
              <button className="p-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                <UserIcon className="w-6 h-6" />
              </button>
            </Link>
          </div>
        </header>

        {/* Chat Content */}
        <div className="flex flex-col flex-grow p-4 space-y-4 bg-gray-100">
          <div className="flex-grow overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 mb-4 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg shadow ${
                    message.sender === "user"
                      ? "bg-[#1CB0F6] text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {message.message}
                </div>
              </div>
            ))}
          </div>

          {/* Typing Indicator */}
          {typing && (
            <div className="text-sm text-gray-500">
              <em>ChatGPT is пишет...</em>
            </div>
          )}

          {/* Input Area */}
          <div className="flex items-center space-x-2">
            <Textarea
              className="flex-grow border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <Button
              className="bg-[#1CB0F6] text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSend}
              disabled={!input}
            >
              Отправить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatComponent;
