"use client";
import React, { useState, useEffect } from "react";
import { UserIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import axios from "axios";
import {
  CalendarIcon,
  ChartBarIcon,
  HomeIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

interface TestHistory {
  name: string;
  createdAt: string;
  _id: string;
}

interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  currentTest: string;
  testHistory: TestHistory[];
  __v: number;
}

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [result, setResult] = useState<string | null>("");
  const [userData, setUserData] = useState<User | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  };

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    const result = sessionStorage.getItem("sum");
    setResult(result!);

    const userString = user ? JSON.parse(user) : null;
    const fetchUser = async () => {
      try {
        if (userString && userString._id) {
          const res = await axios.get<User>(
            `https://bilimai-backend-production.up.railway.app/api/v1/user/${userString._id}`
          );
          setUserData(res.data);
          console.log(res.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

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
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
            Выйти
          </Link>
        </nav>
      </aside>

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
          <h1 className="text-xl font-bold">
            Добро пожаловать, {userData?.username}!
          </h1>
          <div className="flex items-center">
            <Link href="/profile">
              <button className="p-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                <UserIcon className="w-6 h-6" />
              </button>
            </Link>
          </div>
        </header>

        <main className="flex-grow p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-bold text-[#1CB0F6]">
                Дни до экзамена
              </h2>
              <p className="mt-2 text-2xl font-semibold">200 дней</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-md lg:col-span-2">
              <h2 className="text-lg font-bold text-[#1CB0F6]">
                История тестов
              </h2>
              <ul className="mt-2">
                {userData?.testHistory.slice(-2).map((test) => (
                  <li
                    key={test._id}
                    className="flex justify-between p-2 border-b"
                  >
                    <span>{test.name}</span>
                    {/* <span>{test.}</span> */}
                    <span>{new Date(test.createdAt).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3">
            <div className="p-4 bg-white rounded-lg shadow-md lg:col-span-2">
              <h2 className="text-lg font-bold text-[#1CB0F6]">
                Анализ производительности
              </h2>
              <p className="mt-2">
                Графики с трендами и анализом производительности здесь.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-bold text-[#1CB0F6]">
                Ежедневный квиз
              </h2>
              <p className="mt-2">Быстрый ежедневный квиз для практики.</p>
              <button className="w-full px-4 py-2 mt-4 text-white bg-[#1CB0F6] rounded-lg hover:bg-blue-600">
                <Link href="/about-test">Начать квиз</Link>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-bold text-[#1CB0F6]">
                Учебные материалы
              </h2>
              <p className="mt-2">
                Доступ к учебникам, заметкам и другим материалам.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-bold text-[#1CB0F6]">Достижения</h2>
              <p className="mt-2">Значки и награды за достижения.</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-bold text-[#1CB0F6]">
                Контактная информация
              </h2>
              <p className="mt-2">Если у вас есть вопросы, свяжитесь с нами.</p>
              <p className="mt-2 text-gray-700">Email: meiirzhan04@gmail.com</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
