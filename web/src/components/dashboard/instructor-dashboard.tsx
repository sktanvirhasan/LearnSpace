"use client";

import { useState } from "react";
import { CourseManagement } from "./course-management";
import { InstructorProgress } from "./instructor-progress";
import { GraduationCap, BookOpen, LayoutGrid, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function InstructorDashboard({ 
  user,
  initialCourses, 
  token,
  analyticsData
}: { 
  user?: any,
  initialCourses: any[], 
  token: string,
  analyticsData: any
}) {
  const [activeTab, setActiveTab] = useState<"courses" | "progress">("courses");

  const totalEnrollments = analyticsData?.enrollments?.length || 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-50 p-4 md:p-8 lg:p-12 font-sans">
      <div className="mx-auto max-w-7xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-start">
            <Badge className="bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30 border-none mb-4 px-3 py-1 uppercase tracking-widest text-xs font-bold">
              Instructor Workspace
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
              Welcome, {user?.username || "Instructor"}
            </h1>
            <p className="text-indigo-200/80 text-sm md:text-base font-semibold mb-2">
              {user?.email}
            </p>
            <p className="text-slate-400 text-base max-w-xl leading-relaxed mt-2">
              Manage your courses, structure learning materials, and track student completion in real-time.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row md:flex-col gap-4 shrink-0">
            <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">My Courses</p>
                <p className="text-xl font-extrabold text-white">{initialCourses?.length || 0}</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Enrolled</p>
                <p className="text-xl font-extrabold text-white">{totalEnrollments}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex p-1.5 bg-white border border-slate-200/80 rounded-2xl w-fit shadow-sm">
          <button 
            onClick={() => setActiveTab("courses")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === "courses" 
                ? "bg-slate-900 text-white shadow-md" 
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> Course Management
          </button>
          <button 
            onClick={() => setActiveTab("progress")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === "progress" 
                ? "bg-slate-900 text-white shadow-md" 
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Student Progress
          </button>
        </div>

        {activeTab === "courses" && (
          <div className="animate-in fade-in duration-300">
            <CourseManagement initialCourses={initialCourses} token={token} />
          </div>
        )}

        {activeTab === "progress" && (
          <div className="animate-in fade-in duration-300">
            <InstructorProgress analyticsData={analyticsData} />
          </div>
        )}
        
      </div>
    </div>
  );
}