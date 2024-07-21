"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  useEffect(() => {
    const feedback = localStorage.getItem("feedback");
    const sum = localStorage.getItem("sum");

    setFeedback(feedback || "");
    setCorrectAnswersCount(Number(sum) || 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <div className="max-w-xl w-full p-8 bg-gray-800 rounded-lg shadow-md mt-10">
        <h1 className="text-3xl font-semibold mb-4">Geometry Quiz</h1>
        <p className="mb-6">
          Based on your performance in the quiz, it seems like you may need to
          review some key concepts related to angles and angle measurement.
          Specifically, it may be helpful for you to focus on understanding the
          different types of angles (acute, right, obtuse, straight) and their
          measurements, as well as the relationships between angles
          (complementary, supplementary, vertical). It may also be beneficial
          for you to practice calculating the sum of interior angles in a
          triangle. Keep up the good work and continue to review and practice
          these concepts to improve your understanding.
        </p>
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-gray-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold">
                  {correctAnswersCount * 10}%
                </span>
              </div>
            </div>
            <div
              className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-orange-400 transform -rotate-90 origin-center"
              style={{
                clip: `rect(0px, ${
                  24 * (correctAnswersCount / 10)
                }px, 24px, 0px)`,
              }}
            ></div>
          </div>
        </div>
        <p className="text-center font-medium">Keep pushing forward!</p>
        <div className="flex justify-center mt-4">
          <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16v-1a4 4 0 014-4h1m1 1v1a4 4 0 014 4v1m0 0h-1a4 4 0 01-4-4v-1m0 0h1a4 4 0 014 4v1m0 0v1m-7-8H5m0 0H4v1m1 0h1a4 4 0 014-4V4m0 0V3a4 4 0 00-4-4h-1m-1 1H4v1m0 0v1m-1 0h1v1m0 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1m-7 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1m-7 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1m-7 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1m-7 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1m-7 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1m-7 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1m-7 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1m-7 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1m-7 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1m-7 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014 4v1m0 0v1m1 0h1v1m0 0h1v1m0 0v1m1-1h-1m0 0H5m0 0H4v1m1 0h1a4 4 0 014 4v1m0 0v1m1-1h1m0 0v-1m1-4v-1a4 4 0 00-4-4h-1m0 0H5m0 0H4v1m1 0h1v1m0 0h1a4 4 0 014-4V4m0 0v1m1 0h1v1m0 0h1v1m0 0v1"
              />
            </svg>
            Share
          </button>
        </div>
      </div>
      <div className="max-w-2xl w-full p-8 bg-gray-800 rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-semibold mb-4">Topics</h2>
        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <div className="flex justify-between">
            <span>Angles and Angle Measurement</span>
            <span>4 out of 10</span>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Questions</h2>
        <p className="mb-6">
          The following section shows the questions and your answers grouped by
          topic. Review each question by expanding the question. Incorrect
          answers are shown allowing the user to see the explanation. Explore
          tutors for further assistance.
        </p>
        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <div className="flex justify-between">
            <span className="flex items-center">
              <svg
                className="w-6 h-6 text-red-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              1. A straight angle measures:
            </span>
            <span className="cursor-pointer">&#9660;</span>
          </div>
          {/* Expandable content here */}
        </div>
        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <div className="flex justify-between">
            <span className="flex items-center">
              <svg
                className="w-6 h-6 text-red-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              2. What is the sum of the interior angles of a triangle?
            </span>
            <span className="cursor-pointer">&#9660;</span>
          </div>
          {/* Expandable content here */}
        </div>
        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <div className="flex justify-between">
            <span className="flex items-center">
              <svg
                className="w-6 h-6 text-green-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              3. What type of angle measures between 90 and 180 degrees?
            </span>
            <span className="cursor-pointer">&#9660;</span>
          </div>
          {/* Expandable content here */}
        </div>
        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <div className="flex justify-between">
            <span className="flex items-center">
              <svg
                className="w-6 h-6 text-red-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              4. If two angles are complementary, what is the sum of their
              measures?
            </span>
            <span className="cursor-pointer">&#9660;</span>
          </div>
          {/* Expandable content here */}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
