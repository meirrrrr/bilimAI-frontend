import React from "react";
import Image from "next/image";
import logo from "../utils/topbar/avatar.svg";
import TopBar from "../components/TopBar";

const page = () => {
  return (
    <div className="px-9">
      <TopBar title="username" />
      <main>
        <div className="flex gap-0 flex-col bg-[#FFED65] rounded-lg px-2 justify-around">
          <p className="font-light text-[10px]">SECTION 1</p>
          <h2>Start your first exam</h2>
        </div>
        <div>
          <h1>Exam</h1>
          <p>10 quesion of math</p>
          <p></p>
        </div>
        <button>
          <span>Start</span>
        </button>
      </main>
    </div>
  );
};

export default page;
