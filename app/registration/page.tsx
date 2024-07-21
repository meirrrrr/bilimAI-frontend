"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";

export default function Component() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleRegistration = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3003/api/v1/register",
        {
          email,
          username,
          password,
        }
      );
      console.log("User successfully created", response.data);
      redirect("/login");
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl mb-4">Bilim AI</h1>
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
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                type="text"
                placeholder="Введите имя"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Email</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Введите почтовый адрес"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-[#1CB0F6]"
              onClick={handleRegistration}
            >
              <Link href="/login">Зарегистрироваться</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
