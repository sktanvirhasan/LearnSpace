import { cookies } from "next/headers";
import { ProtectedNavbar } from "@/components/layout/protected-navbar";
import { StudentDashboard } from "@/components/dashboard/student-dashboard";
import { getCourses } from "@/lib/api/courses";
import { getMyEnrollments } from "@/lib/api/enrollments";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value || "";

  if (!token) {
    redirect("/login");
  }

  const coursesRes = await getCourses(token);
  const courses = coursesRes.data || [];

  const enrollmentsRes = await getMyEnrollments(token);
  const enrollments = enrollmentsRes.data || [];

  return (
    <>
      <ProtectedNavbar />
      <StudentDashboard allCourses={courses} initialEnrollments={enrollments} token={token} />
    </>
  );
}