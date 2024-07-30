"use client";
import React, { useState } from "react";
import Sidebar from "../../components/SideBar";
import { UserIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
          <h1 className="text-xl font-bold">Добро пожаловать, [User Name]</h1>
          <div className="flex items-center">
            <Link href="/profile">
              <button className="p-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                <UserIcon className="w-6 h-6" />
              </button>
            </Link>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-grow p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Countdown to Exam */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-bold text-[#1CB0F6]">
                Дни до экзамена
              </h2>
              <p className="mt-2 text-2xl font-semibold">10 дней</p>
            </div>

            {/* Recent Tests */}
            <div className="p-4 bg-white rounded-lg shadow-md lg:col-span-2">
              <h2 className="text-lg font-bold text-[#1CB0F6]">
                История тестов
              </h2>
              <ul className="mt-2">
                <li className="flex justify-between p-2 border-b">
                  <span>Математика</span>
                  <span>85%</span>
                </li>
                <li className="flex justify-between p-2 border-b">
                  <span>Логика</span>
                  <span>90%</span>
                </li>
                <li className="flex justify-between p-2 border-b">
                  <span>Грамотность</span>
                  <span>78%</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3">
            {/* Performance Insights */}
            <div className="p-4 bg-white rounded-lg shadow-md lg:col-span-2">
              <h2 className="text-lg font-bold text-[#1CB0F6]">
                Анализ производительности
              </h2>
              <p className="mt-2">
                Графики с трендами и анализом производительности здесь.
              </p>
            </div>

            {/* Daily Quiz */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-bold text-[#1CB0F6]">
                Ежедневный квиз
              </h2>
              <p className="mt-2">Быстрый ежедневный квиз для практики.</p>
              <button className="w-full px-4 py-2 mt-4 text-white bg-[#1CB0F6] rounded-lg hover:bg-blue-600">
                Начать квиз
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3">
            {/* Study Materials */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-bold text-[#1CB0F6]">
                Учебные материалы
              </h2>
              <p className="mt-2">
                Доступ к учебникам, заметкам и другим материалам.
              </p>
            </div>

            {/* User Achievements */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-bold text-[#1CB0F6]">Достижения</h2>
              <p className="mt-2">Значки и награды за достижения.</p>
            </div>

            {/* Contact Information */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-bold text-[#1CB0F6]">
                Контактная информация
              </h2>
              <p className="mt-2">Если у вас есть вопросы, свяжитесь с нами.</p>
              <p className="mt-2 text-gray-700">Email: support@example.com</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
