("use client");
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get<Question[]>(
          "http://127.0.0.1:3003/api/v1/mathTest"
        );
        setQuestions(res.data);
        setOptions(createOptions(res.data[0]));
        sessionStorage.setItem("questions", JSON.stringify(res.data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchQuestions();
    }, 5000);

    return () => clearTimeout(timeoutId);
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
      <div className="flex flex-col items-center justify-center h-screen py-20 bg-white">
        <p>Loading...</p>
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-white">
      <div className="flex items-center justify-around w-full max-w-3xl">
        <header className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center">
              <BotIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-[#1CB0F6] w-[100px]">
              Bilim AI
            </h2>
            <button
              className="text-gray-500 top-4 right-4 p-2 rounded-md ml-[130px]"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </header>
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-40`}
        >
          <div className="p-4">
            <button className="text-white" onClick={toggleMenu}>
              <XIcon />
            </button>
            <Link href="/profile">
              <button className="mt-4 w-full bg-[#1CB0F6] text-white py-2 px-4 rounded-lg">
                Мой профиль
              </button>
            </Link>
            <Link href="/about-test">
              <button className="mt-4 w-full bg-[#1CB0F6] text-white py-2 px-4 rounded-lg">
                Начать тест
              </button>
            </Link>
            <Link href="/lessons">
              <button className="mt-4 w-full bg-[#1CB0F6] text-white py-2 px-4 rounded-lg">
                Уроки
              </button>
            </Link>
            <Link href="/chat">
              <button className="mt-4 w-full bg-[#1CB0F6] text-white py-2 px-4 rounded-lg">
                AI ассистент
              </button>
            </Link>
            <Link href="/">
              <button className="mt-4 w-full bg-[#1CB0F6] text-white py-2 px-4 rounded-lg">
                Выйти
              </button>
            </Link>
          </div>
        </div>
      </div>
      <h1>БИЛ тест</h1>
      <div className="w-4/5 bg-gray-300 rounded-full h-2 overflow-hidden">
        <div
          className="bg-green-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      {currentQuestion ? (
        <div className="flex flex-col justify-center bg-white p-8 rounded-lg w-4/5 max-w-lg text-center mb-5 h-[350px] overflow-y-auto">
          <p className="text-gray-500">{currentQuestion.topic}</p>
          <p className="text-md mb-4 text-blue-500 font-bold">
            {currentQuestion.question}
          </p>
          <div className="space-y-2 font-medium">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className={`block w-full py-2 px-4 rounded-lg focus:outline-none ${
                  selectedAnswer === option
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black hover:bg-blue-100"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md w-4/5 max-w-lg text-center mb-5">
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
            className="border-2 text-white bg-blue-500 py-1 w-32 rounded-lg shadow-lg"
          >
            Next
          </button>
        )}
        <button
          onClick={handleSubmit}
          className="border-2 text-white bg-blue-500 py-1 w-32 rounded-lg shadow-lg"
        >
          <Link href="/test/feedback">Submit</Link>
        </button>
      </div>
      <button
        onClick={handleGetHint}
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
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

export default Page;

{
  options.map((option, index) => (
    <label className="block">
      <input
        key={index}
        type="radio"
        name="option"
        onClick={() => handleAnswerClick(option)}
        className={`block w-full py-2 px-4 rounded-lg focus:outline-none ${
          selectedAnswer === option
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black hover:bg-blue-100"
        }`}
      />
      {option}
    </label>
  ));
}
