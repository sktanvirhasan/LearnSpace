import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProtectedNavbar } from "@/components/layout/protected-navbar";
import { InstructorDashboard } from "@/components/dashboard/instructor-dashboard";
import { getMyCourses } from "@/lib/api/courses";
import { getInstructorAnalytics } from "@/lib/api/progress";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default async function InstructorPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value || "";

  if (!token) {
    redirect("/login");
  }

  const userRes = await fetch(`${API_URL}/api/users/me?populate=*`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!userRes.ok) {
    redirect("/login");
  }

  const user = await userRes.json();

  const [coursesRes, analyticsData] = await Promise.all([
    getMyCourses(token),
    getInstructorAnalytics(token),
  ]);

  const courses = coursesRes.data || [];

  return (
    <>
      <ProtectedNavbar />
      <InstructorDashboard 
        user={user}
        initialCourses={courses} 
        token={token} 
        analyticsData={analyticsData}
      />
    </>
  );
}