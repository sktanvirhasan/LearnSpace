"use client";

import { useState } from "react";
import { createCourse, updateCourse, deleteCourse } from "@/lib/api/courses";
import { createLesson, updateLesson, deleteLesson } from "@/lib/api/lessons";
import { Button } from "@/components/ui/button";

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
      <div className="bg-transparent mt-8">
        <div className="space-y-6">
          <Button onClick={() => setActiveCourse(null)} variant="outline" className="hover:bg-slate-100 transition-colors">
            &larr; Back to Course List
          </Button>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-2xl font-extrabold text-slate-800">{activeCourse.title}</h2>
              <p className="text-slate-500 mt-1">Manage lessons for this course</p>
            </div>
            
            <form onSubmit={handleCreateLesson} className="space-y-5 bg-slate-50 p-6 rounded-xl border border-slate-200/60">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Lesson Title</label>
                  <input required type="text" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none" placeholder="e.g. Introduction to React" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Video URL (Optional)</label>
                  <input type="url" value={lessonVideoUrl} onChange={(e) => setLessonVideoUrl(e.target.value)} className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none" placeholder="https://youtube.com/..." />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Text Content</label>
                  <textarea required value={lessonContent} onChange={(e) => setLessonContent(e.target.value)} className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg min-h-[120px] focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none" placeholder="Write lesson details here..." />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={lessonLoading} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6">
                  {lessonLoading ? "Adding Lesson..." : "Add New Lesson"}
                </Button>
              </div>
            </form>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 px-1">Curriculum</h3>
            {!activeCourse.lessons || activeCourse.lessons.length === 0 ? (
              <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 text-center">
                <p className="text-slate-500">No lessons added to this course yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeCourse.lessons.map((lesson: any, index: number) => (
                  <div key={lesson.documentId} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    {editingLessonId === lesson.documentId ? (
                      <div className="space-y-4">
                        <input value={editLessonTitle} onChange={(e) => setEditLessonTitle(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" />
                        <textarea value={editLessonContent} onChange={(e) => setEditLessonContent(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm min-h-[100px] focus:ring-2 focus:ring-indigo-500 outline-none" />
                        <input value={editLessonVideoUrl} onChange={(e) => setEditLessonVideoUrl(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" />
                        <div className="flex gap-3">
                          <Button onClick={() => handleUpdateLesson(lesson.documentId)} className="bg-emerald-600 hover:bg-emerald-700 text-white">Save Changes</Button>
                          <Button onClick={() => setEditingLessonId(null)} variant="outline">Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-lg font-bold text-slate-800">
                            <span className="text-indigo-600 mr-2">Lesson {index + 1}:</span> 
                            {lesson.title}
                          </h4>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => {
                              setEditingLessonId(lesson.documentId);
                              setEditLessonTitle(lesson.title);
                              setEditLessonContent(lesson.content);
                              setEditLessonVideoUrl(lesson.videoUrl || "");
                            }} variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">Edit</Button>
                            <Button size="sm" onClick={() => handleDeleteLesson(lesson.documentId)} variant="destructive" className="bg-rose-500 hover:bg-rose-600">Delete</Button>
                          </div>
                        </div>
                        <p className="text-slate-600 whitespace-pre-wrap mb-4 text-sm leading-relaxed bg-slate-50 p-4 rounded-lg">{lesson.content}</p>
                        {lesson.videoUrl && (
                          <a href={lesson.videoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline">
                            Watch Video Material &rarr;
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
      </div>
    );
  }

  return (
    <div className="bg-transparent mt-8">
      <div className="grid lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Create New Course</h2>
            <form onSubmit={handleCreateCourse} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Course Title</label>
                <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none" placeholder="e.g. Advanced TypeScript" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg min-h-[120px] focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none" placeholder="What will students learn?" />
              </div>
              
              {instructors.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Assign Instructor</label>
                  <select value={instructorId} onChange={(e) => setInstructorId(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none">
                    <option value="">Select an instructor...</option>
                    {instructors.map((inst: any) => (
                      <option key={inst.id} value={inst.id}>{inst.username}</option>
                    ))}
                  </select>
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-xl font-semibold text-md transition-all">
                {loading ? "Publishing..." : "Publish Course"}
              </Button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center justify-between">
            Course Library
            <span className="bg-indigo-100 text-indigo-700 text-sm py-1 px-3 rounded-full">{courses.length} Total</span>
          </h2>
          
          {courses.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-1">No courses found</h3>
              <p className="text-slate-500">Get started by creating your first course on the left.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {courses.map((course) => (
                <div key={course.documentId} className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col overflow-hidden">
                  {editingId === course.documentId ? (
                    <div className="p-5 flex flex-col h-full space-y-4">
                      <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                      <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm min-h-[100px] focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none flex-1" />
                      
                      {instructors.length > 0 && (
                        <select value={editInstructorId} onChange={(e) => setEditInstructorId(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                          <option value="">Select an instructor...</option>
                          {instructors.map((inst: any) => (
                            <option key={inst.id} value={inst.id}>{inst.username}</option>
                          ))}
                        </select>
                      )}

                      <div className="grid grid-cols-2 gap-2 mt-auto pt-2">
                        <Button onClick={() => handleUpdateCourse(course.documentId)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Save</Button>
                        <Button onClick={() => setEditingId(null)} variant="outline" className="w-full hover:bg-slate-100">Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 flex flex-col h-full">
                      <div className="mb-4 flex-1">
                        <h3 className="font-bold text-lg text-slate-900 mb-2 leading-tight">{course.title}</h3>
                        <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">{course.description}</p>
                      </div>
                      
                      {course.instructor?.username && (
                        <div className="mb-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {course.instructor.username}
                          </span>
                        </div>
                      )}

                      <div className="space-y-2 mt-auto border-t border-slate-100 pt-4">
                        <Button onClick={() => setActiveCourse(course)} className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-colors">
                          Manage Lessons
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button onClick={() => {
                            setEditingId(course.documentId);
                            setEditTitle(course.title);
                            setEditDescription(course.description);
                            setEditInstructorId(course.instructor?.id || "");
                          }} variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300">Edit</Button>
                          <Button onClick={() => handleDeleteCourse(course.documentId)} variant="outline" className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300">Delete</Button>
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
    </div>
  );
}