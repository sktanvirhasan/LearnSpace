import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Trophy, PlayCircle, Star } from "lucide-react";

export function StudentDashboard() {
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-12">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-lg">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, Student! 👋</h1>
            <p className="mt-2 text-indigo-100 max-w-xl">
              You are doing great. You have learned for 12 hours this week. Keep up the good work and achieve your goals!
            </p>
          </div>
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </div>

        {/* Stats Section */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Enrolled Courses</CardTitle>
              <BookOpen className="h-5 w-5 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">4</div>
              <p className="text-xs text-slate-500 mt-1">2 courses currently active</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Watch Time</CardTitle>
              <Clock className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">28h 15m</div>
              <p className="text-xs text-slate-500 mt-1">+2.5h from last week</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Certificates Earned</CardTitle>
              <Trophy className="h-5 w-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">1</div>
              <p className="text-xs text-slate-500 mt-1">Next milestone: 3 certificates</p>
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning Section */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            Continue Learning
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden border-none shadow-sm transition-all hover:shadow-md">
              <div className="h-40 bg-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800" 
                  alt="Course Thumbnail" 
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="font-semibold text-lg line-clamp-1 mb-1">Full-Stack Web Development</h3>
                <p className="text-sm text-slate-500 mb-4">By Programming Hero</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>Progress</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                
                <Button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700">
                  <PlayCircle className="h-4 w-4 mr-2" /> Resume Course
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}