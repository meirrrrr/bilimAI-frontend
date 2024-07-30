"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import logo from "./elprimo.jpeg";
import Image from "next/image";
import TopBar from "@/components/TopBar";

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
    const user = localStorage.getItem("user");
    const result = localStorage.getItem("sum");
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
    <div className="min-h-screen bg-gray-100">
      <TopBar />
      <div className="container mx-auto p-6">
        <h1 className="text-xl font-bold mb-6">Мой профиль</h1>
        {userData ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex gap-4">
              <Avatar>
                <Image src={logo} alt="elprimo-logo" />
              </Avatar>
              <h2 className="text-2xl font-semibold mb-4">
                {userData.username}
              </h2>
            </div>
            <p className="mb-4">
              <strong>Email: </strong>
              {userData.email}
            </p>
            <h3 className="text-xl font-semibold mb-2">История тестов</h3>
            {userData.testHistory.length > 0 ? (
              <ul className="space-y-2">
                {userData.testHistory.map((test, index) => (
                  <li key={index} className="border p-4 rounded-lg bg-gray-50">
                    <p>
                      <strong>{test.name}</strong>
                    </p>
                    <p>
                      <strong>Результат: </strong>
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
        ) : (
          <p>Loading...</p>
        )}
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
