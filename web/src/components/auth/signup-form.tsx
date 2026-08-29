"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/lib/api/auth";
import { useAuth } from "@/lib/context/auth-context";
import { Loader2, Eye, EyeOff } from "lucide-react";

export function SignupForm() {
  const router = useRouter();
  const { refetchUser } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const user = await registerUser({ username, email, password });
      console.log("Registered user:", user);
      
      await refetchUser();
      
      router.refresh();
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-[#f5f7fa] px-4 font-sans py-8">
      <div className="w-full max-w-[580px] bg-white px-8 lg:px-12 py-10 rounded-xl shadow-xl border border-slate-100">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#0a2540] tracking-tight mb-2">Sign Up</h2>
          <p className="text-slate-500 font-medium text-sm">Create an account to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5 text-left">
            <Label htmlFor="username" className="text-sm font-semibold text-[#0a2540]">
              Username <span className="text-red-500">*</span>
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="h-11 px-4 text-sm bg-white border-slate-300 focus:bg-white focus:ring-[#0a2540] focus:border-[#0a2540] rounded-md"
            />
          </div>

          <div className="space-y-1.5 text-left">
            <Label htmlFor="email" className="text-sm font-semibold text-[#0a2540]">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 px-4 text-sm bg-white border-slate-300 focus:bg-white focus:ring-[#0a2540] focus:border-[#0a2540] rounded-md"
            />
          </div>

          <div className="space-y-1.5 text-left">
            <Label htmlFor="password" className="text-sm font-semibold text-[#0a2540]">
              Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 px-4 text-sm bg-white border-slate-300 focus:bg-white focus:ring-[#0a2540] focus:border-[#0a2540] rounded-md pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0a2540] focus:outline-none cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-md bg-rose-50 border border-rose-100">
              <p className="text-sm font-medium text-rose-600 text-center">{error}</p>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full h-11 text-base font-bold bg-[#0a2540] hover:bg-[#0a2540]/90 text-white rounded-md shadow-sm transition-all mt-6 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Creating account...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="h-px w-full bg-slate-200"></span>
          <span className="text-xs font-medium text-slate-400 whitespace-nowrap">Or continue with</span>
          <span className="h-px w-full bg-slate-200"></span>
        </div>

        <p className="mt-6 text-center text-sm font-medium text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="text-[#0a2540] hover:text-[#0a2540]/80 font-bold transition-colors cursor-pointer">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}