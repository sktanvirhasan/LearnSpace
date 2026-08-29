import { cookies } from "next/headers";
import { ProtectedNavbar } from "@/components/layout/protected-navbar";
import { CourseManagement } from "@/components/dashboard/course-management";
import { InstructorProgress } from "@/components/dashboard/instructor-progress";
import { getMyCourses } from "@/lib/api/courses";
import { getInstructorAnalytics } from "@/lib/api/progress";

export default async function InstructorPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value || "";
  
  let courses = [];
  let analyticsData = { courses: [], enrollments: [], progresses: [] };
  
  if (token) {
    const coursesRes = await getMyCourses(token);
    courses = coursesRes.data || [];
    
    analyticsData = await getInstructorAnalytics(token);
  }

  return (
    <>
      <ProtectedNavbar />
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-12 font-sans">
        <div className="mx-auto max-w-6xl space-y-12">
          
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-8 md:p-10 text-white shadow-xl">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Instructor Dashboard</h1>
            <p className="text-blue-100 mt-2 text-lg">Manage your courses and track student progress.</p>
          </div>

          <CourseManagement initialCourses={courses} token={token} />
          
          <InstructorProgress analyticsData={analyticsData} />
          
        </div>
      </div>
    </>
  );
}