import React, { FC } from "react";
import Image from "next/image";
import logo from "../utils/topbar/avatar.svg";
import TopBar from "../components/TopBar";
import Link from "next/link";

const page: React.FC = () => {
  return (
    <div className="px-9">
      <TopBar title="username" />
      <main className="text-[#235391]">
        <div className=" bg-[#FFED65] rounded-lg px-3 py-1 mb-[30px]">
          <p className="font-light text-[10px]">SECTION 1</p>
          <h2 className="font-semibold ">Start your first exam</h2>
        </div>
        <div className="bg-[#FFFFFF] rounded-lg px-2 py-[50px] font-bold flex flex-col gap-4 mb-[50px]">
          <h1 className="text-center text-[24px]">Exam</h1>
          <p className="text-center text-[16px]">10 quesion of math</p>
          <p></p>
        </div>
        <div className="flex justify-center flex-col">
          <button className="bg-[#FFED65] py-2 rounded-md">
            <Link href="/test">
              <span className="font-semibold text-[16px]">Start</span>
            </Link>
          </button>
        </div>
      </main>
    </div>
  );
};

export default page;
