"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { markLessonComplete } from "@/lib/api/progress";
import { CheckCircle2, ArrowLeft, PlayCircle, Lock, BookOpen } from "lucide-react";

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
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-50 flex flex-col lg:flex-row">
      <aside className="w-full lg:w-[340px] bg-white border-r border-neutral-200/80 flex flex-col lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16">
        <div className="p-6">
          <button
            onClick={() => router.push("/dashboard")}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Dashboard
          </button>

          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
              Course
            </p>
            <h2 className="font-bold text-[22px] leading-tight text-neutral-900">
              {course.title}
            </h2>
            <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
              {course.description}
            </p>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-600">
                Your Progress
              </span>
              <span className="text-sm font-bold text-neutral-900">{percent}%</span>
            </div>
            <Progress value={percent} className="h-2" />
            <p className="text-xs text-neutral-500 mt-2">
              {completedCount} of {totalLessons} lessons completed
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2 px-2">
            Curriculum
          </p>
          {!course.lessons || course.lessons.length === 0 ? (
            <p className="text-sm text-neutral-500 px-2 py-4">No lessons available yet.</p>
          ) : (
            <div className="space-y-1">
              {course.lessons.map((lesson: any, index: number) => {
                const isDone = completedIds.has(lesson.documentId);
                const isActive = activeLesson?.documentId === lesson.documentId;
                return (
                  <button
                    key={lesson.documentId}
                    onClick={() => setActiveLesson(lesson)}
                    className={`w-full text-left px-3 py-3 rounded-xl text-sm transition-all flex items-center gap-3 ${
                      isActive
                        ? "bg-indigo-50 ring-1 ring-indigo-200"
                        : "hover:bg-neutral-50"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        isDone
                          ? "bg-emerald-500 text-white"
                          : isActive
                          ? "bg-indigo-600 text-white"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span
                        className={`block truncate font-medium ${
                          isActive ? "text-indigo-700" : "text-neutral-700"
                        }`}
                      >
                        {lesson.title}
                      </span>
                      <span className="text-[11px] text-neutral-400">
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

      <main className="flex-1 overflow-y-auto lg:h-[calc(100vh-4rem)]">
        <div className="max-w-3xl mx-auto px-6 py-10">
          {!activeLesson ? (
            <div className="bg-white rounded-3xl border border-neutral-200/80 p-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900 mb-1.5">
                Ready to start learning?
              </h2>
              <p className="text-neutral-500 text-sm">
                Select a lesson from the curriculum to begin.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {activeLesson.videoUrl && (
                <div className="w-full aspect-video bg-neutral-900 rounded-2xl overflow-hidden shadow-sm ring-1 ring-neutral-200/50">
                  <iframe
                    src={getEmbedUrl(activeLesson.videoUrl)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              <div>
                <div className="flex items-start justify-between gap-4 mb-1">
                  <Badge
                    variant="secondary"
                    className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50 font-semibold text-[11px]"
                  >
                    LESSON {(course.lessons?.findIndex((l: any) => l.documentId === activeLesson.documentId) ?? 0) + 1}
                  </Badge>
                  {isActiveCompleted && (
                    <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200 gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-neutral-900 tracking-tight mt-3">
                  {activeLesson.title}
                </h1>
              </div>

              <Separator />

              <div className="prose prose-neutral max-w-none text-neutral-700 whitespace-pre-wrap leading-[1.75] text-[15px]">
                {activeLesson.content}
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleMarkComplete}
                  disabled={isActiveCompleted || marking}
                  size="lg"
                  className={`rounded-xl font-semibold px-6 h-12 shadow-sm transition-all ${
                    isActiveCompleted
                      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 cursor-not-allowed"
                      : "bg-neutral-900 text-white hover:bg-neutral-800"
                  }`}
                >
                  {isActiveCompleted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Lesson Completed
                    </>
                  ) : marking ? (
                    "Saving..."
                  ) : (
                    <>
                      <PlayCircle className="w-4 h-4 mr-2" /> Mark as Complete
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}