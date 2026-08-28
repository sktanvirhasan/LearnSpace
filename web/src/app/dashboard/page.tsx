import { StudentDashboard } from "@/components/dashboard/student-dashboard";
import { ProtectedNavbar } from "@/components/layout/protected-navbar";

export default function DashboardPage() {
 return (
    <>
      <ProtectedNavbar />
      <StudentDashboard />
    </>
  );
}