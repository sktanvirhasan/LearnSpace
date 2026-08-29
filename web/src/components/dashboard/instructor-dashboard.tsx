"use client";

import { CourseManagement } from "./course-management";

export function InstructorDashboard({ initialCourses, token }: { initialCourses: any[], token: string }) {
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="bg-slate-900 rounded-xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
          <p className="text-slate-300 mt-2">Welcome back! Manage your courses and lessons below.</p>
        </div>
        <CourseManagement initialCourses={initialCourses} token={token} />
      </div>
    </div>
  );
}