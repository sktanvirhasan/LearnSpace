const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function createLesson(data: any, token: string) {
  const res = await fetch(`${API_URL}/api/lessons`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });
  return res.json();
}

export async function updateLesson(documentId: string, data: any, token: string) {
  const res = await fetch(`${API_URL}/api/lessons/${documentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });
  return res.json();
}

export async function deleteLesson(documentId: string, token: string) {
  const res = await fetch(`${API_URL}/api/lessons/${documentId}`, {
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