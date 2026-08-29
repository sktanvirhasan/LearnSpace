"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { enrollInCourse } from "@/lib/api/enrollments";

export function StudentDashboard({ 
  allCourses, 
  initialEnrollments, 
  token 
}: { 
  allCourses: any[], 
  initialEnrollments: any[], 
  token: string 
}) {
  const router = useRouter();
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [activeTab, setActiveTab] = useState<"available" | "enrolled">("available");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const enrolledCourseIds = enrollments.map((e: any) => e.course?.documentId);

  const handleEnroll = async (courseId: string) => {
    setLoadingId(courseId);
    try {
      const res = await enrollInCourse(courseId, token);
      if (res.data) {
        const enrolledCourse = allCourses.find(c => c.documentId === courseId);
        setEnrollments([...enrollments, { ...res.data, course: enrolledCourse }]);
        setActiveTab("enrolled");
      }
    } catch (error: any) {
      alert(error.message || "Failed to enroll. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-12 font-sans">
      <div className="mx-auto max-w-6xl space-y-8">
        
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-700 rounded-2xl p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Student Portal</h1>
            <p className="text-violet-100 mt-2 text-lg">Explore courses, enroll, and start learning today.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl border border-white/20 text-center">
            <p className="text-sm font-medium text-violet-100 uppercase tracking-wider mb-1">My Courses</p>
            <p className="text-3xl font-bold">{enrollments.length}</p>
          </div>
        </div>

        <div className="flex gap-4 border-b border-slate-200 pb-px">
          <button 
            onClick={() => setActiveTab("available")}
            className={`px-6 py-3 font-semibold text-sm transition-colors border-b-2 ${activeTab === "available" ? "border-violet-600 text-violet-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            Available Courses
          </button>
          <button 
            onClick={() => setActiveTab("enrolled")}
            className={`px-6 py-3 font-semibold text-sm transition-colors border-b-2 ${activeTab === "enrolled" ? "border-violet-600 text-violet-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            My Learning
          </button>
        </div>

        {activeTab === "available" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCourses.map((course) => {
              const isEnrolled = enrolledCourseIds.includes(course.documentId);
              return (
                <div key={course.documentId} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full hover:shadow-md transition-all">
                  <h3 className="font-bold text-xl text-slate-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-3 mb-4 flex-1">{course.description}</p>
                  
                  {course.instructor?.username && (
                    <div className="mb-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold">
                        Instructor: {course.instructor.username}
                      </span>
                    </div>
                  )}

                  <Button 
                    onClick={() => handleEnroll(course.documentId)} 
                    disabled={isEnrolled || loadingId === course.documentId}
                    className={`w-full py-6 rounded-xl font-bold transition-all ${isEnrolled ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-700 text-white"}`}
                  >
                    {isEnrolled ? "✓ Enrolled" : loadingId === course.documentId ? "Enrolling..." : "Enroll Now"}
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "enrolled" && (
          <div>
            {enrollments.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center">
                <p className="text-slate-500 text-lg">You haven't enrolled in any courses yet.</p>
                <Button onClick={() => setActiveTab("available")} variant="outline" className="mt-4 border-violet-200 text-violet-700 hover:bg-violet-50">
                  Browse Courses
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrollments.map((enrollment: any) => (
                  <div key={enrollment.documentId} className="bg-white rounded-2xl shadow-sm border border-emerald-200 p-6 flex flex-col h-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                    <h3 className="font-bold text-xl text-slate-900 mb-2 mt-2">{enrollment.course?.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{enrollment.course?.description}</p>
                    <Button 
                      onClick={() => router.push(`/dashboard/course?id=${enrollment.course.documentId}`)} 
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                    >
                      Go to Course &rarr;
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}