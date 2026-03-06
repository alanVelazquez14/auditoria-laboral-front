import { signOut } from "next-auth/react";

export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {},
  session: any,
) => {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (res.status === 401) {
    signOut({ callbackUrl: "/auth" });
  }

  return res;
};
