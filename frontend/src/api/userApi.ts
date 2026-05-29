import { BASE_URL } from "../constants/apiUrl";
import type { User } from "../types/user";

export async function loginApi(
  email: string,
  password: string,
): Promise<User | null> {
  const response = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) return null;
  const data = await response.json();
  return data.success ? data.user : null;
}

export async function registerApi(
  name: string,
  email: string,
  password: string,
): Promise<boolean> {
  const response = await fetch(`${BASE_URL}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) return false;
  const data = await response.json();
  return data.success;
}
