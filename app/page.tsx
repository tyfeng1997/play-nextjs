import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  // 查询所有用户及其文章
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  // 统计数据
  const userCount = await prisma.user.count();
  const postCount = await prisma.post.count();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Prisma 测试页面</h1>

      <div className="mb-6 space-y-2">
        <p className="text-lg">用户总数: {userCount}</p>
        <p className="text-lg">文章总数: {postCount}</p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">用户列表</h2>
        {users.length === 0 ? (
          <p className="text-gray-500">暂无用户数据</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="border rounded-lg p-4">
              <h3 className="text-xl font-medium">
                {user.name || "未命名用户"}
              </h3>
              <p className="text-gray-600">{user.email}</p>

              {user.posts.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">文章:</h4>
                  <ul className="space-y-2">
                    {user.posts.map((post) => (
                      <li key={post.id} className="pl-4 border-l-2">
                        <p className="font-medium">{post.title}</p>
                        {post.content && (
                          <p className="text-sm text-gray-600">
                            {post.content}
                          </p>
                        )}
                        <span
                          className={`text-xs ${
                            post.published ? "text-green-600" : "text-gray-400"
                          }`}
                        >
                          {post.published ? "已发布" : "草稿"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <Button className="mt-6">测试按钮</Button>
    </div>
  );
}
