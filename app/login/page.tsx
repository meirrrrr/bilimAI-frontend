"use client";

import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Component() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://bilimai-backend-production.up.railway.app/api/v1/login",
        {
          email,
          password,
        }
      );
      const { accessToken, refreshToken, user } = response.data;
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setError("Ошибка в логине");
      } else {
        setError("Не удалось выполнить вход. Попробуйте еще раз.");
      }
      console.error("Login failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl mb-4 text-[#1CB0F6]">Bilim AI</h1>
          <p className="font-semibold text-lg">Войти в профиль</p>
          <p className="text-[14px]">
            Создать аккаунт?{" "}
            <Link href="/registration">
              <span className="text-[#1CB0F6] cursor-pointer">
                Зарегистрироваться
              </span>
            </Link>
          </p>
        </div>
        <Card>
          <CardContent className="space-y-4 mt-5">
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Введите почтовый адрес"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-[#58CC02]"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Загрузка..." : "Войти"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
