import { cookies } from "next/headers";
import { ProtectedNavbar } from "@/components/layout/protected-navbar";
import { ContentManagerDashboard } from "@/components/dashboard/content-manager-dashboard";
import { getCourses } from "@/lib/api/courses";
import { getInstructors } from "@/lib/api/users";

export default async function ContentManagerPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value || "";
  
  let courses = [];
  let instructors = [];
  
  if (token) {
    const coursesRes = await getCourses(token);
    courses = coursesRes.data || [];
    
    instructors = await getInstructors(token);
  }

  return (
    <>
      <ProtectedNavbar />
      <ContentManagerDashboard initialCourses={courses} token={token} instructors={instructors} />
    </>
  );
}