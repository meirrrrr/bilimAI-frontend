import Image from "next/image";
import TopBar from "./components/TopBar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-9">
      <header>
        <TopBar title="Bilim AI" />
      </header>
      <div className="w-[250px]">
        <h1 className="text-[#235391] text-[40px] font-bold">
          Ace the <span className="text-[#FFED65]">exams to BIL NIS</span> with
          our AI Tutor
        </h1>
      </div>
      <p className="text-[#E9E9E9] font-light text-[16px] mb-[90px]">
        Prep smarter for the digital exams with unlimited questions, practice
        tests, and AI-powered personalized guidance, all at your command. 
      </p>
      <div className="flex justify-center flex-col">
        <button className="bg-[#FFED65] py-2 rounded-md">
          <Link href="/about-test">
            <span className="text-[#235391] font-semibold text-[14px]">GO</span>
          </Link>
        </button>
      </div>
    </div>
  );
}
