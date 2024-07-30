"use client";
import React from "react";
import Link from "next/link";
import {
  CalendarIcon,
  ChartBarIcon,
  HomeIcon,
  BookOpenIcon,
  UserIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ isMenuOpen, toggleMenu }) => {
  return (
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
          href="/study-plan"
          className="flex items-center p-3 mt-2 text-gray-600 rounded-lg hover:bg-gray-200"
        >
          <CalendarIcon className="w-5 h-5 mr-2" />
          План обучения
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
          href="/support"
          className="flex items-center p-3 mt-2 text-gray-600 rounded-lg hover:bg-gray-200"
        >
          <QuestionMarkCircleIcon className="w-5 h-5 mr-2" />
          Поддержка
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
  );
};

export default Sidebar;
