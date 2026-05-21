"use client";

import { signOut } from "next-auth/react";
import { buildApiUrl } from "@/lib/api-base";

type SessionLike = {
  accessToken?: string | null;
  user?: {
    accessToken?: string | null;
  } | null;
} | null;

type ApiRequestOptions = Omit<RequestInit, "body" | "headers"> & {
  auth?: boolean;
  body?: BodyInit | FormData | Record<string, unknown> | null;
  headers?: HeadersInit;
  redirectOnUnauthorized?: boolean;
  session?: SessionLike;
  token?: string | null;
};

export class ApiClientError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.details = details;
  }
}

export function getSessionAccessToken(session?: SessionLike) {
  return session?.accessToken ?? session?.user?.accessToken ?? null;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof FormData) &&
    !(value instanceof Blob) &&
    !(value instanceof ArrayBuffer) &&
    !(value instanceof URLSearchParams)
  );
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

export async function apiClientRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const {
    auth = false,
    body,
    headers,
    redirectOnUnauthorized = true,
    session,
    token,
    ...init
  } = options;

  const accessToken = token ?? getSessionAccessToken(session);
  const finalHeaders = new Headers(headers);

  let finalBody: BodyInit | null | undefined = body as BodyInit | null;

  if (isPlainObject(body)) {
    finalHeaders.set("Content-Type", "application/json");
    finalBody = JSON.stringify(body);
  }

  if (auth && accessToken) {
    finalHeaders.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(buildApiUrl(path), {
    ...init,
    headers: finalHeaders,
    body: finalBody,
  });

  const contentType = response.headers.get("content-type") ?? "";
  const payload =
    response.status === 204
      ? null
      : contentType.includes("application/json")
        ? await response.json()
        : await response.text();

  if (!response.ok) {
    if (
      response.status === 401 &&
      redirectOnUnauthorized &&
      typeof window !== "undefined"
    ) {
      void signOut({ callbackUrl: "/auth" });
    }

    throw new ApiClientError(
      extractErrorMessage(payload, response.statusText || "Error de API"),
      response.status,
      payload,
    );
  }

  return payload as T;
}
