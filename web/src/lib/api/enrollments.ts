const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function enrollInCourse(courseId: string, token: string) {
  const userRes = await fetch(`${API_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await userRes.json();

  if (!user?.documentId) throw new Error("User not found");

  const res = await fetch(`${API_URL}/api/enrollments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: {
        student: user.documentId,
        course: courseId
      },
    }),
  });

  const responseData = await res.json();
  
  if (!res.ok) {
    throw new Error(responseData?.error?.message || "Failed to enroll in course");
  }

  return responseData;
}

export async function getMyEnrollments(token: string) {
  const userRes = await fetch(`${API_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await userRes.json();

  if (!user?.documentId) return { data: [] };

  const res = await fetch(
    `${API_URL}/api/enrollments?filters[student][documentId][$eq]=${user.documentId}&populate[course][populate]=instructor`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  return res.json();
}