import type { Student } from "@/lib/api";

const STUDENT_KEY = "campusconnect.student";
const STUDENT_ID_KEY = "campusconnect.studentId";

export function saveStudentSession(student: Student) {
  if (typeof window === "undefined") return;
  // Do not store the password returned by the current backend.
  const safeStudent: Student = {
    id: student.id,
    name: student.name,
    email: student.email,
    department: student.department ?? "",
  };
  window.localStorage.setItem(STUDENT_KEY, JSON.stringify(safeStudent));
  window.localStorage.setItem(STUDENT_ID_KEY, String(student.id));
}

export function getStoredStudent(): Student | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STUDENT_KEY);
    return raw ? (JSON.parse(raw) as Student) : null;
  } catch {
    return null;
  }
}

export function getStoredStudentId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STUDENT_ID_KEY);
}

export function clearStudentSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STUDENT_KEY);
  window.localStorage.removeItem(STUDENT_ID_KEY);
}
