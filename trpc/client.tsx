"use client";
// ^-- to make sure we can mount the Provider from a server component
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";
import { makeQueryClient } from "./query-client";
import type { AppRouter } from "./routers/_app";
export const trpc = createTRPCReact<AppRouter>();
let clientQueryClientSingleton: QueryClient;
/**
 * Provide a React Query QueryClient configured for the current runtime environment.
 *
 * In server environments a new QueryClient is returned for each call; in browser
 * environments a single shared QueryClient instance is reused.
 *
 * @returns A QueryClient instance: a fresh client when running on the server, or a singleton client reused in the browser.
 */
function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= makeQueryClient());
}
/**
 * Determine the full TRPC HTTP endpoint URL based on runtime environment.
 *
 * @returns The TRPC endpoint URL: `"/api/trpc"` in a browser, `"https://<VERCEL_URL>/api/trpc"` when `VERCEL_URL` is set, or `"http://localhost:3000/api/trpc"` otherwise.
 */
function getUrl() {
  const base = (() => {
    if (typeof window !== "undefined") return "";
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return "http://localhost:3000";
  })();
  return `${base}/api/trpc`;
}
/**
 * Wraps children with TRPC and React Query providers so descendants can use TRPC hooks and the shared QueryClient.
 *
 * @returns A JSX element that renders `props.children` inside the configured TRPC provider and React Query QueryClientProvider.
 */
export function TRPCProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          // transformer: superjson, <-- if you use a data transformer
          url: getUrl(),
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}