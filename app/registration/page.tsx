"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const validateEmail = (email: any) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: any) => {
    return password.length >= 6; // Example: Password must be at least 6 characters long
  };

  const handleRegistration = async () => {
    setError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setError("Неверный формат электронной почты");
      return;
    }

    if (!validatePassword(password)) {
      setError("Длина пароля должна составлять не менее 6 символов");
      return;
    }

    try {
      const response = await axios.post(
        "https://bilimai-backend-production.up.railway.app/api/v1/register",
        {
          email,
          username,
          password,
        }
      );
      setSuccess(
        "Пользователь успешно создан. Теперь вы можете войти в систему."
      );
      console.log("User successfully created", response.data);
      router.push("/dashboard");
    } catch (error) {
      setError("Данные не верны");
      console.error("Registration failed");
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl mb-4 text-[#1CB0F6]">Bilim AI</h1>
          <p className="font-semibold text-lg">Зарегистрироваться как ученик</p>
          <p className="text-[14px]">
            Уже есть аккаунт?{" "}
            <Link href="/login">
              <span className="text-[#1CB0F6] cursor-pointer">Логин</span>
            </Link>
          </p>
        </div>
        <Card>
          <CardContent className="space-y-4 mt-5">
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                type="text"
                placeholder="Введите имя"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Введите почтовый адрес"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              className="w-full bg-[#58CC02]"
              onClick={handleRegistration}
            >
              Зарегистрироваться
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
