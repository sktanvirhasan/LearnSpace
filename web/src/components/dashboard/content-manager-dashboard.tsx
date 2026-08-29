"use client";

import { CourseManagement } from "./course-management";
import { ShieldAlert, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ContentManagerDashboard({ 
  user,
  initialCourses, 
  token,
  instructors = []
}: { 
  user?: any,
  initialCourses: any[], 
  token: string,
  instructors?: any[]
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-50 p-4 md:p-8 lg:p-12 font-sans">
      <div className="mx-auto max-w-7xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header Banner - Matching Admin Dashboard Style */}
        <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-start">
            <Badge className="bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30 border-none mb-4 px-3 py-1 uppercase tracking-widest text-xs font-bold">
              Content Workspace
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
              Welcome, {user?.username || "Content Manager"}
            </h1>
            <p className="text-indigo-200/80 text-sm md:text-base font-semibold mb-2">
              {user?.email}
            </p>
            <p className="text-slate-400 text-base max-w-xl leading-relaxed mt-2">
              Oversee, manage, and scale platform curriculum and assign instructors seamlessly.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row md:flex-col gap-4 shrink-0">
            <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Access Level</p>
                <p className="text-xl font-extrabold text-white">Content Manager</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Courses</p>
                <p className="text-xl font-extrabold text-white">{initialCourses.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Course Management Interface */}
        <div className="animate-in fade-in duration-300">
          <CourseManagement initialCourses={initialCourses} token={token} instructors={instructors} />
        </div>
        
      </div>
    </div>
  );
}