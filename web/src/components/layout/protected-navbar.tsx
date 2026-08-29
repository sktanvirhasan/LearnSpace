"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GraduationCap, LogOut } from "lucide-react";

export function ProtectedNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  let dashboardLink = "/dashboard";
  if (pathname.startsWith("/admin")) {
    dashboardLink = "/admin";
  } else if (pathname.startsWith("/instructor")) {
    dashboardLink = "/instructor";
  } else if (pathname.startsWith("/content-manager")) {
    dashboardLink = "/content-manager";
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.refresh();
    router.push('/');
  };

  return (
    <header className="h-16 w-full bg-slate-100/40 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 flex items-center justify-between px-6 lg:px-12 shadow-sm">
      <Link className="flex items-center gap-2 cursor-pointer" href={dashboardLink}>
        <GraduationCap className="h-7 w-7 text-indigo-600" />
        <span className="font-extrabold text-xl lg:text-2xl tracking-tight text-[#0a2540]">
          LearnSpace
        </span>
      </Link>
      
      <Button 
        onClick={handleLogout} 
        variant="ghost" 
        className="cursor-pointer flex items-center gap-2.5 text-slate-700 hover:text-rose-600 hover:bg-rose-50/60 font-bold text-base h-10 px-4 transition-all rounded-xl"
      >
        <LogOut className="h-5 w-5 text-slate-500 group-hover:text-rose-600" />
        Logout
      </Button>
    </header>
  );
}