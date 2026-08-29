"use client";

import { useState } from "react";
import { CourseManagement } from "./course-management";
import { updateUserRole } from "@/lib/api/admin";
import { Users, BookOpen, GraduationCap, ShieldAlert, Settings2, LayoutGrid } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AdminDashboard({ 
  user,
  initialCourses, 
  token,
  instructors = [],
  adminData
}: { 
  user: any,
  initialCourses: any[], 
  token: string,
  instructors?: any[],
  adminData: any
}) {
  const [users, setUsers] = useState(adminData.users);
  const [loadingId, setLoadingId] = useState<string | number | null>(null);
  const [activeTab, setActiveTab] = useState<"users" | "courses">("users");
  
  const roles = adminData.roles;
  const stats = adminData.stats;

  const handleRoleChange = async (userId: string | number, newRoleId: string) => {
    if (!newRoleId) return;
    setLoadingId(userId);
    try {
      const updatedUser = await updateUserRole(userId, newRoleId, token);
      setUsers(users.map((u: any) => (u.id === userId ? { ...u, role: updatedUser.role } : u)));
    } catch (error: any) {
      alert(error.message || "Failed to update user role");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-50 p-4 md:p-8 lg:p-12 font-sans">
      <div className="mx-auto max-w-7xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-start">
            <Badge className="bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30 border-none mb-4 px-3 py-1 uppercase tracking-widest text-xs font-bold">
              System Dashboard
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
              Welcome, {user?.username || "Admin"}
            </h1>
            <p className="text-indigo-200/80 text-sm md:text-base font-semibold mb-2">
              {user?.email}
            </p>
            <p className="text-slate-400 text-base max-w-xl leading-relaxed mt-2">
              Manage system users, oversee all courses, and monitor platform activity from your command center.
            </p>
          </div>

          <div className="relative z-10 bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Access Level</p>
              <p className="text-xl font-extrabold text-white">Admin</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[1.5rem] border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100 shadow-inner">
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Users</p>
              <p className="text-4xl font-black text-slate-900">{stats.totalUsers}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[1.5rem] border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100 shadow-inner">
              <BookOpen className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Courses</p>
              <p className="text-4xl font-black text-slate-900">{stats.totalCourses}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[1.5rem] border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-violet-50 flex items-center justify-center border border-violet-100 shadow-inner">
              <GraduationCap className="w-8 h-8 text-violet-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Enrollments</p>
              <p className="text-4xl font-black text-slate-900">{stats.totalEnrollments}</p>
            </div>
          </div>
        </div>

        <div className="flex p-1.5 bg-white border border-slate-200/80 rounded-2xl w-fit shadow-sm">
          <button 
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === "users" 
                ? "bg-slate-900 text-white shadow-md" 
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Settings2 className="w-4 h-4" /> User Management
          </button>
          <button 
            onClick={() => setActiveTab("courses")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === "courses" 
                ? "bg-slate-900 text-white shadow-md" 
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> Course Management
          </button>
        </div>

        {activeTab === "users" && (
          <div className="bg-white rounded-[2rem] border border-slate-200/80 shadow-sm overflow-hidden animate-in fade-in duration-300">
            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Role Management & Access</h2>
              <p className="text-sm text-slate-500 mt-1 font-medium">Assign and manage system roles for all registered users.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">User Details</th>
                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Current Role</th>
                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-64">Assign Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {users.map((u: any) => {
                    const isSelf = String(u.id) === String(user?.id);
                    const isDropdownDisabled = loadingId === u.id || isSelf;

                    return (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="px-8 py-5 cursor-pointer">
                          <div className="font-bold text-base text-slate-900 flex items-center gap-2">
                            {u.username}
                            {isSelf && (
                              <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-blue-200 text-[10px] px-2 py-0 h-5">You</Badge>
                            )}
                          </div>
                          <div className="text-slate-500 font-medium text-sm mt-0.5">{u.email}</div>
                        </td>
                        <td className="px-8 py-5 cursor-pointer">
                          <span className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border shadow-sm ${
                            u.role?.name === "Admin" ? "bg-amber-50 text-amber-700 border-amber-200" :
                            u.role?.name === "Instructor" ? "bg-indigo-50 text-indigo-700 border-indigo-200" :
                            u.role?.name === "Content-Manager" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                            "bg-slate-50 text-slate-600 border-slate-200"
                          }`}>
                            {u.role?.name || "Standard User"}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <select
                            disabled={isDropdownDisabled}
                            value={u.role?.id || ""}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            className={`bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl font-semibold focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 block w-full p-3 outline-none transition-all ${
                              isDropdownDisabled 
                                ? "opacity-50 cursor-not-allowed bg-slate-100" 
                                : "cursor-pointer hover:bg-white"
                            }`}
                          >
                            <option value="" disabled>Select Role</option>
                            {roles.map((role: any) => (
                              <option key={role.id} value={role.id} className="font-medium">
                                {role.name}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="animate-in fade-in duration-300">
            <CourseManagement initialCourses={initialCourses} token={token} instructors={instructors} />
          </div>
        )}
        
      </div>
    </div>
  );
}