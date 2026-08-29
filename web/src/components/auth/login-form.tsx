"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/lib/api/auth";
import { useAuth } from "@/lib/context/auth-context";
import { CheckCircle2, Loader2, Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const { refetchUser } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await loginUser({ identifier, password });
      await refetchUser();
      router.refresh();
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex flex-col lg:flex-row bg-white font-sans">
      
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-[#f5f7fa] p-16">
        
        <div className="max-w-lg flex flex-col items-center text-center">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight mb-6 text-[#0a2540]">
            Welcome to <br /> <span className="text-[#1e3a8a]">Smarter Learning</span>
          </h1>
          
          <p className="text-slate-600 text-lg mb-10 leading-relaxed max-w-md font-medium">
            A smarter way to learn, track your progress, and achieve your goals effortlessly.
          </p>

          <div className="flex flex-col items-start space-y-5 text-slate-700">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="w-6 h-6 text-[#1e3a8a]" />
              <span className="text-lg font-medium">Interactive learning experience</span>
            </div>
            <div className="flex items-center gap-4">
              <CheckCircle2 className="w-6 h-6 text-[#1e3a8a]" />
              <span className="text-lg font-medium">Real-time progress tracking</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center items-center px-8 py-16 lg:px-24 bg-white">
        
        <div className="w-full max-w-md">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-[#0a2540] tracking-tight mb-3">Sign In</h2>
            <p className="text-slate-500 font-medium text-base">Login to your account to start learning</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2.5 text-left">
              <Label htmlFor="identifier" className="text-base font-semibold text-[#0a2540]">Email Address</Label>
              <Input
                id="identifier"
                type="email"
                placeholder="Enter your email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="h-14 px-4 text-base bg-slate-50 border-slate-200 focus:bg-white focus:ring-[#0a2540] focus:border-[#0a2540] rounded-lg"
              />
            </div>

            <div className="space-y-2.5 text-left">
              <Label htmlFor="password" className="text-base font-semibold text-[#0a2540]">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-14 px-4 text-base bg-slate-50 border-slate-200 focus:bg-white focus:ring-[#0a2540] focus:border-[#0a2540] rounded-lg pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0a2540] focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-rose-50 border border-rose-100">
                <p className="text-base font-medium text-rose-600 text-center">{error}</p>
              </div>
            )}

            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full h-14 text-lg font-bold bg-[#0a2540] hover:bg-[#0a2540]/90 text-white rounded-lg shadow-sm transition-all mt-6 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" /> Logging in...
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </form>

          <p className="mt-10 text-center text-base font-medium text-slate-500">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#0a2540] hover:text-[#0a2540]/80 font-bold transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}