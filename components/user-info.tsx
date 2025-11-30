"use client";

import { trpc } from "@/trpc/client";

export default function UserInfo() {
  const { data: user } = trpc.me.useQuery();

  return (
    <div className="mt-4 p-4 border border-blue-500 rounded bg-blue-50">
      <h3 className="font-bold text-blue-700">Client Component (Hydrated):</h3>
      <p>ID: {user?.id}</p>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}
