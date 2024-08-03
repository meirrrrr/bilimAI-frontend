"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  HomeIcon,
  BookOpenIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

interface Question {
  _id: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  difficulty: string;
  topic: string;
}

interface AnsweredQuestion {
  answer: string;
  correct: boolean;
  topic: string;
  difficulty: string;
  questionId: string;
  question: string;
  correct_answer: string;
}

const Feedback = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [feedback, setFeedback] = useState<string>("");
  const [sum, setSum] = useState<string>("");
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    AnsweredQuestion[]
  >([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const storedFeedback = localStorage.getItem("feedback");
    const storedSum = localStorage.getItem("sum");
    const storedQuestions = JSON.parse(
      localStorage.getItem("questions") || "[]"
    );
    const storedAnswers = JSON.parse(localStorage.getItem("answers") || "[]");

    setFeedback(storedFeedback || "");
    setSum(storedSum || "");
    setCorrectAnswersCount(Number(storedSum) || 0);
    setQuestions(storedQuestions || []);
    setAnsweredQuestions(storedAnswers || []);
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
            <p className="mb-6 text-center text-[14px]">{feedback}</p>
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-gray-300 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-700">
                    {((correctAnswersCount * 100) / 15).toFixed(2)}%
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
              Так держать!
            </p>
          </div>
          <div className="max-w-2xl w-full bg-gray-100 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Темы</h2>
            <div className="p-4 rounded-lg mb-4 border-2">
              <div className="flex justify-between">
                <span>Ваш результат</span>
                <span>{correctAnswersCount} / 15</span>
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Вопросы</h2>
            {answeredQuestions.map((question, index) => (
              <div className="border-2 p-4 rounded-lg mb-4" key={index}>
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <svg
                      className={`w-6 h-6 mr-2 ${
                        question.correct ? "text-green-500" : "text-red-500"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {question.correct ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      )}
                    </svg>
                    {index + 1}. {question.question}
                  </span>
                  <span className="cursor-pointer">&#9660;</span>
                </div>
                <div className="pl-8">
                  <p className="mb-[10px]">
                    <span className="text-yellow-600">Тема: </span>
                    {question.topic}
                  </p>
                  <p>
                    <span className="text-blue-500">Ваш ответ:</span>{" "}
                    {question.answer
                      ? question.answer
                      : "Вы не ответили на это вопрос"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
