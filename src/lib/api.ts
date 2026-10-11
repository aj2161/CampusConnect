export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export type Student = {
  id: number;
  name: string;
  email: string;
  department?: string | null;
};

type ApiOptions = Omit<RequestInit, "headers"> & { headers?: Record<string, string> };

export async function apiRequest<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  const text = await response.text();
  let data: unknown = null;
  if (text) {
    try { data = JSON.parse(text); } catch { data = text; }
  }

  if (!response.ok) {
    const message = typeof data === "string" ? data : (data && typeof data === "object" && "message" in data && typeof data.message === "string") ? data.message : `Request failed (${response.status})`;
    throw new Error(message);
  }

  return data as T;
}
