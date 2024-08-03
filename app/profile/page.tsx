"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import logo from "./elprimo.jpeg";
import Image from "next/image";
import {
  CalendarIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  HomeIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

interface TestHistory {
  name: string;
  testName: string;
  score: number;
  date: string;
  createdAt?: string;
}

interface User {
  testHistory: TestHistory[];
  _id: string;
  email: string;
  username: string;
  password: string;
  __v: number;
}

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [result, setResult] = useState("") || null;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          console.log(res.data.testHistory[25].score);
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
            <ArrowLeftEndOnRectangleIcon className="w-5 h-5 mr-2" />
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
          <h1 className="text-xl font-bold">Мой профиль</h1>
          <div className="flex items-center">
            <Link href="/profile">
              <button className="p-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                <UserIcon className="w-6 h-6" />
              </button>
            </Link>
          </div>
        </header>
        <div className="container mx-auto p-6">
          <h1 className="text-xl font-bold mb-6">Мой профиль</h1>
          {userData ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex gap-4 items-center justify-center mb-[30px] mt-[20px]">
                <Avatar>
                  <Image src={logo} alt="elprimo-logo" width={50} height={50} />
                </Avatar>
                <h2 className="mt-[15px] text-2xl font-semibold mb-4 lg:text-4xl">
                  {userData.username}
                </h2>
              </div>
              <p className="mb-4">
                <strong>Email: </strong>
                {userData.email}
              </p>
              <div className="flex items-center bg-blue-300 p-4 rounded-md mt-4">
                <div className="bg-yellow-300 p-2 rounded-full mr-4">🏆</div>
                <div>
                  <p className="font-bold text-xl">{result}</p>
                  <p className="text-sm text-gray-600">Ваш общий балл</p>
                </div>
              </div>
              <div className="bg-blue-300 p-4 rounded-md mt-4">
                <h3 className="text-xl font-semibold mt-[20px] mb-[30px] pl-[5px]">
                  История тестов
                </h3>
                {userData.testHistory.length > 0 ? (
                  <ul className="space-y-5">
                    {userData.testHistory.slice(-3).map((test, index) => (
                      <li
                        key={index}
                        className="border p-4 rounded-lg bg-gray-50"
                      >
                        <p>
                          <strong>{test.name}</strong>
                        </p>
                        <p>
                          <strong>Результат: </strong>
                          {test.score} {/* Assuming score is available */}
                        </p>
                        <p>
                          <strong>Дата: </strong>{" "}
                          {new Date(test.createdAt!).toLocaleDateString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>История тестов отсутствует.</p>
                )}
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
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

export default Profile;
