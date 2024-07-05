"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import burger from "../utils/topbar/burger.svg";
import HintModal from "./ModalWindow";
import Link from "next/link";

interface Question {
  _id: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  difficulty: string;
  topic: string;
}

interface AnsweredQuestions {
  answer: string | null;
  correct: boolean;
  topic: string | null;
  difficulty: string | null;
}

const Page: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<{
    [key: number]: AnsweredQuestions;
  }>({});
  const [options, setOptions] = useState<string[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hint, setHint] = useState("");
  const [loadingHint, setLoadingHint] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const storedQuestions = sessionStorage.getItem("questions");
        if (storedQuestions) {
          const parsedQuestions = JSON.parse(storedQuestions);
          setQuestions(parsedQuestions);
          setOptions(createOptions(parsedQuestions[0]));
          setLoading(false);
        } else {
          const res = await axios.get<Question[]>(
            "http://127.0.0.1:3003/api/v1/mathTest"
          );
          setQuestions(res.data);
          setOptions(createOptions(res.data[0]));
          sessionStorage.setItem("questions", JSON.stringify(res.data));
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const createOptions = (question: Question) => {
    return [question.correct_answer, ...question.incorrect_answers];
  };

  const handleAnswerClick = (answer: string) => {
    const isCorrect = answer === questions[currentQuestionIndex].correct_answer;
    setSelectedAnswer(answer);
    setAnsweredQuestions((prev) => ({
      ...prev,
      [currentQuestionIndex]: {
        answer,
        correct: isCorrect,
        topic: questions[currentQuestionIndex].topic,
        difficulty: questions[currentQuestionIndex].difficulty,
      },
    }));
  };

  const handleNextClick = () => {
    setSelectedAnswer(null);
    const nextIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIndex);
    setOptions(createOptions(questions[nextIndex]));
  };

  const handleQuestionClick = (index: number) => {
    setCurrentQuestionIndex(index);
    setOptions(createOptions(questions[index]));
    setSelectedAnswer(answeredQuestions[index]?.answer || null);
  };

  const handleSubmit = async () => {
    const finalAnswers = questions.map((question, index) => ({
      answer: answeredQuestions[index]?.answer || null,
      topic: question.topic,
      correct: answeredQuestions[index]?.correct || false,
      difficulty: question.difficulty,
    }));
    console.log("Final Answers:", finalAnswers);

    const response_feedback = await axios.post(
      "http://127.0.0.1:8000/generate_feedback/",
      finalAnswers
    );
    const feedback = response_feedback.data;
    console.log(feedback);
    localStorage.setItem("feedback", feedback.feedback);
    localStorage.setItem("sum", feedback.correct_answers_count);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-between h-screen py-[20px]">
        <div className="flex items-center justify-around w-full max-w-3xl mb-[110px] px-9">
          <Image src={burger} alt="burger icon" />
          <div className="w-4/5 bg-[#FFED65] rounded-full h-8 overflow-hidden">
            <div></div>
          </div>
        </div>
        <div className=" flex flex-col justify-center  bg-white p-8 rounded-lg shadow-md w-4/5 max-w-lg text-center mb-[30px] h-[350px] overflow-y-auto">
          <p className="text-xl mb-4 text-[#235391] font-bold pt-[20px]"></p>
          <div className="space-y-2 font-medium">
            <button
              className={`block w-full py-2 px-4 rounded-lg focus:outline-none}`}
            ></button>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleNextClick}
            className="border-2 text-white py-1 w-[120px] rounded-lg shadow-lg"
          >
            Next
          </button>
          <button
            onClick={handleSubmit}
            className="border-2 text-white py-1 w-[120px] rounded-lg shadow-lg"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="container">No questions available.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage =
    (Object.keys(answeredQuestions).length / questions.length) * 100;

  const handleGetHint = async () => {
    setLoadingHint(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/get_hint/", {
        question: questions[currentQuestionIndex].question,
      });
      setHint(response.data.hint);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching hint:", error);
    } finally {
      setLoadingHint(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-[#5599FF] py-[20px]">
      <div className="flex items-center justify-around w-full max-w-3xl mb-5 px-9">
        <Image src={burger} alt="burger icon" />
        <div className="w-4/5 bg-[#FFED65] rounded-full h-8 overflow-hidden">
          <div
            className="bg-green-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      <div className="flex space-x-2 mb-[30px] w-full overflow-x-auto font-medium">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => handleQuestionClick(index)}
            className={`w-8 h-8 rounded-full px-3 ${
              index === currentQuestionIndex
                ? "bg-[#FFED65] text-[#235391]"
                : answeredQuestions[index]
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {currentQuestion ? (
        <div className=" flex flex-col justify-center  bg-white p-8 rounded-lg shadow-md w-4/5 max-w-lg text-center mb-[30px] h-[350px] overflow-y-auto">
          <p className="text-xl mb-4 text-[#235391] font-bold pt-[20px]">
            {currentQuestion.question}
          </p>
          <div className="space-y-2 font-medium">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className={`block w-full py-2 px-4 rounded-lg focus:outline-none ${
                  selectedAnswer === option
                    ? "bg-[#235391] text-white"
                    : "bg-[#5599FF] text-white hover:bg-blue-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md w-4/5 max-w-lg text-center mb-[20px]">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-400 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-400 rounded"></div>
                <div className="h-4 bg-gray-400 rounded"></div>
                <div className="h-4 bg-gray-400 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex space-x-2">
        {currentQuestionIndex < questions.length - 1 && (
          <button
            onClick={handleNextClick}
            className="border-2 text-white py-1 w-[120px] rounded-lg shadow-lg"
          >
            Next
          </button>
        )}
        <button
          onClick={handleSubmit}
          className="border-2 text-white py-1 w-[120px] rounded-lg shadow-lg"
        >
          <Link href="/test/feedback">Submit</Link>
        </button>
      </div>
      <button
        onClick={handleGetHint}
        className="mt-2 bg-blue-500 text-white p-2 rounded"
      >
        {loadingHint ? "Loading..." : "Get Hint"}
      </button>

      <HintModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        hint={hint}
        loadingHint={loadingHint}
      />
    </div>
  );
};

export default Page;
