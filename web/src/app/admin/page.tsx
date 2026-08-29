import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProtectedNavbar } from "@/components/layout/protected-navbar";
import { getAdminData } from "@/lib/api/admin";
import { getCourses } from "@/lib/api/courses";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value || "";

  if (!token) {
    redirect("/login");
  }

  const adminData = await getAdminData(token);
  const coursesRes = await getCourses(token);
  const courses = coursesRes.data || [];
  
  const instructors = adminData.users.filter((u: any) => u.role?.name === "Instructor" || u.role?.name === "Admin");

  return (
    <>
      <ProtectedNavbar />
      <AdminDashboard 
        initialCourses={courses} 
        token={token} 
        instructors={instructors} 
        adminData={adminData} 
      />
    </>
  );
}