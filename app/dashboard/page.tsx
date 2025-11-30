import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // 这里会去查数据库 session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Welcome, {session.user.name}!</h1>
      <p className="mt-2 text-gray-500">Email: {session.user.email}</p>
      <p className="mt-2 text-gray-500">User ID: {session.user.id}</p>
    </div>
  );
}
