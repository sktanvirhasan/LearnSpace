"use client";

import { Progress } from "@/components/ui/progress";
import { Users, BookOpen } from "lucide-react";

export function InstructorProgress({ analyticsData }: { analyticsData: any }) {
  const { courses = [], enrollments = [], progresses = [] } = analyticsData || {};

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-[2rem] border border-slate-200/80 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="mb-8">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Student Progress Tracking</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">Monitor individual completion rates across all your active courses.</p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-semibold">You haven't created any courses yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {courses.map((course: any) => {
              const courseEnrollments = enrollments.filter((e: any) => e.course?.documentId === course.documentId);
              const courseLessonIds = course.lessons?.map((l: any) => l.documentId) || [];
              const totalLessons = courseLessonIds.length;

              return (
                <div key={course.documentId || course.id} className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-slate-900 px-6 py-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-extrabold text-lg tracking-tight">{course.title}</h3>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">{totalLessons} Total Lessons</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300 bg-indigo-500/20 px-3 py-1.5 rounded-xl border border-indigo-500/30 w-fit">
                      <Users className="w-3.5 h-3.5" />
                      {courseEnrollments.length} {courseEnrollments.length === 1 ? "Student Enrolled" : "Students Enrolled"}
                    </span>
                  </div>

                  <div>
                    {courseEnrollments.length === 0 ? (
                      <p className="text-sm font-medium text-slate-400 p-8 text-center bg-slate-50/50">No students enrolled yet.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-slate-50 border-b border-slate-100 text-slate-400">
                            <tr>
                              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest">Student Name</th>
                              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest">Email</th>
                              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest w-1/3">Progress</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {courseEnrollments.map((enr: any) => {
                              const student = enr.student;
                              if (!student) return null;

                              const studentProg = progresses.filter((p: any) => 
                                p.student?.documentId === student.documentId && 
                                courseLessonIds.includes(p.lesson?.documentId)
                              );

                              const percent = totalLessons > 0 ? Math.round((studentProg.length / totalLessons) * 100) : 0;

                              return (
                                <tr key={enr.documentId || enr.id} className="bg-white hover:bg-slate-50/80 transition-colors">
                                  <td className="px-6 py-4 font-bold text-slate-900">{student.username}</td>
                                  <td className="px-6 py-4 text-slate-500 font-medium">{student.email}</td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                      <Progress value={percent} className="h-2 flex-1 bg-slate-100" />
                                      <span className="text-xs font-bold w-10 text-right text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">{percent}%</span>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}