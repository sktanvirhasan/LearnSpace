import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Activity } from "lucide-react";

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-12">
      <div className="mx-auto max-w-6xl space-y-8">
        
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 p-8 text-white shadow-lg">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold tracking-tight">Admin Control Panel ⚙️</h1>
            <p className="mt-2 text-rose-100 max-w-xl">
              Welcome back, Super Admin. Here is the overview of your entire platform today.
            </p>
          </div>
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Users</CardTitle>
              <Users className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">1,245</div>
              <p className="text-xs text-slate-500 mt-1">+180 this month</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Revenue</CardTitle>
              <DollarSign className="h-5 w-5 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">$12,450</div>
              <p className="text-xs text-slate-500 mt-1">+15% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">System Status</CardTitle>
              <Activity className="h-5 w-5 text-rose-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-500">Healthy</div>
              <p className="text-xs text-slate-500 mt-1">All services running smoothly</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}