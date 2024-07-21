"use client";
import Link from "next/link";
import { useState } from "react";

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="w-full bg-white shadow">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <h1 className="text-2xl font-bold text-[#1CB0F6]">Bilim AI</h1>
          <button
            className="text-gray-500 fixed top-4 right-4 z-50 p-2 rounded-md"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-4">
          <button className="text-white" onClick={toggleMenu}>
            <XIcon />
          </button>
          <Link href="/login">
            <button className="mt-4 w-full bg-[#1CB0F6] text-white py-2 px-4 rounded-lg">
              Login
            </button>
          </Link>
        </div>
      </div>

      <main className="container mx-auto flex flex-col items-center py-8 px-6">
        <section className="bg-white rounded-lg shadow-md p-6 mb-6 w-full max-w-lg">
          <h2 className="text-3xl font-bold mb-4">
            Поступи в школы мечты{" "}
            <span className="text-[#1CB0F6]">BIL NIS</span> с нашим{" "}
            <span className="text-[#1CB0F6]">AI учителем</span>, твой
            персональный компаньон.
          </h2>
          <p className="text-[#4B5563] mb-6 font-medium">
            AI Tutor – это инструмент обучения, который обеспечивает
            индивидуальную поддержку в зависимости от предмета и уровня
            образования, в котором вам нужна помощь. Благодаря мгновенному
            общению, практическим тестам, планам уроков и материалам для чтения.
          </p>
          <button className="bg-[#58CC02] text-white py-2 px-4 rounded-lg flex items-center">
            <Link href="/registration">Попробовать бесплатно</Link>
            <ArrowRightIcon />
          </button>
        </section>
        <section className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
          <h3 className="text-[#1CB0F6] mb-2">
            Обучение на основе искусственного интеллекта
          </h3>
          <h4 className="text-2xl font-bold mb-4">
            Откройте для себя преимущества AI учителя
          </h4>
          <p className="text-gray-700">
            Улучшите свой опыт обучения с помощью AI Tutor и получайте помощь в
            выполнении домашних заданий в режиме 24/7, подготовку к тестированию
            и многое другое.
          </p>
        </section>
      </main>
    </div>
  );
}

function ArrowRightIcon() {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function MenuIcon() {
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

function XIcon() {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
