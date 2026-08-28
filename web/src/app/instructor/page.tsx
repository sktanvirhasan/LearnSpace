import { InstructorDashboard } from "@/components/dashboard/instructor-dashboard";
import { ProtectedNavbar } from "@/components/layout/protected-navbar";

export default function InstructorPage() {
 return (
    <>
      <ProtectedNavbar />
      <InstructorDashboard />
    </>
  );
}