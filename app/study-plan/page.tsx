"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
  CalendarIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  HomeIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

interface StudyPlanType {
  weeklySchedule: {
    day: string;
    subject: string;
    goals: string;
    exams: string;
    hours: number;
  }[];
  studyGoals: string[];
  upcomingExams: string[];
  resources: { title: string; link: string }[];
}

const StudyPlan = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [studyTime, setStudyTime] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState<StudyPlanType | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that generates study plans based on user input.",
            },
            {
              role: "user",
              content: `I want to study for ${studyTime} hours each day. Create a weekly study plan including subjects, study goals, exams for 6 graders for math and logic problems.WRITE ON RUSSIAN IMPORTANT AND JSON FORMAT!, I DON'T NEED ON ENGLISH!`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const data = response.data.choices[0].message.content;

      console.log("Response data:", data);
      const generatedPlan: StudyPlanType = parseGeneratedPlan(data);

      setGeneratedPlan(generatedPlan);
    } catch (error) {
      console.error("Error generating study plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const parseGeneratedPlan = (data: string): StudyPlanType => {
    const parsedData = JSON.parse(data);

    const weeklySchedule = Object.keys(parsedData).map((day) => {
      if (day === "Воскресенье") {
        return {
          day,
          subject: "Недельный Обзор",
          goals: parsedData[day]["Недельный Обзор"]["Учебные цели"],
          exams: parsedData[day]["Недельный Обзор"]["Экзамены"],
          hours: parsedData[day]["Недельный Обзор"]["Часы"],
        };
      }
      return {
        day,
        subject: parsedData[day]["Предмет"],
        goals: parsedData[day]["Учебные цели"],
        exams: parsedData[day]["Экзамены"],
        hours: parsedData[day]["Часы"],
      };
    });

    return {
      weeklySchedule,
      studyGoals: [],
      upcomingExams: [],
      resources: [],
    };
  };

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
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
            Выйти
          </Link>
        </nav>
      </aside>

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
          <h1 className="text-xl font-bold">План обучения</h1>
          <div className="flex items-center">
            <Link href="/profile">
              <button className="p-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                <UserIcon className="w-6 h-6" />
              </button>
            </Link>
          </div>
        </header>

        {/* Main Study Plan Content */}
        <main className="flex-grow p-6">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto mb-6">
            <h2 className="text-lg font-bold text-[#1CB0F6] mb-4">
              Сколько времени вы хотите учиться каждый день?
            </h2>
            <input
              type="number"
              value={studyTime}
              onChange={(e) => setStudyTime(e.target.value)}
              placeholder="Введите количество часов"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <button
              onClick={handleGeneratePlan}
              className="w-full bg-[#1CB0F6] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              disabled={loading}
            >
              {loading ? "Генерация плана..." : "Сгенерировать план обучения"}
            </button>
          </div>

          {generatedPlan && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Weekly Schedule */}
              <div className="p-4 bg-white rounded-lg shadow-md lg:col-span-2">
                <h2 className="text-lg font-bold text-[#1CB0F6]">
                  Еженедельное расписание
                </h2>
                <table className="w-full mt-4 border">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">День</th>
                      <th className="border px-2 py-1">Предмет</th>
                      <th className="border px-2 py-1">Время</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedPlan.weeklySchedule.map((item, index) => (
                      <tr key={index}>
                        <td className="border px-2 py-1">{item.day}</td>
                        <td className="border px-2 py-1">{item.subject}</td>
                        <td className="border px-2 py-1">{item.hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Study Goals */}
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-lg font-bold text-[#1CB0F6]">
                  Учебные цели
                </h2>
                <ul className="mt-4 list-disc list-inside">
                  {generatedPlan.studyGoals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>

              {/* Upcoming Exams */}
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-lg font-bold text-[#1CB0F6]">
                  Предстоящие экзамены
                </h2>
                <ul className="mt-4 list-disc list-inside">
                  {generatedPlan.upcomingExams.map((exam, index) => (
                    <li key={index}>{exam}</li>
                  ))}
                </ul>
              </div>

              {/* Study Resources */}
              <div className="p-4 bg-white rounded-lg shadow-md lg:col-span-3">
                <h2 className="text-lg font-bold text-[#1CB0F6]">Ресурсы</h2>
                <ul className="mt-4 list-disc list-inside">
                  {generatedPlan.resources.map((resource, index) => (
                    <li key={index}>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudyPlan;
