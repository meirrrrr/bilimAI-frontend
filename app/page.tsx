"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import ktl from "./utils/ktl.png";
import nis from "./utils/nis.jpg";

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <header className="w-full fixed top-0 z-50 shadow px-3 bg-gray-100">
        <div className="container mx-auto flex items-center justify-between py-5">
          <div className="flex items-center gap-3">
            <BotIcon />
            <h1 className="text-2xl font-bold text-[#1CB0F6]">Bilim AI</h1>
          </div>
          <button className="text-gray-500 p-2 rounded-md" onClick={toggleMenu}>
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>
      {/* Sliding Menu */}
      <div
        className={`fixed top-20 left-0 w-full bg-gray-200 transform ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-700 ease-in-out z-40`}
      >
        <div className="p-4">
          <Link href="/login">
            <button className="mt-4 w-full bg-[#58CC02] text-white py-2 px-4 rounded-lg">
              Login
            </button>
          </Link>
        </div>
      </div>
      <main
        className={`container mx-auto flex flex-col py-8 px-4 items-center bg-white mt-[80px] ${
          isMenuOpen ? "opacity-40 pointer-events-none" : "opacity-100"
        }`}
      >
        <section className="py-3 mb-6 w-full text-center mt-[20px]">
          <div>
            <h2 className="text-3xl font-bold mb-4 mt-[90px] lg:text-[44px]">
              Поступи в школы мечты{" "}
              <span className="text-[#1CB0F6]">БИЛ НИШ</span> с нашим{" "}
              <span className="text-[#1CB0F6]">AI учителем</span>
            </h2>
            <p className="text-[#4B5563] mb-[40px] font-medium">
              AI Tutor – обучающий инструмент, предоставляющий
              персонализированную поддержку по предметам и уровням образования.
            </p>
          </div>
          <div className="flex justify-center">
            <Link href="/registration">
              <button className="bg-[#58CC02] text-white py-3 px-4 rounded-2xl flex mb-[50px] transform transition-transform duration-300 hover:scale-105">
                Попробовать бесплатно
                <ArrowRightIcon />
              </button>
            </Link>
          </div>
          <div className="flex gap-[10px] items-center justify-center lg:gap-[90px]">
            <Image
              src={ktl}
              alt="ktl-logo"
              width={200}
              className="relative top-[10px]"
            />
            <Image src={nis} alt="nis-logo" width={200} />
          </div>
        </section>
        <div className="px-4 py-[70px] text-center">
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
        <section className="bg-white rounded-lg p-6 w-full text-center">
          <h3 className="text-[#1CB0F6] mb-2 text-sm lg:text-lg">
            Обучение на основе искусственного интеллекта
          </h3>
          <h4 className="text-3xl font-light mb-[40px]">
            Откройте для себя преимущества AI учителя
          </h4>
          <div className="flex flex-col gap-[30px] mb-[50px]">
            <div className="bg-[#58CC02] py-[40px] px-6 rounded-xl text-white transform transition-transform duration-300 hover:scale-105">
              <h1 className="font-medium text-lg mb-5">АДАПТИВНЫЕ ТЕСТЫ</h1>
              <p className="text-sm font-thin text-white">
                Подготовьтесь к тесту в КТЛ НИШ с помощью нашего полнометражного
                адаптивного теста и посмотрите прогнозируемый результат.
              </p>
            </div>
            <div className="bg-[#58CC02] py-[40px] px-6 rounded-xl text-white transform transition-transform duration-300 hover:scale-105">
              <h1 className="font-medium text-lg mb-5">
                ДАННЫЕ ОБ УСПЕВАЕМОСТИ
              </h1>
              <p className="text-sm font-thin text-white">
                Посмотрите, в каких областях вы сильны, а в каких - слабы, чтобы
                определить, насколько хорошо вы учитесь.
              </p>
            </div>
            <div className="bg-[#58CC02] py-[40px] px-6 rounded-xl transform transition-transform duration-300 hover:scale-105">
              <h1 className="font-medium text-lg mb-5 text-white">
                ТЫСЯЧИ ВОПРОСОВ
              </h1>
              <p className="text-sm font-thin text-white">
                Ежедневно задавайте столько вопросов, сколько захотите, не
                беспокоясь о том, что они закончатся.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="text-black py-6 mt-8 bg-gray-100 w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-start space-y-4 md:space-y-0">
            <div className="w-full sm:w-auto mb-4 sm:mb-0 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-[#1CB0F6] mb-2">
                Bilim AI
              </h2>
              <p className="text-[14px]">
                Обучающий инструмент, предоставляющий персонализированную
                поддержку по предметам и уровням образования.
              </p>
            </div>
            <div className="w-full sm:w-auto mb-4 sm:mb-0 text-center sm:text-left">
              <h3 className="text-lg font-semibold text-[#1CB0F6] mb-2">
                Контакты
              </h3>
              <ul className="text-[14px]">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:meiirzhan04@gmail.com"
                    className="text-[#1CB0F6]"
                  >
                    meiirzhan04@gmail.com
                  </a>
                </li>
                <li>
                  Телефон:{" "}
                  <a href="tel:+77077146923" className="text-[#1CB0F6]">
                    +7 (707) 714-6923
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-auto text-center sm:text-left">
              <h3 className="text-lg font-semibold text-[#1CB0F6] mb-2">
                Социальные сети
              </h3>
              <div className="flex justify-center sm:justify-start space-x-4">
                <a
                  href="https://facebook.com/bilimai"
                  className="text-[#1CB0F6] hover:text-gray-500"
                >
                  Facebook
                </a>
                <a
                  href="https://twitter.com/bilimai"
                  className="text-[#1CB0F6] hover:text-gray-500"
                >
                  Twitter
                </a>
                <a
                  href="https://instagram.com/bilimai"
                  className="text-[#1CB0F6] hover:text-gray-500"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-300 pt-4 text-center">
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
      color="#1CB0F6"
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

function BotIcon() {
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
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
