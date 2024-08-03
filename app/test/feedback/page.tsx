"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CalendarIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  HomeIcon,
  BookOpenIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Feedback = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [feedback, setFeedback] = useState("") || null;
  const [sum, setSum] = useState("") || null;
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const [test, setTest] = useState({});

  useEffect(() => {
    const feedback = localStorage.getItem("feedback");
    const sum = localStorage.getItem("sum");
    setFeedback(feedback!);
    console.log(sum);
    setSum(sum!);
    setFeedback(feedback || "");
    setCorrectAnswersCount(Number(sum) || 0);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex h-screen">
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
      <div className="flex flex-col flex-grow lg:ml-64">
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
          <h1 className="text-xl font-bold">Фидбэк</h1>
          <div className="flex items-center">
            <Link href="/profile">
              <button className="p-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                <UserIcon className="w-6 h-6" />
              </button>
            </Link>
          </div>
        </header>
        <div className="min-h-screen flex flex-col items-center py-10">
          <div className="max-w-xl w-full bg-gray-100 p-8 rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-semibold mb-4 text-center">Фидбэк</h1>
            <p className="mb-6 text-center"></p>
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-gray-300 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-700">
                    {((Number(sum) * 100) / 15).toFixed(2)}%
                  </span>
                </div>
                <div
                  className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-orange-400 transform -rotate-90 origin-center"
                  style={{
                    clip: `rect(0px, ${
                      10000 * (correctAnswersCount / 15)
                    }px, 24px, 0px)`,
                  }}
                ></div>
              </div>
            </div>
            <p className="text-center font-medium text-gray-700">
              Keep pushing forward!
            </p>
          </div>
          <div className="max-w-2xl w-full bg-gray-100 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Темы</h2>
            <div className="p-4 rounded-lg mb-4 border-2">
              <div className="flex justify-between">
                <span>Angles and Angle Measurement</span>
                <span>4 out of 10</span>
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Вопросы</h2>
            <p className="mb-6 text-gray-700">
              The following section shows the questions and your answers grouped
              by topic. Review each question by expanding the question.
              Incorrect answers are shown allowing the user to see the
              explanation. Explore tutors for further assistance.
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
