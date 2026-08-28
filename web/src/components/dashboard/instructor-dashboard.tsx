import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star, PlayCircle } from "lucide-react";

export function InstructorDashboard() {
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-12">
      <div className="mx-auto max-w-6xl space-y-8">
        
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white shadow-lg">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold tracking-tight">Instructor Dashboard 🎓</h1>
            <p className="mt-2 text-emerald-100 max-w-xl">
              Manage your courses, track student progress, and view your earnings.
            </p>
          </div>
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Students</CardTitle>
              <Users className="h-5 w-5 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">850</div>
              <p className="text-xs text-slate-500 mt-1">Across 3 active courses</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Average Rating</CardTitle>
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">4.8</div>
              <p className="text-xs text-slate-500 mt-1">From 124 reviews</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Published Courses</CardTitle>
              <PlayCircle className="h-5 w-5 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">3</div>
              <p className="text-xs text-slate-500 mt-1">1 draft pending</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}