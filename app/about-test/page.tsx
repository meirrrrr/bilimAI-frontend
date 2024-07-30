"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/SideBar";
import { UserIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const TestSelection = () => {
  const router = useRouter();
  const [testType, setTestType] = useState("nis");
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
    <div className="flex h-screen">
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

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
          <h1 className="text-xl font-bold">Добро пожаловать, [User Name]</h1>
          <div className="flex items-center">
            <Link href="/profile">
              <button className="p-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                <UserIcon className="w-6 h-6" />
              </button>
            </Link>
          </div>
        </header>
        <div className="flex flex-col items-center justify-center mt-[20px] p-6 w-full max-w-5xl lg:ml-[100px]">
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md text-center mb-[50px]">
            <h1 className="text-3xl font-bold mb-6 text-[#1CB0F6]">
              Выберите тип теста
            </h1>
            <p className="mb-6 text-gray-700">
              В тесте будет 40 вопросов по математике, 20 вопросов по логике, и
              20 вопросов на грамотность чтения.
            </p>
            <div className="mb-6 flex justify-center">
              <label className="mr-6 flex items-center">
                <input
                  type="radio"
                  value="nis"
                  checked={testType === "nis"}
                  onChange={handleTestTypeChange}
                  className="mr-2"
                />
                НИШ
              </label>
              <label className="flex items-center">
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
              className="bg-[#1CB0F6] text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
            >
              Начать тест
            </button>
          </div>
          <div className="w-full bg-gray-100 p-8 rounded-lg shadow-lg text-center mb-[50px]">
            <h2 className="text-2xl font-bold mb-4 text-[#1CB0F6]">
              Инструкции и Руководства
            </h2>
            <p className="mb-4 text-gray-700">
              Перед началом теста, пожалуйста, ознакомьтесь с инструкциями.
              Убедитесь, что у вас есть все необходимые материалы и вы в
              комфортной обстановке для прохождения теста.
            </p>
            <h2 className="text-2xl font-bold mb-4 text-[#1CB0F6]">
              Преимущества Теста
            </h2>
            <p className="mb-4 text-gray-700">
              Этот тест поможет вам оценить свои знания и подготовиться к
              будущим экзаменам. Он покрывает важные области, такие как
              математика, логика и грамотность.
            </p>
            <h2 className="text-2xl font-bold mb-4 text-[#1CB0F6]">
              Пример Вопросов
            </h2>
            <p className="mb-4 text-gray-700">
              Вот несколько примеров вопросов, которые вы можете встретить:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              <li>Математика: Решите уравнение 2x + 3 = 7.</li>
              <li>
                Логика: Найдите следующий элемент в последовательности 2, 4, 8,
                16, ...
              </li>
              <li>
                Грамотность: Прочитайте отрывок и ответьте на вопросы по
                содержанию.
              </li>
            </ul>
            <h2 className="text-2xl font-bold mb-4 text-[#1CB0F6]">
              Отзывы Пользователей
            </h2>
            <p className="mb-4 text-gray-700">
              &quot;Этот тест действительно помог мне улучшить свои знания перед
              экзаменами!&quot; - Анна, студентка
            </p>
            <h2 className="text-2xl font-bold mb-4 text-[#1CB0F6]">
              Часто Задаваемые Вопросы
            </h2>
            <p className="mb-4 text-gray-700">
              <strong>Вопрос:</strong> Сколько времени занимает тест?
              <br />
              <strong>Ответ:</strong> Тест занимает примерно 60 минут.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSelection;
