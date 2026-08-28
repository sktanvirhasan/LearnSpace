import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { ProtectedNavbar } from "@/components/layout/protected-navbar";

export default function AdminPage() {
 return (
    <>
      <ProtectedNavbar />
      <AdminDashboard />
    </>
  );
}