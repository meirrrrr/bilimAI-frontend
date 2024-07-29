"use client";
import { useState } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import logo from "../utils/logo.svg";
import Image from "next/image";

const apikey = process.env.OPENAI_API_KEY;

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      message:
        "Привет! Я твой персонализированный преподаватель по подготовке к эказменам. Как я могу помочь тебе сегодня?",
      sender: "ChatGPT",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

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

  async function processMessageToChatGpt(chatMessages: any) {
    let apiMessages = chatMessages.map((message: any) => {
      let role = "";
      if (message.sender == "ChatGpt") {
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
        model: "gpt-3.5-turbo",
        messages: [systemMessage, ...apiMessages],
      };

      await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      })
        .then((data) => {
          return data.json();
        })
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  {
  }
  return (
    <div className="flex flex-col h-[100vh] max-w-2xl mx-auto bg-background rounded-lg shadow-lg w-full">
      <header className="w-full bg-gray-200 shadow px-3">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-[12px]">
            <Image src={logo} alt="logo" className="w-[30px]" />
            <h1 className="text-2xl font-bold text-[#1CB0F6]">Bilim AI</h1>
          </div>
          <button
            className="text-gray-500 top-4 right-4 z-50 p-2 rounded-md"
            onClick={toggleMenu}
          >
            {isMenuOpen ? "" : <MenuIcon />}
          </button>
        </div>
      </header>
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-4">
          <button className="text-white" onClick={toggleMenu}>
            <XIcon />
          </button>
          <Link href="/profile">
            <button className="mt-4 w-full bg-[#1CB0F6] text-white py-2 px-4 rounded-lg">
              Мой профиль
            </button>
          </Link>
          <Link href="/about-test">
            <button className="mt-4 w-full bg-[#1CB0F6] text-white py-2 px-4 rounded-lg">
              Начать тест
            </button>
          </Link>
          <Link href="/lessons">
            <button className="mt-4 w-full bg-[#1CB0F6] text-white py-2 px-4 rounded-lg">
              Уроки
            </button>
          </Link>
          <Link href="/chat">
            <button className="mt-4 w-full bg-[#1CB0F6] text-white py-2 px-4 rounded-lg">
              AI ассистент
            </button>
          </Link>
          <Link href="/">
            <button className="mt-4 w-full bg-[#1CB0F6] text-white py-2 px-4 rounded-lg">
              Выйти
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="overflow-y-scroll p-6 space-y-4 h-[506px]">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 ${
                message.sender === "user" ? "justify-end" : ""
              }`}
            >
              {message.sender === "ChatGPT" && (
                <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
                  <BotIcon className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
              <div
                className={`rounded-lg p-4 max-w-[70%] bg-gray-200 ${
                  message.sender === "ChatGpt"
                    ? "bg-muted"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <p className="text-sm">{message.message}</p>
              </div>
              {message.sender === "user" && (
                <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="border-t px-6 py-4 bg-gray-200">
          <div className="relative">
            <Textarea
              placeholder="Напиши свое сообщение..."
              name="message"
              id="message"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16"
            />
            <Button
              type="button"
              size="icon"
              className="absolute w-8 h-8 top-3 right-3 bg-[#1CB0F6]"
              onClick={handleSend}
            >
              <SendIcon className="w-4 h-4 text-white" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

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

function MenuIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      color="#1CB0F6"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
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

function UserIcon(props: any) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function XIcon(props: any) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
