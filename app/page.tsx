import { trpc, HydrateClient } from "@/trpc/server";
import UserInfo from "@/components/user-info"; // 引入上面的组件
import { redirect } from "next/navigation";

export default async function Home() {
  let userData = null;

  try {
    // 1. 服务端直接调用 (Direct Caller)
    // 这就像调用普通函数一样，直接去数据库查
    userData = await trpc.me();

    // 2. 预取数据 (Prefetch)
    // 这行代码把数据塞进 HydrateClient 的缓存里，传给前端
    void trpc.me.prefetch();
  } catch (error) {
    // 如果没登录，protectedProcedure 会抛错
    console.log("用户未登录，无法获取个人信息");
    // 你可以在这里选择重定向
    redirect("/sign-in");
  }

  return (
    <HydrateClient>
      <main className="p-10 max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">tRPC Context 测试</h1>

        {/* 测试 1: 服务端直接渲染结果 */}
        <div className="p-4 border border-green-500 rounded bg-green-50">
          <h3 className="font-bold text-green-700">Server Component (RSC):</h3>
          {userData ? (
            <pre className="text-sm overflow-auto mt-2">
              {JSON.stringify(userData, null, 2)}
            </pre>
          ) : (
            <p className="text-red-500">未登录或 Token 无效</p>
          )}
        </div>

        {/* 测试 2: 客户端组件渲染 (如果已登录) */}
        {userData && <UserInfo />}
      </main>
    </HydrateClient>
  );
}
