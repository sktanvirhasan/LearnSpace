"use client";

import { useState } from "react";
import { CourseManagement } from "./course-management";
import { updateUserRole } from "@/lib/api/admin";
import { Users, BookOpen, GraduationCap, ShieldAlert } from "lucide-react";

export function AdminDashboard({ 
  initialCourses, 
  token,
  instructors = [],
  adminData
}: { 
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
  const currentUserId = adminData.currentUserId;

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
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-12 font-sans">
      <div className="mx-auto max-w-6xl space-y-8">
        
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Admin Super Dashboard</h1>
            <p className="text-blue-100/90 mt-2 text-lg">System-wide overview, user management, and courses.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-amber-400" />
            <div>
              <p className="text-sm font-medium text-blue-100 uppercase tracking-wider mb-1">Access Level</p>
              <p className="text-xl font-bold">Super Admin</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
              <Users className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase">Total Users</p>
              <p className="text-3xl font-bold text-slate-900">{stats.totalUsers}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-violet-50 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-violet-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase">Total Courses</p>
              <p className="text-3xl font-bold text-slate-900">{stats.totalCourses}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase">Total Enrollments</p>
              <p className="text-3xl font-bold text-slate-900">{stats.totalEnrollments}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 border-b border-slate-200 pb-px mt-4">
          <button 
            onClick={() => setActiveTab("users")}
            className={`px-6 py-3 font-semibold text-sm transition-colors border-b-2 ${activeTab === "users" ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            User Management
          </button>
          <button 
            onClick={() => setActiveTab("courses")}
            className={`px-6 py-3 font-semibold text-sm transition-colors border-b-2 ${activeTab === "courses" ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            Course Management
          </button>
        </div>

        {activeTab === "users" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800">User Role Management</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white border-b border-slate-100 text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">User</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Current Role</th>
                    <th className="px-6 py-4 font-semibold">Change Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((user: any) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700">
                        {user.username} {user.id === currentUserId && <span className="text-blue-500 text-xs ml-2 font-normal">(You)</span>}
                      </td>
                      <td className="px-6 py-4 text-slate-500">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                          user.role?.name === "Admin" ? "bg-amber-100 text-amber-700" :
                          user.role?.name === "Instructor" ? "bg-indigo-100 text-indigo-700" :
                          user.role?.name === "Content-Manager" ? "bg-blue-100 text-blue-700" :
                          "bg-slate-100 text-slate-700"
                        }`}>
                          {user.role?.name || "No Role"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          disabled={loadingId === user.id || user.id === currentUserId}
                          value={user.role?.id || ""}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className={`bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2 outline-none ${
                            user.id === currentUserId ? "bg-slate-100 cursor-not-allowed opacity-60" : ""
                          }`}
                        >
                          <option value="" disabled>Select Role</option>
                          {roles.map((role: any) => (
                            <option key={role.id} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="pt-2">
            <CourseManagement initialCourses={initialCourses} token={token} instructors={instructors} />
          </div>
        )}
        
      </div>
    </div>
  );
}