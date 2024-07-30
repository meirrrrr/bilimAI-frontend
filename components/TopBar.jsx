import React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  XMarkIcon,
  UserIcon,
  BookOpenIcon,
  ChatBubbleLeftEllipsisIcon,
  ArrowLeftOnRectangleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="w-full shadow px-3">
        <div className="container mx-auto flex items-center justify-between py-5 md:px-[102px] lg:px-[200px]">
          <div className="flex items-center gap-3">
            <BotIcon className="w-5 h-5 text-primary-foreground" />
            <h1 className="text-2xl font-bold text-[#1CB0F6]">Bilim AI</h1>
          </div>
          <button
            className="text-gray-500 z-50 p-2 rounded-md"
            onClick={toggleMenu}
          >
            {isMenuOpen ? "" : <MenuIcon />}
          </button>
        </div>
      </header>
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#1CB0F6] text-white transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-4">
          <button className="text-white" onClick={toggleMenu}>
            <XMarkIcon className="h-6 w-6" />
          </button>
          <Link href="/profile">
            <button className="flex items-center justify-end gap-[10px] mt-4 w-full bg-[#1CB0F6] text-white py-4 px-4 rounded-lg hover:bg-[#1390c4] transition-colors">
              Мой профиль
              <UserIcon className="h-5 w-5 mr-3" />
            </button>
          </Link>
          <Link href="/about-test">
            <button className="flex items-center justify-end gap-[10px] mt-4 w-full bg-[#1CB0F6] text-white py-4 px-4 rounded-lg hover:bg-[#1390c4] transition-colors">
              Начать тест
              <ClipboardDocumentListIcon className="h-5 w-5 mr-3" />
            </button>
          </Link>
          <Link href="/lessons">
            <button className="flex items-center justify-end gap-[10px] mt-4 w-full bg-[#1CB0F6] text-white py-4 px-4 rounded-lg hover:bg-[#1390c4] transition-colors">
              Уроки
              <BookOpenIcon className="h-5 w-5 mr-3" />
            </button>
          </Link>
          <Link href="/chat">
            <button className="flex items-center justify-end gap-[10px] mt-4 w-full bg-[#1CB0F6] text-white py-4 px-4 rounded-lg hover:bg-[#1390c4] transition-colors">
              AI ассистент
              <ChatBubbleLeftEllipsisIcon className="h-5 w-5 mr-3" />
            </button>
          </Link>
          <Link href="/">
            <button className="flex items-center justify-end gap-[10px] mt-4 w-full bg-[#1CB0F6] text-white py-4 px-4 rounded-lg hover:bg-[#1390c4] transition-colors">
              Выйти
              <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

function MenuIcon(props) {
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

function XIcon(props) {
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

function BotIcon(props) {
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

export default TopBar;
