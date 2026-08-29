import { cookies } from "next/headers";
import { ProtectedNavbar } from "@/components/layout/protected-navbar";
import { InstructorDashboard } from "@/components/dashboard/instructor-dashboard";
import { getMyCourses } from "@/lib/api/courses";

export default async function InstructorPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value || "";
  
  let courses = [];
  if (token) {
    const res = await getMyCourses(token);
    courses = res.data || [];
  }

  return (
    <>
      <ProtectedNavbar />
      <InstructorDashboard initialCourses={courses} token={token} />
    </>
  );
}