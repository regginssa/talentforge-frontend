const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T | null> {
  const res = await fetch(`${BASE_URL}/api${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // throw new Error(data?.message || data?.msg || "API Error");
    return null;
  }

  return data;
}
