"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GraduationCap, LogOut } from "lucide-react";

export function ProtectedNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.refresh();
    router.push('/');
  };

  return (
    <header className="px-6 h-16 flex items-center justify-between border-b bg-white shadow-sm sticky top-0 z-50">
      <Link className="flex items-center gap-2 cursor-pointer" href="/">
        <GraduationCap className="h-6 w-6 text-indigo-600" />
        <span className="font-bold text-xl text-slate-900">LearnSpace</span>
      </Link>
      
      <Button onClick={handleLogout} variant="destructive" className="cursor-pointer flex items-center gap-2">
        <LogOut className="h-4 w-4" /> Logout
      </Button>
    </header>
  );
}