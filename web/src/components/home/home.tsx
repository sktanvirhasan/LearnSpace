import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Users } from "lucide-react";

export function Homepage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="px-6 h-16 flex items-center border-b bg-white shadow-sm sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <GraduationCap className="h-6 w-6 text-indigo-600" />
          <span className="font-bold text-xl text-slate-900">LearnSpace</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login">
            <Button variant="ghost" className="font-medium cursor-pointer">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer">Get Started</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center mt-20">
        <div className="space-y-6 max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-slate-900">
            Master New Skills with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">LearnSpace</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            The ultimate learning management platform. Explore thousands of courses, track your progress, and achieve your goals today.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto w-full px-6 pb-20">
          <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="p-3 bg-indigo-100 rounded-full">
              <BookOpen className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-lg text-slate-900">Premium Courses</h3>
            <p className="text-sm text-slate-500">Learn from industry experts with our highly curated video content.</p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg text-slate-900">Expert Instructors</h3>
            <p className="text-sm text-slate-500">Get guidance and feedback from top instructors around the globe.</p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="p-3 bg-emerald-100 rounded-full">
              <GraduationCap className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-lg text-slate-900">Earn Certificates</h3>
            <p className="text-sm text-slate-500">Complete courses and earn certificates to boost your career profile.</p>
          </div>
        </div>
      </main>
    </div>
  );
}