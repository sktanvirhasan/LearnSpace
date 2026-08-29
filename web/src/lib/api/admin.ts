const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function getAdminData(token: string) {
  const meRes = await fetch(`${API_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const me = await meRes.json();

  const usersRes = await fetch(`${API_URL}/api/user-management/users`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const users = await usersRes.json();

  const rolesRes = await fetch(`${API_URL}/api/users-permissions/roles`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const rolesData = await rolesRes.json();
  const roles = rolesData.roles || rolesData;

  const coursesRes = await fetch(`${API_URL}/api/courses`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const coursesData = await coursesRes.json();
  const totalCourses = coursesData?.data?.length || 0;

  const enrollmentsRes = await fetch(`${API_URL}/api/enrollments`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const enrollmentsData = await enrollmentsRes.json();
  const totalEnrollments = enrollmentsData?.data?.length || 0;

  return {
    currentUserId: me?.id || null,
    users: Array.isArray(users) ? users : [],
    roles: Array.isArray(roles) ? roles : [],
    stats: {
      totalUsers: Array.isArray(users) ? users.length : 0,
      totalCourses,
      totalEnrollments,
    },
  };
}

export async function updateUserRole(userId: string | number, roleId: string | number, token: string) {
  const res = await fetch(`${API_URL}/api/user-management/users/${userId}/role`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ roleId }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || "Failed to update role");
  }

  return res.json();
}