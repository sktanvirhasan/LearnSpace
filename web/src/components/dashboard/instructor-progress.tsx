"use client";

import { Progress } from "@/components/ui/progress";

export function InstructorProgress({ analyticsData }: { analyticsData: any }) {
  const { courses, enrollments, progresses } = analyticsData;

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Student Progress Tracking</h2>
        
        {courses.length === 0 ? (
          <p className="text-slate-500">You haven't created any courses yet.</p>
        ) : (
          <div className="space-y-8">
            {courses.map((course: any) => {
              const courseEnrollments = enrollments.filter((e: any) => e.course?.documentId === course.documentId);
              const courseLessonIds = course.lessons?.map((l: any) => l.documentId) || [];
              const totalLessons = courseLessonIds.length;

              return (
                <div key={course.documentId} className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-800">{course.title}</h3>
                    <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                      {courseEnrollments.length} Students Enrolled
                    </span>
                  </div>
                  
                  <div className="p-0">
                    {courseEnrollments.length === 0 ? (
                      <p className="text-sm text-slate-500 p-6 text-center">No students enrolled yet.</p>
                    ) : (
                      <table className="w-full text-left text-sm">
                        <thead className="bg-white border-b border-slate-100 text-slate-500">
                          <tr>
                            <th className="px-6 py-3 font-medium">Student Name</th>
                            <th className="px-6 py-3 font-medium">Email</th>
                            <th className="px-6 py-3 font-medium w-1/3">Progress</th>
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
                              <tr key={enr.documentId} className="bg-white hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-semibold text-slate-700">{student.username}</td>
                                <td className="px-6 py-4 text-slate-500">{student.email}</td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                    <Progress value={percent} className="h-2 flex-1" />
                                    <span className="text-xs font-bold w-9 text-right text-indigo-600">{percent}%</span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
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