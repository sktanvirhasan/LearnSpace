import { cookies } from "next/headers";
import { getCourse } from "@/lib/api/courses";
import { CourseViewer } from "@/components/course/course-viewer";
import { ProtectedNavbar } from "@/components/layout/protected-navbar";
import { redirect } from "next/navigation";

export default async function CoursePage({ searchParams }: { searchParams: any }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value || "";
  
  if (!token) {
    redirect("/login");
  }

  const resolvedParams = await searchParams;
  const courseId = resolvedParams?.id;

  if (!courseId) {
    return (
      <>
        <ProtectedNavbar />
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800">Invalid Course ID</h1>
            <a href="/dashboard" className="text-violet-600 mt-4 inline-block hover:underline">&larr; Back to Dashboard</a>
          </div>
        </div>
      </>
    );
  }

  const courseRes = await getCourse(courseId, token);

  if (courseRes?.error) {
    return (
      <>
        <ProtectedNavbar />
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-rose-600">Strapi Error</h1>
            <p className="text-slate-700 mt-2 font-medium">{courseRes.error.message}</p>
            <a href="/dashboard" className="text-violet-600 mt-4 inline-block hover:underline">&larr; Back to Dashboard</a>
          </div>
        </div>
      </>
    );
  }

  const course = courseRes?.data;

  if (!course) {
    return (
      <>
        <ProtectedNavbar />
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800">Course not found</h1>
            <a href="/dashboard" className="text-violet-600 mt-4 inline-block hover:underline">&larr; Back to Dashboard</a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ProtectedNavbar />
      <CourseViewer course={course} />
    </>
  );
}