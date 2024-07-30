"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Sidebar from "../../components/SideBar";
import { UserIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import dotenv from "dotenv";

dotenv.config();

const apikey = process.env.OPENAI_API_KEY;

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
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

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
          <h1 className="text-xl font-bold">Чат</h1>
          <div className="flex items-center">
            <Link href="/profile">
              <button className="p-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                <UserIcon className="w-6 h-6" />
              </button>
            </Link>
          </div>
        </header>

        {/* Chat Content */}
        <div className="flex flex-col flex-grow bg-gray-200 rounded-lg">
          <div className="overflow-y-scroll p-6 space-y-4 flex-grow bg-gray-200 rounded-lg lg:px-[200px]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 ${
                  message.sender === "user" ? "justify-end" : ""
                }`}
              >
                {message.sender === "ChatGPT" && (
                  <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center">
                    <BotIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
                <div
                  className={`rounded-lg p-4 max-w-[70%] ${
                    message.sender === "ChatGPT"
                      ? "bg-green-200 text-green-800"
                      : "bg-blue-200 text-blue-800"
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                </div>
                {message.sender === "user" && (
                  <div className="bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="px-6 py-[20px] bg-white">
            <div className="flex justify-center items-center relative w-full md:w-3/4 lg:w-2/3 mx-auto">
              <Textarea
                placeholder="Напиши свое сообщение..."
                name="message"
                id="message"
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16 w-full"
              />
              <Button
                type="button"
                size="icon"
                className="absolute w-8 h-8 top-3 right-3 bg-[#1CB0F6] hover:bg-[#1390c4] transition-colors"
                onClick={handleSend}
              >
                <SendIcon className="w-4 h-4 text-white" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function BotIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

function SendIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export default ChatComponent;
