"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import HintModal from "./ModalWindow";
import {
  CalendarIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  HomeIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

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
  questionId: string;
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeOfTest = searchParams.get("type");
  const userId = searchParams.get("id");

  const [testId, setTestId] = useState<string | undefined>();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
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

  // Fetching questions from API
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
        setQuestions(res.data.test.questions);
        setOptions(createOptions(res.data.test.questions[0]));
        setTestId(res.data.test._id);
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

    fetchQuestions();
  }, [typeOfTest, userId]);

  const createOptions = (question: Question) => {
    return [question.correct_answer, ...question.incorrect_answers];
  };

  // Handle answer click
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
        questionId: questions[currentQuestionIndex]._id,
      },
    }));
  };

  const handleNextClick = () => {
    setSelectedAnswer(null);
    const nextIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIndex);
    setOptions(createOptions(questions[nextIndex]));
  };

  // Submit test
  const handleSubmit = async () => {
    const finalAnswers = questions.map((question, index) => ({
      answer: answeredQuestions[index]?.answer || null,
      questionId: question._id,
      topic: question.topic,
      correct: answeredQuestions[index]?.correct || false,
      difficulty: question.difficulty,
    }));

    console.log("Final Answers:", finalAnswers);

    try {
      const response = await axios.post(
        "https://bilimai-backend-production.up.railway.app/api/v1/submit-test",
        {
          userId: userId,
          testId: testId,
          answers: finalAnswers,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting test:", error);
    }

    // Generate feedback on the frontend
    const feedback = generateFeedback(finalAnswers);
    sessionStorage.setItem("feedback", feedback.feedback);
    sessionStorage.setItem("sum", feedback.score.toString());
    sessionStorage.setItem("answers", JSON.stringify(finalAnswers));
    router.push("/test/feedback");
  };

  const generateFeedback = (answers: AnsweredQuestions[]) => {
    const topicsToReview = Array.from(
      new Set(
        answers
          .filter((answer) => !answer.correct)
          .map((answer) => answer.topic)
      )
    );
    const correctAnswersCount = answers.filter(
      (answer) => answer.correct
    ).length;

    const feedbackText = `Вам нужно разобрать темы: ${topicsToReview.join(
      ", "
    )}`;
    return {
      feedback: feedbackText,
      score: correctAnswersCount,
    };
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
      const response = await axios.post(
        "https://bilimai-py-production.up.railway.app/get_hint/",
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

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white shadow-md z-50`}
      >
        <div className="pt-4 px-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1CB0F6]">Bilim AI</h1>
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-8 pl-[10px]">
          <Link
            href="/dashboard"
            className="flex items-center p-3 mt-2 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Главная
          </Link>
          <Link
            href="/about-test"
            className="flex items-center p-3 mt-2 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            <BookOpenIcon className="w-5 h-5 mr-2" />
            Тесты
          </Link>
          <Link
            href="/chat"
            className="flex items-center p-3 mt-2 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            <ChartBarIcon className="w-5 h-5 mr-2" />
            AI Chat
          </Link>
          <Link
            href="/profile"
            className="flex items-center p-3 mt-2 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            <UserIcon className="w-5 h-5 mr-2" />
            Профиль
          </Link>
          <Link
            href="/"
            className="flex items-center p-3 mt-2 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            <ArrowLeftEndOnRectangleIcon className="w-5 h-5 mr-2" />
            Выйти
          </Link>
        </nav>
      </aside>
      <div className="flex flex-col flex-grow lg:ml-64">
        <header className="flex items-center justify-between p-4 bg-white shadow-md lg:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
          <h1 className="text-xl font-bold">Тест</h1>
          <div className="flex items-center">
            <Link href="/profile">
              <button className="p-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                <UserIcon className="w-6 h-6" />
              </button>
            </Link>
          </div>
        </header>
        <main className="min-h-screen bg-gray-200 py-4 flex-grow lg:pt-[100px] ">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 lg:p-10">
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
                    {currentQuestionIndex + 1}/15
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
          </div>
        </main>
      </div>
    </div>
  );
}
