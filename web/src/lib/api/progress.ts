const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function markLessonComplete(lessonId: string, token: string) {
  const userRes = await fetch(`${API_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const user = await userRes.json();

  if (!user?.documentId) throw new Error("User not found");

  const res = await fetch(`${API_URL}/api/progresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: {
        lesson: lessonId,
        student: user.documentId,
        completed: true,
        publishedAt: new Date().toISOString()
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || "Failed to update progress");
  return data;
}

export async function getMyProgress(token: string) {
  const userRes = await fetch(`${API_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const user = await userRes.json();

  if (!user?.documentId) return { data: [] };

  const res = await fetch(`${API_URL}/api/progresses?filters[student][documentId][$eq]=${user.documentId}&populate=*`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  return res.json();
}

export async function getInstructorAnalytics(token: string) {
  const userRes = await fetch(`${API_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const user = await userRes.json();
  if (!user?.documentId) return { courses: [], enrollments: [], progresses: [] };

  const coursesRes = await fetch(`${API_URL}/api/courses?filters[instructor][documentId][$eq]=${user.documentId}&populate=*`, { 
    headers: { Authorization: `Bearer ${token}` }, 
    cache: 'no-store' 
  });
  const courses = (await coursesRes.json()).data || [];

  if (courses.length === 0) return { courses: [], enrollments: [], progresses: [] };

  const enrollRes = await fetch(`${API_URL}/api/enrollments?populate=*`, { 
    headers: { Authorization: `Bearer ${token}` }, 
    cache: 'no-store' 
  });
  const rawEnrollments = (await enrollRes.json()).data || [];
  const enrollments = rawEnrollments.filter((e: any) => 
    courses.some((c: any) => c.documentId === e.course?.documentId)
  );

  const progRes = await fetch(`${API_URL}/api/progresses?populate=*`, { 
    headers: { Authorization: `Bearer ${token}` }, 
    cache: 'no-store' 
  });
  const progresses = (await progRes.json()).data || [];

  return { courses, enrollments, progresses };
}