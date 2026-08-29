const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function getCourses(token: string) {
  const res = await fetch(`${API_URL}/api/courses?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  return res.json();
}

export async function getMyCourses(token: string) {
  const userRes = await fetch(`${API_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await userRes.json();

  if (!user?.id) return { data: [] };

  const res = await fetch(
    `${API_URL}/api/courses?filters[instructor][id][$eq]=${user.id}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  return res.json();
}

export async function getCourse(documentId: string, token: string) {
  const res = await fetch(`${API_URL}/api/courses/${documentId}?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  return res.json();
}

export async function createCourse(data: any, token: string) {
  const res = await fetch(`${API_URL}/api/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });
  return res.json();
}

export async function updateCourse(documentId: string, data: any, token: string) {
  const res = await fetch(`${API_URL}/api/courses/${documentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });
  return res.json();
}

export async function deleteCourse(documentId: string, token: string) {
  const res = await fetch(`${API_URL}/api/courses/${documentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage = errorData?.error?.message || `HTTP Error: ${res.status}`;
    throw new Error(errorMessage);
  }

  if (res.status === 204) {
    return { success: true };
  }

  return res.json();
}