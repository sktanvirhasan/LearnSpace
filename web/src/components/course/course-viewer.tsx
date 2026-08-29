"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { markLessonComplete } from "@/lib/api/progress";
import { CheckCircle2, PlayCircle, BookOpen, Lock } from "lucide-react";

export function CourseViewer({
  course,
  initialProgress,
  token,
}: {
  course: any;
  initialProgress: any[];
  token: string;
}) {
  const router = useRouter();
  const [activeLesson, setActiveLesson] = useState<any>(course.lessons?.[0] || null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    new Set(
      initialProgress
        .filter((p: any) => p.completed && p.lesson?.documentId)
        .map((p: any) => p.lesson.documentId)
    )
  );
  const [marking, setMarking] = useState(false);

  const totalLessons = course.lessons?.length || 0;
  const completedCount = useMemo(
    () =>
      course.lessons?.filter((l: any) => completedIds.has(l.documentId)).length || 0,
    [completedIds, course.lessons]
  );
  const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

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

  const handleMarkComplete = async () => {
    if (!activeLesson || completedIds.has(activeLesson.documentId)) return;
    setMarking(true);
    try {
      await markLessonComplete(activeLesson.documentId, token);
      setCompletedIds((prev) => new Set(prev).add(activeLesson.documentId));
    } catch (err) {
      console.error("Failed to mark lesson complete", err);
    } finally {
      setMarking(false);
    }
  };

  const isActiveCompleted = activeLesson && completedIds.has(activeLesson.documentId);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col lg:flex-row font-sans">
      <aside className="w-full lg:w-[420px] bg-white border-r border-slate-200/80 flex flex-col lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
        <div className="p-6 md:p-8">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-indigo-100">
              Course
            </span>
            <h2 className="font-extrabold text-2xl leading-tight text-slate-900">
              {course.title}
            </h2>
            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mt-2">
              {course.description}
            </p>
          </div>

          <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/60 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Course Progress
              </span>
              <span className="text-sm font-extrabold text-indigo-600">{percent}%</span>
            </div>
            <Progress value={percent} className="h-2.5 bg-slate-200/80" />
            <p className="text-xs text-slate-500 mt-3 font-medium">
              <span className="text-slate-700 font-bold">{completedCount}</span> of {totalLessons} lessons completed
            </p>
          </div>
        </div>

        <Separator className="bg-slate-100" />

        <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">
            Curriculum
          </p>
          {!course.lessons || course.lessons.length === 0 ? (
            <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-100">
              <p className="text-sm text-slate-500 font-medium">No lessons available yet.</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {course.lessons.map((lesson: any, index: number) => {
                const isDone = completedIds.has(lesson.documentId);
                const isActive = activeLesson?.documentId === lesson.documentId;
                return (
                  <button
                    key={lesson.documentId}
                    onClick={() => setActiveLesson(lesson)}
                    className={`cursor-pointer w-full text-left p-3 rounded-2xl transition-all duration-200 flex items-center gap-4 ${
                      isActive
                        ? "bg-indigo-600 shadow-md shadow-indigo-200 transform scale-[1.02]"
                        : "hover:bg-slate-100"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-sm ${
                        isActive
                          ? "bg-white text-indigo-700"
                          : isDone
                          ? "bg-emerald-500 text-white shadow-emerald-200"
                          : "bg-white text-slate-400 border border-slate-200"
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                    </span>
                    <span className="flex-1 min-w-0 py-1">
                      <span
                        className={`block truncate font-bold text-sm ${
                          isActive ? "text-white" : "text-slate-700"
                        }`}
                      >
                        {lesson.title}
                      </span>
                      <span className={`text-xs mt-0.5 block font-medium ${
                        isActive ? "text-indigo-200" : "text-slate-400"
                      }`}>
                        {isDone ? "Completed" : "Lesson " + (index + 1)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto lg:h-[calc(100vh-4rem)] relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-50">
        <div className="max-w-4xl mx-auto px-4 py-8 md:px-8 md:py-12">
          {!activeLesson ? (
            <div className="bg-white rounded-[2rem] border border-slate-200/80 p-12 md:p-20 text-center shadow-sm">
              <div className="w-20 h-20 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-6 shadow-inner">
                <BookOpen className="w-10 h-10 text-indigo-500" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">
                Ready to start learning?
              </h2>
              <p className="text-slate-500 text-base max-w-sm mx-auto leading-relaxed">
                Select a lesson from the curriculum sidebar to begin your journey.
              </p>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {activeLesson.videoUrl && (
                <div className="w-full aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-900/10 group relative">
                  <iframe
                    src={getEmbedUrl(activeLesson.videoUrl)}
                    className="w-full h-full absolute inset-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-200/60">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <Badge
                    variant="secondary"
                    className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50 font-bold text-xs px-3 py-1.5 uppercase tracking-widest rounded-lg border border-indigo-100"
                  >
                    Lesson {(course.lessons?.findIndex((l: any) => l.documentId === activeLesson.documentId) ?? 0) + 1}
                  </Badge>
                  {isActiveCompleted && (
                    <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-200 gap-1.5 px-3 py-1.5 rounded-lg shadow-sm">
                      <CheckCircle2 className="w-4 h-4" /> 
                      <span className="font-bold">Completed</span>
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
                  {activeLesson.title}
                </h1>

                <div className="prose prose-slate md:prose-lg max-w-none text-slate-600 whitespace-pre-wrap leading-relaxed">
                  {activeLesson.content}
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100">
                  <Button
                    onClick={handleMarkComplete}
                    disabled={isActiveCompleted || marking}
                    size="lg"
                    className={`cursor-pointer w-full sm:w-auto rounded-2xl font-bold px-8 h-14 shadow-sm transition-all duration-300 text-base ${
                      isActiveCompleted
                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-200 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5"
                    }`}
                  >
                    {isActiveCompleted ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2.5" /> Lesson Completed
                      </>
                    ) : marking ? (
                      "Saving Progress..."
                    ) : (
                      <>
                        <PlayCircle className="w-5 h-5 mr-2.5" /> Mark as Complete
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}