export interface CoachResponse {
  user: string;
  reply: string;
}

/**
 * Calls the Millionaire OS backend coach endpoint.
 *
 * @param user_name  – The user’s first name
 * @param prompt     – Their message or question
 */
export async function askCoach(
  user_name: string,
  prompt: string
): Promise<CoachResponse> {
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

  const res = await fetch(`${API_BASE}/coach`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_name, prompt }),
  });

  if (!res.ok) {
    throw new Error(`Coach API error: ${res.statusText}`);
  }

  return res.json();
}
