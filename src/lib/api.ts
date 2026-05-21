import { apiClientRequest } from "@/lib/api-client";

export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {},
  session: unknown,
) => {
  return apiClientRequest(url, {
    ...options,
    auth: true,
    session: session as {
      accessToken?: string | null;
      user?: { accessToken?: string | null } | null;
    },
  });
};
