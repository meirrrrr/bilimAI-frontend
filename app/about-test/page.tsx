"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TestSelection = () => {
  const router = useRouter();
  const [testType, setTestType] = useState("nis");
  const [userId, setUserId] = useState("");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTestTypeChange = (event: any) => {
    setTestType(event.target.value);
  };

  const handleStartTest = async () => {
    try {
      const userId = localStorage.getItem("user");
      const userString = userId ? JSON.parse(userId) : null;
      console.log("Test started");
      router.push(`/test?type=${testType}&id=${userString._id}`);
    } catch (error) {
      console.error("Error starting test:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center">
            <BotIcon className="w-5 h-5 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-[#1CB0F6] w-[100px]">
            Bilim AI
          </h2>
          <button
            className="text-gray-500 top-4 right-4 p-2 rounded-md ml-[130px]"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
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
      </header>
      <div className="flex flex-col items-center justify-center mt-[80px] p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Выбери тип теста</h1>
          <p className="mb-4 text-gray-700">
            В тесте будет 40 вопросов по математике, 20 вопросов по логике, и 20
            вопросов на грамотность чтения.
          </p>
          <div className="mb-4">
            <label className="mr-4">
              <input
                type="radio"
                value="nis"
                checked={testType === "nis"}
                onChange={handleTestTypeChange}
                className="mr-2"
              />
              НИШ
            </label>
            <label>
              <input
                type="radio"
                value="ktl"
                checked={testType === "ktl"}
                onChange={handleTestTypeChange}
                className="mr-2"
              />
              КТЛ
            </label>
          </div>
          <button
            onClick={handleStartTest}
            className="bg-[#1CB0F6] text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Начни тест
          </button>
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
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

export default TestSelection;
