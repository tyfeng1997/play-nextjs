"use client";
// <-- hooks can only be used in client components
import { trpc } from "@/trpc/client";
/**
 * Client-side React component that fetches and displays a greeting.
 *
 * Renders "Loading..." while the greeting is being fetched, then renders the greeting text returned by the TRPC query.
 *
 * @returns A JSX element containing either the loading indicator or the fetched greeting string.
 */
export function ClientGreeting() {
  const greeting = trpc.hello.useQuery({ text: "OPS" });
  if (!greeting.data) return <div>Loading...</div>;
  return <div>{greeting.data.greeting}</div>;
}