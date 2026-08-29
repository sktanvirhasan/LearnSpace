import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProtectedNavbar } from "@/components/layout/protected-navbar";
import { ContentManagerDashboard } from "@/components/dashboard/content-manager-dashboard";
import { getCourses } from "@/lib/api/courses";
import { getInstructors } from "@/lib/api/users";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default async function ContentManagerPage() {
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

  const [coursesRes, instructors] = await Promise.all([
    getCourses(token),
    getInstructors(token),
  ]);

  const courses = coursesRes.data || [];

  return (
    <>
      <ProtectedNavbar />
      <ContentManagerDashboard 
        user={user}
        initialCourses={courses} 
        token={token} 
        instructors={instructors} 
      />
    </>
  );
}