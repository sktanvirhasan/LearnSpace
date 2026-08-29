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

  const userRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337"}/api/users/me?populate=role`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  const userData = await userRes.json();

  const coursesRes = await getCourses(token);
  const courses = coursesRes.data || [];

  const enrollmentsRes = await getMyEnrollments(token);
  const enrollments = enrollmentsRes.data || [];

  return (
    <>
      <ProtectedNavbar />
      <StudentDashboard 
        user={userData}
        allCourses={courses} 
        initialEnrollments={enrollments} 
        token={token} 
      />
    </>
  );
}