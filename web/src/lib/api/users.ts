const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function getInstructors(token: string) {
  const res = await fetch(`${API_URL}/api/users?populate=role`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  const users = await res.json();
  
  if (Array.isArray(users)) {
    return users.filter((u: any) => 
      u.role?.name?.toLowerCase() === 'instructor' || 
      u.role?.type?.toLowerCase() === 'instructor'
    );
  }
  return [];
}