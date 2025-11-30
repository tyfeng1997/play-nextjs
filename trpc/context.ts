import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const createContext = async () => {
  const headerList = await headers();
  const sessionData = await auth.api.getSession({
    headers: headerList,
  });

  return {
    session: sessionData?.session || null,
    user: sessionData?.user || null,
    headers: headerList,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
