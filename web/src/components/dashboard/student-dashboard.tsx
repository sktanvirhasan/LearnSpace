"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { enrollInCourse } from "@/lib/api/enrollments";
import { BookOpen, User, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export function StudentDashboard({ 
  user,
  allCourses, 
  initialEnrollments, 
  token 
}: { 
  user?: { username: string; email: string };
  allCourses: any[]; 
  initialEnrollments: any[]; 
  token: string;
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
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="mx-auto max-w-7xl space-y-8">
        
        <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 lg:p-10 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8 border border-slate-800">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex items-center gap-6">
            <div className="hidden sm:flex h-20 w-20 rounded-full bg-slate-800 border border-slate-700 items-center justify-center shadow-inner">
              <User className="h-10 w-10 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">{user?.username || "Student"}</span>!
              </h1>
              <div className="flex items-center gap-2 text-slate-400 text-sm md:text-base font-medium">
                 <Mail className="w-4 h-4" /> 
                 {user?.email || "student@learnspace.com"}
              </div>
            </div>
          </div>
          
          <div className="relative z-10 bg-white/5 backdrop-blur-md px-8 py-5 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center shadow-lg min-w-[160px]">
            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-1 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> My Courses
            </p>
            <p className="text-4xl font-extrabold text-white">{enrollments.length}</p>
          </div>
        </div>

        <div className="flex p-1.5 space-x-2 bg-slate-200/50 rounded-xl w-max border border-slate-200/60 shadow-sm">
          <button 
            onClick={() => setActiveTab("available")}
            className={`cursor-pointer px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === "available" 
              ? "bg-white text-indigo-700 shadow-sm" 
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/80"
            }`}
          >
            Available Courses
          </button>
          <button 
            onClick={() => setActiveTab("enrolled")}
            className={`cursor-pointer px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === "enrolled" 
              ? "bg-white text-indigo-700 shadow-sm" 
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/80"
            }`}
          >
            My Learning
          </button>
        </div>

        {activeTab === "available" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {allCourses.map((course) => {
              const isEnrolled = enrolledCourseIds.includes(course.documentId);
              return (
                <div key={course.documentId} className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-400 to-purple-600"></div>
                  
                  <div className="flex-1 mt-2">
                    <h3 className="font-bold text-xl text-slate-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-5 leading-relaxed">
                      {course.description}
                    </p>
                    
                    {course.instructor?.username && (
                      <div className="mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold text-xs border border-indigo-100">
                          {course.instructor.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Instructor</p>
                          <p className="text-sm font-medium text-slate-700">{course.instructor.username}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button 
                    onClick={() => handleEnroll(course.documentId)} 
                    disabled={isEnrolled || loadingId === course.documentId}
                    className={`w-full py-6 rounded-xl font-semibold transition-all shadow-sm ${
                      isEnrolled 
                      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-200 cursor-not-allowed" 
                      : "cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-md"
                    }`}
                  >
                    {isEnrolled ? (
                      <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Enrolled</span>
                    ) : loadingId === course.documentId ? (
                      "Enrolling..."
                    ) : (
                      "Enroll Now"
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "enrolled" && (
          <div>
            {enrollments.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-200 text-center flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No courses yet</h3>
                <p className="text-slate-500 mb-6">You haven't enrolled in any courses yet.</p>
                <Button onClick={() => setActiveTab("available")} className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8">
                  Browse Courses
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {enrollments.map((enrollment: any) => (
                  <div key={enrollment.documentId} className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
                    <div className="flex-1 mt-2">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider border border-emerald-100">Enrolled</span>
                      </div>
                      <h3 className="font-bold text-xl text-slate-900 mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                        {enrollment.course?.title}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed">
                        {enrollment.course?.description}
                      </p>
                    </div>
                    <Button 
                      onClick={() => router.push(`/dashboard/course?id=${enrollment.course.documentId}`)} 
                      className="cursor-pointer w-full py-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-sm flex items-center justify-center gap-2 group-hover:bg-emerald-600 transition-colors"
                    >
                      Go to Course <ArrowRight className="w-4 h-4" />
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