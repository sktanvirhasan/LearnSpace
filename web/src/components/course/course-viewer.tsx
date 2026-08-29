"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function CourseViewer({ course }: { course: any }) {
  const router = useRouter();
  const [activeLesson, setActiveLesson] = useState<any>(course.lessons?.[0] || null);

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1]?.split("&")[0];
    } else if (url.includes("embed/")) {
      return url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col md:flex-row">
      <div className="w-full md:w-80 bg-white border-r border-slate-200 flex flex-col h-auto md:h-[calc(100vh-4rem)] sticky top-16">
        <div className="p-6 border-b border-slate-100">
          <Button onClick={() => router.push("/dashboard")} variant="outline" className="mb-4 w-full">
            &larr; Back to Dashboard
          </Button>
          <h2 className="font-bold text-xl text-slate-800 leading-tight">{course.title}</h2>
          <p className="text-sm text-slate-500 mt-2 line-clamp-2">{course.description}</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Course Curriculum</h3>
          {!course.lessons || course.lessons.length === 0 ? (
            <p className="text-sm text-slate-500 px-2">No lessons available yet.</p>
          ) : (
            course.lessons.map((lesson: any, index: number) => (
              <button
                key={lesson.documentId}
                onClick={() => setActiveLesson(lesson)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all flex items-start gap-3 ${
                  activeLesson?.documentId === lesson.documentId 
                    ? "bg-violet-50 border border-violet-200 text-violet-700 font-semibold" 
                    : "hover:bg-slate-50 text-slate-600 border border-transparent"
                }`}
              >
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs ${activeLesson?.documentId === lesson.documentId ? "bg-violet-200 text-violet-800" : "bg-slate-200 text-slate-500"}`}>
                  {index + 1}
                </span>
                <span className="line-clamp-2 mt-0.5">{lesson.title}</span>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex-1 p-6 md:p-12 overflow-y-auto h-[calc(100vh-4rem)]">
        <div className="max-w-4xl mx-auto">
          {!activeLesson ? (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome to the course!</h2>
              <p className="text-slate-500">Please select a lesson from the left menu to start learning.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {activeLesson.videoUrl && (
                <div className="w-full aspect-video bg-slate-900">
                  <iframe 
                    src={getEmbedUrl(activeLesson.videoUrl)} 
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              <div className="p-8 md:p-12">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-6">{activeLesson.title}</h1>
                <div className="prose prose-slate max-w-none text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {activeLesson.content}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}