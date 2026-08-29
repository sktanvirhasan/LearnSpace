"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="h-16 w-full bg-slate-100/40 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 flex items-center justify-between px-6 lg:px-12 shadow-sm">
      <Link href="/" className="flex items-center gap-2 cursor-pointer">
        <GraduationCap className="h-7 w-7 text-indigo-600" />
        <span className="font-extrabold text-xl lg:text-2xl tracking-tight text-[#0a2540]">
          LearnSpace
        </span>
      </Link>
      
      <nav className="ml-auto flex items-center gap-4">
        <Link href="/login">
          <Button className="h-10 px-6 text-sm font-semibold bg-[#0a2540] hover:bg-[#0a2540]/90 text-white rounded-md transition-colors cursor-pointer">
            Log In
          </Button>
        </Link>
        <Link href="/signup">
          <Button className="h-10 px-6 text-sm font-semibold bg-[#0a2540] hover:bg-[#0a2540]/90 text-white rounded-md transition-colors cursor-pointer">
            Sign Up
          </Button>
        </Link>
      </nav>
    </header>
  );
}