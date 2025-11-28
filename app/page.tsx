import { trpc, HydrateClient } from "@/trpc/server";
import { ClientGreeting } from "./client-greeting";
/**
 * Render the home page while initiating a background prefetch of the `hello` TRPC query.
 *
 * @returns A React element that hydrates client-side state and renders the `ClientGreeting` component.
 */
export default async function Home() {
  void trpc.hello.prefetch({ text: "OPS" });
  return (
    <HydrateClient>
      <ClientGreeting />
    </HydrateClient>
  );
}