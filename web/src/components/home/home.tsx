"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Trophy, PlayCircle, Smartphone, Globe, CheckCircle2 } from "lucide-react";
import { SiPython, SiCplusplus, SiReact } from "react-icons/si";
import { DiJava } from "react-icons/di";

export function Homepage() {
  const scrollToCourses = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const coursesSection = document.getElementById("courses");
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col font-sans">
      <section className="relative bg-gradient-to-b from-[#eafcff] via-[#f6fdff] to-white pt-20 lg:pt-24 pb-32 px-6 lg:px-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#00d4ff] opacity-[0.07] blur-[140px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a2540]/5 border border-[#0a2540]/10 text-[#0a2540] font-medium text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#00b8d4]" />
              <span>Smart Learning Management Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-[#0a2540]">
              Welcome to <br />
              <span className="text-[#00b8d4]">Smarter Learning</span>
            </h1>

            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Explore thousands of premium programming courses, track your real-time progress, and achieve your career goals effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link href="/login" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-14 px-8 text-lg font-bold bg-[#0a2540] hover:bg-[#123457] text-white rounded-xl shadow-[0_10px_30px_rgba(10,37,64,0.2)] transition-all cursor-pointer">
                  Start Learning Now
                </Button>
              </Link>
              <a href="#courses" onClick={scrollToCourses} className="w-full sm:w-auto">
                <Button variant="outline" className="w-full h-14 px-8 text-lg font-bold border-slate-300 text-[#0a2540] hover:text-white hover:bg-[#0a2540] bg-transparent rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  View Courses
                </Button>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-md relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-5 flex flex-col items-center gap-3 text-center transform translate-y-2 hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <SiPython className="w-6 h-6 text-[#3776AB]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0a2540]">Python</h4>
                    <p className="text-xs text-slate-400 mt-1">Beginner Friendly</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-5 flex flex-col items-center gap-3 text-center transform -translate-y-3 hover:-translate-y-4 transition-all">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                    <DiJava className="w-7 h-7 text-[#ED8B00]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0a2540]">Java</h4>
                    <p className="text-xs text-slate-400 mt-1">Most Popular</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-5 flex flex-col items-center gap-3 text-center transform -translate-y-1 hover:-translate-y-2 transition-all">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                    <SiCplusplus className="w-6 h-6 text-[#00599C]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0a2540]">C++</h4>
                    <p className="text-xs text-slate-400 mt-1">Core Concepts</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-5 flex flex-col items-center gap-3 text-center transform translate-y-4 hover:translate-y-2 transition-all">
                  <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
                    <SiReact className="w-6 h-6 text-[#61DAFB]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0a2540]">React.js</h4>
                    <p className="text-xs text-slate-400 mt-1">Trending Now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="courses" className="py-24 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-4">Explore Our Top Courses</h2>
          <p className="text-slate-500 text-lg font-medium">Start your journey with our most popular and highly-rated programming courses.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
              <SiPython className="text-[#3776AB] w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-[#0a2540] mb-2">Python Masterclass</h3>
            <p className="text-slate-500 text-sm mb-5 leading-relaxed">Learn Python from scratch. Build automation scripts, APIs, and data science projects.</p>
            <Link href="/login" className="text-[#0a2540] font-bold text-sm hover:text-[#00d4ff] transition-colors cursor-pointer inline-flex items-center">
              Enroll Now <span className="ml-1">&rarr;</span>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-5">
              <DiJava className="text-[#ED8B00] w-7 h-7" />
            </div>
            <h3 className="font-bold text-xl text-[#0a2540] mb-2">Java Backend Development</h3>
            <p className="text-slate-500 text-sm mb-5 leading-relaxed">Master core Java and Spring Boot to build highly scalable enterprise applications.</p>
            <Link href="/login" className="text-[#0a2540] font-bold text-sm hover:text-[#00d4ff] transition-colors cursor-pointer inline-flex items-center">
              Enroll Now <span className="ml-1">&rarr;</span>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-5">
              <SiCplusplus className="text-[#00599C] w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-[#0a2540] mb-2">C++ Data Structures</h3>
            <p className="text-slate-500 text-sm mb-5 leading-relaxed">Deep dive into memory management, pointers, and complex data structures using C++.</p>
            <Link href="/login" className="text-[#0a2540] font-bold text-sm hover:text-[#00d4ff] transition-colors cursor-pointer inline-flex items-center">
              Enroll Now <span className="ml-1">&rarr;</span>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center mb-5">
              <SiReact className="text-[#61DAFB] w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-[#0a2540] mb-2">React.js Frontend</h3>
            <p className="text-slate-500 text-sm mb-5 leading-relaxed">Build modern, interactive web interfaces with React, hooks, and state management.</p>
            <Link href="/login" className="text-[#0a2540] font-bold text-sm hover:text-[#00d4ff] transition-colors cursor-pointer inline-flex items-center">
              Enroll Now <span className="ml-1">&rarr;</span>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-5">
              <Smartphone className="text-emerald-600 w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-[#0a2540] mb-2">Flutter App Dev</h3>
            <p className="text-slate-500 text-sm mb-5 leading-relaxed">Create beautiful cross-platform mobile applications for iOS and Android using Flutter.</p>
            <Link href="/login" className="text-[#0a2540] font-bold text-sm hover:text-[#00d4ff] transition-colors cursor-pointer inline-flex items-center">
              Enroll Now <span className="ml-1">&rarr;</span>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-5">
              <Globe className="text-purple-600 w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-[#0a2540] mb-2">Full-Stack Web</h3>
            <p className="text-slate-500 text-sm mb-5 leading-relaxed">Become a full-stack developer by mastering both frontend and backend technologies.</p>
            <Link href="/login" className="text-[#0a2540] font-bold text-sm hover:text-[#00d4ff] transition-colors cursor-pointer inline-flex items-center">
              Enroll Now <span className="ml-1">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 mb-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-4">Why Choose LearnSpace?</h2>
          <p className="text-slate-500 text-lg font-medium">We provide everything you need to upskill and advance your career in one unified platform.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group cursor-pointer">
            <div className="p-4 bg-indigo-50 rounded-2xl mb-6 group-hover:bg-indigo-100 transition-colors">
              <BookOpen className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="font-extrabold text-xl text-[#0a2540] mb-3">Premium Content</h3>
            <p className="text-base text-slate-500 font-medium leading-relaxed">Learn from industry experts with our highly curated, high-quality video content and resources.</p>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group cursor-pointer">
            <div className="p-4 bg-emerald-50 rounded-2xl mb-6 group-hover:bg-emerald-100 transition-colors">
              <Users className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="font-extrabold text-xl text-[#0a2540] mb-3">Expert Mentorship</h3>
            <p className="text-base text-slate-500 font-medium leading-relaxed">Get personalized guidance, mentorship, and feedback from top instructors around the globe.</p>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group cursor-pointer">
            <div className="p-4 bg-purple-50 rounded-2xl mb-6 group-hover:bg-purple-100 transition-colors">
              <Trophy className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-extrabold text-xl text-[#0a2540] mb-3">Earn Certificates</h3>
            <p className="text-base text-slate-500 font-medium leading-relaxed">Complete courses and earn verifiable certificates to boost your resume and career profile.</p>
          </div>
        </div>
      </section>

      <footer className="w-full bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-slate-500">
            &copy; {new Date().getFullYear()} LearnSpace. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}