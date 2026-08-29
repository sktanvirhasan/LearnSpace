"use client";

import { CourseManagement } from "./course-management";

export function ContentManagerDashboard({ 
  initialCourses, 
  token,
  instructors = []
}: { 
  initialCourses: any[], 
  token: string,
  instructors?: any[]
}) {
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-12 font-sans">
      <div className="mx-auto max-w-6xl space-y-6">
        
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Content Workspace</h1>
            <p className="text-emerald-100/90 mt-2 text-lg">Oversee, manage, and scale platform curriculum.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl border border-white/20">
            <p className="text-sm font-medium text-emerald-100 uppercase tracking-wider mb-1">Total Courses</p>
            <p className="text-3xl font-bold">{initialCourses.length}</p>
          </div>
        </div>

        <CourseManagement initialCourses={initialCourses} token={token} instructors={instructors} />
        
      </div>
    </div>
  );
}