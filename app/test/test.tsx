"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import HintModal from "./ModalWindow";

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

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeOfTest = searchParams.get("type");
  const userId = searchParams.get("id");

  const [selectedOption, setSelectedOption] = useState(null);
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

  // --------------------FETCHING QUESTION FROM API----------------------------
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.post(
          "https://bilimai-backend-production.up.railway.app/api/v1/start-test",
          {
            userId: userId,
            type: typeOfTest,
          }
        );
        console.log(typeOfTest, userId);
        console.log(res.data.test.questions);
        setQuestions(res.data.test.questions);
        setOptions(createOptions(res.data.test.questions[0]));
        sessionStorage.setItem(
          "questions",
          JSON.stringify(res.data.test.questions)
        );
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
  // ------------------------------------------------------------------

  // ---------------HANDLE CLICKS--------------------------------------
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
  //----------------------------------------------------------------

  // --------------------SUBMIT-------------------------------------
  const handleSubmit = async () => {
    const finalAnswers = questions.map((question, index) => ({
      answer: answeredQuestions[index]?.answer || null,
      topic: question.topic,
      correct: answeredQuestions[index]?.correct || false,
      difficulty: question.difficulty,
    }));
    console.log("Final Answers:", finalAnswers);

    const response_feedback = await axios.post(
      "bilimai-py-production.up.railway.app/generate_feedback/",
      finalAnswers
    );
    const feedback = response_feedback.data;
    console.log(feedback);
    localStorage.setItem("feedback", feedback.feedback);
    localStorage.setItem("sum", feedback.correct_answers_count);
    router.push("/test/feedback");
  };
  //

  // --------------------LOADING CHECK FOR QUESTION---------------------
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
  ///---------------------------------------------------------------------

  // --------------------------MODAL WINDOW HINTS--------------------------
  const handleGetHint = async () => {
    setLoadingHint(true);
    try {
      const response = await axios.post(
        "bilimai-py-production.up.railway.app/get_hint/",
        {
          question: questions[currentQuestionIndex].question,
        }
      );
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
  //------------------------------------------------------------------------

  return (
    <>
      <TopBar />
      <div className="min-h-screen bg-gray-200 py-4 pt-[50px]">
        <main className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 lg:p-10">
          <h1 className="text-3xl font-semibold mb-6 text-center text-[#1CB0F6]">
            БИЛ тест
          </h1>
          <div className="relative pt-1 mb-6">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-[#1CB0F6]">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {currentQuestionIndex}/10
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
              <div
                className="bg-green-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          {currentQuestion ? (
            <div className="mb-6">
              <h2 className="text-sm font-medium text-gray-500 mb-2">
                {currentQuestion.topic}
              </h2>
              <p className="text-md mt-2 mb-4">
                {currentQuestionIndex + 1}. {currentQuestion.question}
              </p>
              <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    className={`block w-full py-3 px-5 rounded-lg border focus:outline-none text-sm transition-all duration-300 ${
                      selectedAnswer === option
                        ? "bg-[#1CB0F6] text-white"
                        : "bg-white border-gray-300 text-black hover:bg-blue-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md w-full lg:w-3/4 mx-auto text-center mb-6">
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
          {currentQuestionIndex < questions.length - 1 ? (
            <div className="mt-6">
              <button
                className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 px-5 rounded-lg mb-4 text-sm transition-all duration-300 hover:shadow-lg"
                onClick={handleNextClick}
              >
                След
              </button>
              <button
                onClick={handleGetHint}
                className="w-full bg-[#1CB0F6] text-white py-3 px-5 rounded-lg text-sm transition-all duration-300 hover:bg-[#1390c4]"
              >
                {loadingHint ? "Грузится..." : "Подсказка"}
              </button>
              <HintModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                hint={hint}
                loadingHint={loadingHint}
              />
            </div>
          ) : (
            <button
              className="mt-6 w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 px-5 rounded-lg text-sm transition-all duration-300 hover:shadow-lg"
              onClick={handleSubmit}
            >
              Закончить
            </button>
          )}
        </main>
      </div>
    </>
  );
}

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
