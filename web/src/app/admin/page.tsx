import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProtectedNavbar } from "@/components/layout/protected-navbar";
import { getAdminData } from "@/lib/api/admin";
import { getCourses } from "@/lib/api/courses";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default async function AdminPage() {
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

  const [adminData, coursesRes] = await Promise.all([
    getAdminData(token),
    getCourses(token),
  ]);

  const courses = coursesRes.data || [];
  const instructors = adminData.users?.filter((u: any) => u.role?.name === "Instructor") || [];

  return (
    <>
      <ProtectedNavbar />
      <AdminDashboard 
        user={user}
        initialCourses={courses} 
        token={token} 
        instructors={instructors} 
        adminData={adminData} 
      />
    </>
  );
}