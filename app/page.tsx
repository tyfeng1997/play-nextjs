import { trpc, HydrateClient } from "@/trpc/server";
import { ClientGreeting } from "./client-greeting";
export default async function Home() {
  void trpc.hello.prefetch({ text: "OPS" });
  return (
    <HydrateClient>
      <ClientGreeting />
    </HydrateClient>
  );
}
