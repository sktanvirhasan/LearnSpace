import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, Clock } from "lucide-react";

export function ContentManagerDashboard() {
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-12">
      <div className="mx-auto max-w-6xl space-y-8">
        
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white shadow-lg">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold tracking-tight">Content Manager 📋</h1>
            <p className="mt-2 text-blue-100 max-w-xl">
              Review pending courses, manage categories, and oversee platform content quality.
            </p>
          </div>
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Pending Review</CardTitle>
              <Clock className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">12</div>
              <p className="text-xs text-slate-500 mt-1">Courses waiting for approval</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Approved Courses</CardTitle>
              <CheckCircle className="h-5 w-5 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">145</div>
              <p className="text-xs text-slate-500 mt-1">Live on platform</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Categories</CardTitle>
              <FileText className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">18</div>
              <p className="text-xs text-slate-500 mt-1">2 new requested</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}