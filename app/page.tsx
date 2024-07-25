"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import ktl from "./utils/ktl.png";
import nis from "./utils/nis.jpg";
import logo from "./utils/logo.svg";

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <header className="w-full bg-gray-100 shadow px-3">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-[12px]">
            <Image src={logo} alt="logo" className="w-[30px]" />
            <h1 className="text-2xl font-bold text-[#1CB0F6]">Bilim AI</h1>
          </div>
          <button
            className="text-gray-500 top-4 right-4 z-50 p-2 rounded-md"
            onClick={toggleMenu}
          >
            {isMenuOpen ? "" : <MenuIcon />}
          </button>
        </div>
      </header>

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 left-0 w-full bg-gray-200 transform h-[150px] ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-700 ease-in-out z-40`}
      >
        <div className="p-4">
          <button className="text-black" onClick={toggleMenu}>
            <XIcon />
          </button>
          <Link href="/login">
            <button className="mt-4 w-full bg-[#58CC02] text-white py-2 px-4 rounded-lg">
              Login
            </button>
          </Link>
        </div>
      </div>
      <main
        className={`container mx-auto flex flex-col items-center py-8 px-4 bg-white ${
          isMenuOpen
            ? "opacity-40 pointer-events-none"
            : "opacity-100 backdrop-blur-sm"
        }`}
      >
        <section className="py-3 mb-6 w-full max-w-lg text-center mt-[20px]">
          <h2 className="text-3xl font-bold mb-4">
            Поступи в школы мечты{" "}
            <span className="text-[#1CB0F6]">БИЛ НИШ</span> с нашим{" "}
            <span className="text-[#1CB0F6]">AI учителем</span>
          </h2>
          <p className="text-[#4B5563] mb-[40px] font-medium">
            AI Tutor – обучающий инструмент, предоставляющий персонализированную
            поддержку по предметам и уровням образования.
          </p>
          <div className="flex justify-center">
            <button className="bg-[#58CC02] text-white py-3 px-4 rounded-2xl flex mb-[50px]">
              <Link href="/registration">Попробовать бесплатно</Link>
              <ArrowRightIcon />
            </button>
          </div>
          <div className="flex gap-[10px] items-center">
            <Image
              src={ktl}
              alt="ktl-logo"
              width={110}
              className="relative top-[10px]"
            />
            <Image src={nis} alt="nis-logo" width={200} />
          </div>
        </section>
        <section className={`bg-white rounded-lg p-6 w-full max-w-lg`}>
          <h3 className="text-[#1CB0F6] mb-2 text-sm">
            Обучение на основе искусственного интеллекта
          </h3>
          <h4 className="text-3xl font-ligth mb-[40px]">
            Откройте для себя преимущества AI учителя
          </h4>
          <div className="flex flex-col gap-[30px] mb-[50px]">
            <div className="bg-[#58CC02] py-[40px] px-6 rounded-xl text-white">
              <h1 className="font-medium text-lg mb-5">АДАПТИВНЫЕ ТЕСТЫ</h1>
              <p className="text-sm font-thin text-white">
                Подготовьтесь к тесту в КТЛ НИШ с помощью нашего полнометражного
                адаптивного теста и посмотрите прогнозируемый результат.
              </p>
            </div>
            <div className="bg-[#58CC02] py-[40px] px-6 rounded-xl text-white">
              <h1 className="font-medium text-lg mb-5 ">
                ДАННЫЕ ОБ УСПЕВАЕМОСТИ
              </h1>
              <p className="text-sm font-thin  text-white">
                Посмотрите, в каких областях вы сильны, а в каких - слабы, чтобы
                определить, насколько хорошо вы учитесь.
              </p>
            </div>
            <div className="bg-[#58CC02] py-[40px] px-6 rounded-xl">
              <h1 className="font-medium text-lg mb-5  text-white">
                ТЫСЯЧИ ВОПРОСОВ
              </h1>
              <p className="text-sm font-thin text-white">
                Ежедневно задавайте столько вопросов, сколько захотите, не
                беспокоясь о том, что они закончатся.
              </p>
            </div>
          </div>
          <div className="px-3">
            <h1 className="text-3xl mb-3 text-[#1CB0F6] font-semibold">
              Study Smarter, Not Harder
            </h1>
            <p className="text-md">
              Испытайте себя в реальной экзаменационной обстановке с помощью
              полноформатных адаптивных тестов Bilim AI. Bilim AI выявит ваши
              сильные и слабые стороны на основе теста, что позволит вам
              эффективно усовершенствовать стратегию обучения. Легко
              просматривайте пропущенные вопросы и отслеживайте свой прогресс с
              течением времени.
            </p>
          </div>
        </section>
      </main>
      <footer className=" text-black py-6 mt-8 px-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full sm:w-auto mb-4 sm:mb-0">
              <h2 className="text-xl font-bold text-[#1CB0F6]">Bilim AI</h2>
              <p className="text-[14px]">
                Обучающий инструмент, предоставляющий персонализированную
                поддержку по предметам и уровням образования.
              </p>
            </div>
            <div className="w-full sm:w-auto mb-4 sm:mb-0">
              <h3 className="text-lg font-semibold text-[#1CB0F6]">Контакты</h3>
              <ul className="text-[14px]">
                <li>Email: meiirzhan04@gmail.com</li>
                <li>Телефон: +7 (707) 714-6923</li>
              </ul>
            </div>
            <div className="w-full sm:w-auto">
              <h3 className="text-lg font-semibold text-[#1CB0F6]">
                Социальные сети
              </h3>
              <div className="flex space-x-4 cursor-pointer">
                <a
                  href="https://facebook.com/bilimai"
                  className="hover:text-gray-400"
                >
                  Facebook
                </a>
                <a
                  href="https://twitter.com/bilimai"
                  className="hover:text-gray-400"
                >
                  Twitter
                </a>
                <a
                  href="https://instagram.com/bilimai"
                  className="hover:text-gray-400"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-700 pt-4 text-center">
            <p className="text-[16px]">© 2024 Bilim AI. Все права защищены.</p>
          </div>
        </div>
      </footer>
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
