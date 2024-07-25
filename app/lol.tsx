/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Q8EDCt1C1kg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Bilim AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Ace Your Exams with Bilim AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Bilim AI is an advanced AI-powered exam preparation tool
                    that helps students excel in their academic pursuits. Unlock
                    your full potential and conquer your exams with our
                    comprehensive learning solutions.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
              <img
                src="/placeholder.svg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Exam Subjects Covered
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Bilim AI provides comprehensive exam preparation solutions for
                  a wide range of subjects, ensuring you're fully equipped to
                  excel in your academic journey.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <CalculatorIcon className="h-6 w-6" />
                  <h3 className="text-lg font-bold">Mathematics</h3>
                </div>
                <p className="text-muted-foreground">
                  Conquer complex mathematical concepts and problem-solving with
                  our AI-powered tutoring.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <SpaceIcon className="h-6 w-6" />
                  <h3 className="text-lg font-bold">Science</h3>
                </div>
                <p className="text-muted-foreground">
                  Dive deep into the world of science and master the fundamental
                  principles with Bilim AI.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-6 w-6" />
                  <h3 className="text-lg font-bold">History</h3>
                </div>
                <p className="text-muted-foreground">
                  Explore the rich tapestry of human history and ace your
                  history exams with our comprehensive resources.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <LanguagesIcon className="h-6 w-6" />
                  <h3 className="text-lg font-bold">Languages</h3>
                </div>
                <p className="text-muted-foreground">
                  Master the intricacies of language and communication with our
                  AI-driven language learning tools.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <LibraryIcon className="h-6 w-6" />
                  <h3 className="text-lg font-bold">Literature</h3>
                </div>
                <p className="text-muted-foreground">
                  Dive into the world of literature and enhance your analytical
                  and critical thinking skills.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <CurrencyIcon className="h-6 w-6" />
                  <h3 className="text-lg font-bold">Economics</h3>
                </div>
                <p className="text-muted-foreground">
                  Grasp the fundamental principles of economics and apply them
                  to real-world scenarios with Bilim AI.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Students Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from our satisfied students who have achieved remarkable
                  results with Bilim AI.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card className="p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-lg font-bold">John Doe</h4>
                    <p className="text-muted-foreground">High School Student</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  "Bilim AI has been a game-changer for me. The personalized\n
                  learning approach and AI-powered tutoring have helped me\n
                  improve my grades and feel more confident in my studies."
                </p>
              </Card>
              <Card className="p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JA</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-lg font-bold">Jane Ahn</h4>
                    <p className="text-muted-foreground">College Student</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  "I was struggling with my exam preparation, but Bilim AI\n
                  provided me with the perfect tools and resources to\n overcome
                  my challenges. The app's adaptive learning\n features have
                  been a lifesaver."
                </p>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions about Bilim AI? Check out our FAQs for answers
                  to the most common queries.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <Accordion
                type="single"
                collapsible
                className="border rounded-lg"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-4 py-3 text-lg font-medium">
                    What is Bilim AI?
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-muted-foreground">
                    Bilim AI is an advanced AI-powered exam preparation tool
                    that helps students excel in their academic pursuits. It
                    offers personalized learning solutions, adaptive practice
                    tests, and comprehensive study materials across a wide range
                    of subjects.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="px-4 py-3 text-lg font-medium">
                    How does Bilim AI work?
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-muted-foreground">
                    Bilim AI uses advanced machine learning algorithms to
                    analyze your learning patterns and create a personalized
                    study plan. It provides adaptive practice tests, interactive
                    lessons, and real-time feedback to help you identify and
                    address your weaknesses.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="px-4 py-3 text-lg font-medium">
                    What subjects are covered by Bilim AI?
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-muted-foreground">
                    Bilim AI offers comprehensive exam preparation solutions for
                    a wide range of subjects, including Mathematics, Science,
                    History, Languages, Literature, and Economics. Our team of
                    experts is continuously expanding the subject coverage to
                    meet the diverse needs of students.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="px-4 py-3 text-lg font-medium">
                    How much does Bilim AI cost?
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-muted-foreground">
                    Bilim AI offers flexible pricing plans to cater to the
                    diverse needs of students. We have a free basic plan as well
                    as affordable premium plans with additional features and
                    personalized support. You can check our pricing page for
                    more details and find the plan that best suits your
                    requirements.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Bilim AI. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function CalculatorIcon(props: any) {
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
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  );
}

function CalendarIcon(props: any) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CurrencyIcon(props: any) {
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
      <circle cx="12" cy="12" r="8" />
      <line x1="3" x2="6" y1="3" y2="6" />
      <line x1="21" x2="18" y1="3" y2="6" />
      <line x1="3" x2="6" y1="21" y2="18" />
      <line x1="21" x2="18" y1="21" y2="18" />
    </svg>
  );
}

function LanguagesIcon(props: any) {
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
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      <path d="M14 18h6" />
    </svg>
  );
}

function LibraryIcon(props: any) {
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
      <path d="m16 6 4 14" />
      <path d="M12 6v14" />
      <path d="M8 8v12" />
      <path d="M4 4v16" />
    </svg>
  );
}

function MountainIcon(props: any) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function SpaceIcon(props: any) {
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
      <path d="M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1" />
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
