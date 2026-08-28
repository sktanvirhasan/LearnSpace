import { ContentManagerDashboard } from "@/components/dashboard/content-manager-dashboard";
import { ProtectedNavbar } from "@/components/layout/protected-navbar";

export default function ContentManagerPage() {
 return (
    <>
      <ProtectedNavbar />
      <ContentManagerDashboard />
    </>
);
}