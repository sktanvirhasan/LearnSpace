"use client";

import { useState } from "react";
import { createCourse, updateCourse, deleteCourse } from "@/lib/api/courses";
import { createLesson, updateLesson, deleteLesson } from "@/lib/api/lessons";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  BookOpen, 
  ArrowLeft, 
  Edit3, 
  Trash2, 
  Video, 
  FileText, 
  User, 
  Check, 
  X, 
  Sparkles,
  Layers,
  ExternalLink
} from "lucide-react";

export function CourseManagement({ 
  initialCourses, 
  token, 
  instructors = [] 
}: { 
  initialCourses: any[], 
  token: string,
  instructors?: any[]
}) {
  const [courses, setCourses] = useState(initialCourses);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editInstructorId, setEditInstructorId] = useState("");

  const [activeCourse, setActiveCourse] = useState<any | null>(null);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [lessonVideoUrl, setLessonVideoUrl] = useState("");
  const [lessonLoading, setLessonLoading] = useState(false);

  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editLessonTitle, setEditLessonTitle] = useState("");
  const [editLessonContent, setEditLessonContent] = useState("");
  const [editLessonVideoUrl, setEditLessonVideoUrl] = useState("");

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: any = { title, description };
      if (instructorId) payload.instructor = instructorId;

      const res = await createCourse(payload, token);
      if (res.data) {
        const selectedInst = instructors.find((inst: any) => inst.id.toString() === instructorId.toString());
        
        setCourses([...courses, { 
          ...res.data, 
          lessons: [],
          instructor: selectedInst ? { id: selectedInst.id, username: selectedInst.username } : null
        }]);
        
        setTitle("");
        setDescription("");
        setInstructorId("");
      }
    } catch (error) {
      console.error("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCourse = async (documentId: string) => {
    try {
      const payload: any = { title: editTitle, description: editDescription };
      if (editInstructorId) payload.instructor = editInstructorId;

      const res = await updateCourse(documentId, payload, token);
      if (res.data) {
        const selectedInst = instructors.find((inst: any) => inst.id.toString() === editInstructorId.toString());

        setCourses(courses.map(course => 
          course.documentId === documentId 
            ? { 
                ...res.data, 
                lessons: course.lessons,
                instructor: selectedInst ? { id: selectedInst.id, username: selectedInst.username } : null
              } 
            : course
        ));
        setEditingId(null);
      }
    } catch (error) {
      console.error("Failed to update course");
    }
  };

  const handleDeleteCourse = async (documentId: string) => {
    try {
      await deleteCourse(documentId, token);
      setCourses(courses.filter((course) => course.documentId !== documentId));
      if (activeCourse?.documentId === documentId) setActiveCourse(null);
    } catch (error) {
      console.error("Failed to delete course");
    }
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCourse) return;
    setLessonLoading(true);
    try {
      const res = await createLesson({ 
        title: lessonTitle, 
        content: lessonContent, 
        videoUrl: lessonVideoUrl,
        course: activeCourse.documentId
      }, token);
      
      if (res.data) {
        const updatedCourse = {
          ...activeCourse,
          lessons: [...(activeCourse.lessons || []), res.data]
        };
        setActiveCourse(updatedCourse);
        setCourses(courses.map(c => c.documentId === activeCourse.documentId ? updatedCourse : c));
        setLessonTitle("");
        setLessonContent("");
        setLessonVideoUrl("");
      }
    } catch (error) {
      console.error("Failed to create lesson");
    } finally {
      setLessonLoading(false);
    }
  };

  const handleUpdateLesson = async (documentId: string) => {
    try {
      const res = await updateLesson(documentId, { 
        title: editLessonTitle, 
        content: editLessonContent,
        videoUrl: editLessonVideoUrl
      }, token);
      
      if (res.data && activeCourse) {
        const updatedLessons = activeCourse.lessons.map((l: any) => l.documentId === documentId ? res.data : l);
        const updatedCourse = { ...activeCourse, lessons: updatedLessons };
        setActiveCourse(updatedCourse);
        setCourses(courses.map(c => c.documentId === activeCourse.documentId ? updatedCourse : c));
        setEditingLessonId(null);
      }
    } catch (error) {
      console.error("Failed to update lesson");
    }
  };

  const handleDeleteLesson = async (documentId: string) => {
    try {
      await deleteLesson(documentId, token);
      if (activeCourse) {
        const updatedLessons = activeCourse.lessons.filter((l: any) => l.documentId !== documentId);
        const updatedCourse = { ...activeCourse, lessons: updatedLessons };
        setActiveCourse(updatedCourse);
        setCourses(courses.map(c => c.documentId === activeCourse.documentId ? updatedCourse : c));
      }
    } catch (error) {
      console.error("Failed to delete lesson");
    }
  };

  if (activeCourse) {
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <Button 
          onClick={() => setActiveCourse(null)} 
          variant="outline" 
          className="bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-xl px-4 py-2 font-semibold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Course Library
        </Button>
        
        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="border-b border-slate-100 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
                Course Curriculum Builder
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{activeCourse.title}</h2>
              <p className="text-slate-500 text-sm mt-1 font-medium">{activeCourse.description}</p>
            </div>
            <div className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 shrink-0 text-center">
              <span className="text-2xl font-black text-slate-900 block">{activeCourse.lessons?.length || 0}</span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Lessons</span>
            </div>
          </div>
          
          <form onSubmit={handleCreateLesson} className="space-y-5 bg-slate-50/70 p-6 rounded-2xl border border-slate-200/60">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-600" /> Add New Lesson Module
            </h3>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Lesson Title</label>
                <input 
                  required 
                  type="text" 
                  value={lessonTitle} 
                  onChange={(e) => setLessonTitle(e.target.value)} 
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" 
                  placeholder="e.g. Introduction to Next.js App Router" 
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Video URL (Optional)</label>
                <input 
                  type="url" 
                  value={lessonVideoUrl} 
                  onChange={(e) => setLessonVideoUrl(e.target.value)} 
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" 
                  placeholder="https://youtube.com/watch?v=..." 
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Lesson Details / Content</label>
                <textarea 
                  required 
                  value={lessonContent} 
                  onChange={(e) => setLessonContent(e.target.value)} 
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium min-h-[110px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" 
                  placeholder="Provide comprehensive lesson content or instructions..." 
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={lessonLoading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-md cursor-pointer">
                {lessonLoading ? "Adding Lesson..." : "Publish Lesson"}
              </Button>
            </div>
          </form>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" /> Curriculum Breakdown
            </h3>
          </div>

          {!activeCourse.lessons || activeCourse.lessons.length === 0 ? (
            <div className="bg-white p-12 rounded-[2rem] border border-slate-200/80 text-center shadow-sm">
              <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6" />
              </div>
              <p className="text-slate-700 font-bold">No lessons created yet</p>
              <p className="text-slate-400 text-sm mt-1">Use the form above to add your first lesson to this course.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeCourse.lessons.map((lesson: any, index: number) => (
                <div key={lesson.documentId} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-md transition-all">
                  {editingLessonId === lesson.documentId ? (
                    <div className="space-y-4 bg-slate-50/50 p-4 rounded-xl border border-indigo-100">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Title</label>
                        <input value={editLessonTitle} onChange={(e) => setEditLessonTitle(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Content</label>
                        <textarea value={editLessonContent} onChange={(e) => setEditLessonContent(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm min-h-[90px] focus:ring-2 focus:ring-indigo-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Video URL</label>
                        <input value={editLessonVideoUrl} onChange={(e) => setEditLessonVideoUrl(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                      </div>
                      <div className="flex gap-2 justify-end pt-2">
                        <Button onClick={() => handleUpdateLesson(lesson.documentId)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg px-4 text-xs cursor-pointer flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5" /> Save Changes
                        </Button>
                        <Button onClick={() => setEditingLessonId(null)} variant="outline" className="rounded-lg px-4 text-xs font-bold text-slate-600 cursor-pointer flex items-center gap-1.5">
                          <X className="w-3.5 h-3.5" /> Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 font-extrabold text-xs flex items-center justify-center shrink-0 border border-indigo-100">
                            0{index + 1}
                          </span>
                          <h4 className="text-base font-extrabold text-slate-900 tracking-tight">
                            {lesson.title}
                          </h4>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <Button size="sm" onClick={() => {
                            setEditingLessonId(lesson.documentId);
                            setEditLessonTitle(lesson.title);
                            setEditLessonContent(lesson.content);
                            setEditLessonVideoUrl(lesson.videoUrl || "");
                          }} variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg h-8 px-2.5 cursor-pointer">
                            <Edit3 className="w-3.5 h-3.5" />
                          </Button>
                          <Button size="sm" onClick={() => handleDeleteLesson(lesson.documentId)} variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg h-8 px-2.5 cursor-pointer">
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                      <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 mb-3">
                        <p className="text-slate-600 whitespace-pre-wrap text-sm leading-relaxed font-medium">{lesson.content}</p>
                      </div>
                      {lesson.videoUrl && (
                        <a href={lesson.videoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50/50 hover:bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 transition-colors">
                          <Video className="w-3.5 h-3.5 text-indigo-500" />
                          Watch Video Material <ExternalLink className="w-3 h-3 ml-0.5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
      
      <div className="lg:col-span-1">
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-200/80 sticky top-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Create Course</h2>
              <p className="text-xs text-slate-400 font-medium">Publish a new learning program</p>
            </div>
          </div>

          <form onSubmit={handleCreateCourse} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Course Title</label>
              <input 
                required 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" 
                placeholder="e.g. Master Next.js 15" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Description</label>
              <textarea 
                required 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-medium min-h-[110px] focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" 
                placeholder="Briefly describe what students will learn..." 
              />
            </div>
            
            {instructors.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Assign Instructor</label>
                <select 
                  value={instructorId} 
                  onChange={(e) => setInstructorId(e.target.value)} 
                  className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none cursor-pointer"
                >
                  <option value="">Select an instructor...</option>
                  {instructors.map((inst: any) => (
                    <option key={inst.id} value={inst.id}>{inst.username}</option>
                  ))}
                </select>
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer mt-2">
              {loading ? "Publishing..." : "Publish Course"}
            </Button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Course Library
          </h2>
          <span className="bg-slate-900 text-white text-xs font-extrabold py-1 px-3 rounded-full">
            {courses.length} Total
          </span>
        </div>
        
        {courses.length === 0 ? (
          <div className="bg-white p-12 rounded-[2rem] border border-slate-200/80 text-center flex flex-col items-center justify-center min-h-[320px] shadow-sm">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center mb-4 text-slate-300">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-base font-extrabold text-slate-800 mb-1">No courses available</h3>
            <p className="text-slate-400 text-sm max-w-sm">Create your first course using the form on the left to start building your curriculum.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">
            {courses.map((course) => (
              <div key={course.documentId} className="bg-white rounded-2xl shadow-sm border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all flex flex-col overflow-hidden">
                {editingId === course.documentId ? (
                  <div className="p-5 flex flex-col h-full space-y-4 bg-slate-50/50">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Title</label>
                      <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Description</label>
                      <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm min-h-[80px] focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    
                    {instructors.length > 0 && (
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Instructor</label>
                        <select value={editInstructorId} onChange={(e) => setEditInstructorId(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none">
                          <option value="">Select an instructor...</option>
                          {instructors.map((inst: any) => (
                            <option key={inst.id} value={inst.id}>{inst.username}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Button onClick={() => handleUpdateCourse(course.documentId)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs h-9 cursor-pointer flex items-center justify-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Save
                      </Button>
                      <Button onClick={() => setEditingId(null)} variant="outline" className="rounded-lg text-xs font-bold text-slate-600 h-9 cursor-pointer flex items-center justify-center gap-1">
                        <X className="w-3.5 h-3.5" /> Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 flex flex-col h-full">
                    <div className="mb-4 flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-extrabold text-base text-slate-900 leading-snug line-clamp-2">{course.title}</h3>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-medium">{course.description}</p>
                    </div>
                    
                    {course.instructor?.username && (
                      <div className="mb-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-100">
                          <User className="w-3 h-3 text-indigo-500" />
                          {course.instructor.username}
                        </span>
                      </div>
                    )}

                    <div className="space-y-2 mt-auto border-t border-slate-100 pt-4">
                      <Button onClick={() => setActiveCourse(course)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2">
                        <BookOpen className="w-3.5 h-3.5" /> Manage Lessons
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          onClick={() => {
                            setEditingId(course.documentId);
                            setEditTitle(course.title);
                            setEditDescription(course.description);
                            setEditInstructorId(course.instructor?.id || "");
                          }} 
                          variant="outline" 
                          className="border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl h-9 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </Button>
                        <Button 
                          onClick={() => handleDeleteCourse(course.documentId)} 
                          variant="outline" 
                          className="border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold rounded-xl h-9 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
}