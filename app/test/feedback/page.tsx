"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const Feedback = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [feedback, setFeedback] = useState("") || null;
  const [sum, setSum] = useState("") || null;
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  useEffect(() => {
    const feedback = localStorage.getItem("feedback");
    const sum = localStorage.getItem("sum");
    console.log(feedback);

    setFeedback(feedback!);
    setSum(sum!);

    setFeedback(feedback || "");
    setCorrectAnswersCount(Number(sum) || 0);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-scree flex flex-col items-center">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
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
            {isMenuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-40`}
        >
          <div className="p-4">
            <button className="text-white" onClick={toggleMenu}>
              <XIcon className="w-6 h-6" />
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
      <div className="max-w-xl w-full p-8 rounded-lg shadow-md mt-10">
        <h1 className="text-3xl font-semibold mb-4">Фидбэк</h1>
        <p className="mb-6">{feedback}</p>
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-gray-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold">{Number(sum) * 10}%</span>
              </div>
            </div>
            <div
              className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-orange-400 transform -rotate-90 origin-center"
              style={{
                clip: `rect(0px, ${
                  24 * (correctAnswersCount / 10)
                }px, 24px, 0px)`,
              }}
            ></div>
          </div>
        </div>
        <p className="text-center font-medium">Keep pushing forward!</p>
        <div className="flex justify-center mt-4">
          <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16v-1a4 4 0 014-4h1m1 1v1a4 4 0 014 4v1m0 0h-1a4 4 0 01-4-4v-1m0 0h1a4 4 0 014 4v1m0 0v1m-7-8H5m0 0H4v1m1 0h1a4 4 0 014-4V4m0 0V3a4 4 0 00-4-4h-1m-1 1H4v1m0 0v1m-1 0h1v1m0 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1m-7 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1m-7 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1m-7 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1m-7 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1m-7 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1m-7 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1m-7 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1m-7 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1m-7 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1m-7 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1"
              />
            </svg>
            Share
          </button>
        </div>
      </div>
      <div className="max-w-2xl w-full p-8 rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-semibold mb-4">Topics</h2>
        <div className="p-4 rounded-lg mb-4 border-2">
          <div className="flex justify-between">
            <span>Angles and Angle Measurement</span>
            <span>4 out of 10</span>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Questions</h2>
        <p className="mb-6">
          The following section shows the questions and your answers grouped by
          topic. Review each question by expanding the question. Incorrect
          answers are shown allowing the user to see the explanation. Explore
          tutors for further assistance.
        </p>
        <div className="border-2 p-4 rounded-lg mb-4">
          <div className="flex justify-between">
            <span className="flex items-center">
              <svg
                className="w-6 h-6 text-red-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              1. A straight angle measures:
            </span>
            <span className="cursor-pointer">&#9660;</span>
          </div>
          {/* Expandable content here */}
        </div>
        <div className="border-2 p-4 rounded-lg mb-4">
          <div className="flex justify-between">
            <span className="flex items-center">
              <svg
                className="w-6 h-6 text-red-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              2. What is the sum of the interior angles of a triangle?
            </span>
            <span className="cursor-pointer">&#9660;</span>
          </div>
          {/* Expandable content here */}
        </div>
        <div className="border-2 p-4 rounded-lg mb-4">
          <div className="flex justify-between">
            <span className="flex items-center">
              <svg
                className="w-6 h-6 text-green-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              3. What type of angle measures between 90 and 180 degrees?
            </span>
            <span className="cursor-pointer">&#9660;</span>
          </div>
          {/* Expandable content here */}
        </div>
        <div className="border-2 p-4 rounded-lg mb-4">
          <div className="flex justify-between">
            <span className="flex items-center">
              <svg
                className="w-6 h-6 text-red-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              4. If two angles are complementary, what is the sum of their
              measures?
            </span>
            <span className="cursor-pointer">&#9660;</span>
          </div>
          {/* Expandable content here */}
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

export default Feedback;
