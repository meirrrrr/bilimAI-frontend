"use client";
import React from "react";
import Image from "next/image";
import burger from "../../utils/topbar/burger.svg";

const FeedbackPage = () => {
  const feedback = localStorage.getItem("feedback");
  const sum = localStorage.getItem("sum");
  console.log(feedback);
  let message = "";

  const s = Number(sum);
  if (s > 8) {
    message = "Amazinggg!!!";
  } else if (s > 5 && s < 8) {
    message = "Well done!";
  } else {
    message = "Good Job!";
  }

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-[#5599FF] py-[40px]">
      <div className="flex flex-col justify-center bg-white p-8 rounded-lg shadow-md w-4/5 max-w-lg text-center mb-[30px] h-[100vh] overflow-y-auto mt-[30px]">
        <h1 className="font-bold text-[26px] text-[#235391]">{sum} / 10</h1>
        <h2 className="font-bold text-[26px] text-[#235391]">{message}</h2>
        <p className="text-lg mb-4 text-[#235391] font-bold pt-[16px] text-[13px]">
          {feedback}
        </p>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => (window.location.href = "/")}
          className="border-2 text-white py-1 w-[120px] rounded-lg shadow-lg"
        >
          Home
        </button>
        <button
          onClick={() => {
            window.location.href = "/test";
          }}
          className="text-[#235391] py-1 w-[140px] rounded-lg shadow-lg bg-[#FFED65]"
        >
          Start new Test
        </button>
      </div>
    </div>
  );
};

export default FeedbackPage;
