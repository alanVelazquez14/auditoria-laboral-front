import { buildApiUrl } from "@/lib/api-base";

export class ApiServerError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiServerError";
    this.status = status;
    this.details = details;
  }
}

function extractErrorMessage(payload: unknown, fallback: string) {
  if (typeof payload === "string" && payload.trim()) {
    return payload;
  }

  if (
    payload &&
    typeof payload === "object" &&
    "message" in payload &&
    typeof (payload as { message?: unknown }).message === "string"
  ) {
    return (payload as { message: string }).message;
  }

  if (
    payload &&
    typeof payload === "object" &&
    "message" in payload &&
    Array.isArray((payload as { message?: unknown[] }).message)
  ) {
    return (payload as { message: unknown[] }).message
      .map((item) => String(item))
      .join(", ");
  }

  return fallback;
}

export async function apiServerRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(buildApiUrl(path), init);

  const contentType = response.headers.get("content-type") ?? "";
  const payload =
    response.status === 204
      ? null
      : contentType.includes("application/json")
        ? await response.json()
        : await response.text();

  if (!response.ok) {
    throw new ApiServerError(
      extractErrorMessage(payload, response.statusText || "Error de API"),
      response.status,
      payload,
    );
  }

  return payload as T;
}
