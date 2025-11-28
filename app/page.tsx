import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { createUser, deleteUser, createPost, deletePost } from "./actions";

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

      {/* 创建用户表单 */}
      <div className="mb-8 border rounded-lg p-4 bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">创建新用户</h2>
        <form action={createUser} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">名称</label>
            <input
              name="name"
              type="text"
              required
              className="w-full px-3 py-2 border rounded-md"
              placeholder="输入用户名称"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">邮箱</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border rounded-md"
              placeholder="输入邮箱"
            />
          </div>
          <Button type="submit">创建用户</Button>
        </form>
      </div>

      {/* 创建文章表单 */}
      {users.length > 0 && (
        <div className="mb-8 border rounded-lg p-4 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">创建新文章</h2>
          <form action={createPost} className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">作者</label>
              <select
                name="authorId"
                required
                className="w-full px-3 py-2 border rounded-md"
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name || user.email}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">标题</label>
              <input
                name="title"
                type="text"
                required
                className="w-full px-3 py-2 border rounded-md"
                placeholder="输入文章标题"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">内容</label>
              <textarea
                name="content"
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                placeholder="输入文章内容"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                name="published"
                type="checkbox"
                id="published"
                className="w-4 h-4"
              />
              <label htmlFor="published" className="text-sm font-medium">
                发布
              </label>
            </div>
            <Button type="submit">创建文章</Button>
          </form>
        </div>
      )}

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">用户列表</h2>
        {users.length === 0 ? (
          <p className="text-gray-500">暂无用户数据</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium">
                    {user.name || "未命名用户"}
                  </h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <form action={deleteUser.bind(null, user.id)}>
                  <Button type="submit" variant="destructive" size="sm">
                    删除用户
                  </Button>
                </form>
              </div>

              {user.posts.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">文章:</h4>
                  <ul className="space-y-2">
                    {user.posts.map((post) => (
                      <li key={post.id} className="pl-4 border-l-2">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium">{post.title}</p>
                            {post.content && (
                              <p className="text-sm text-gray-600">
                                {post.content}
                              </p>
                            )}
                            <span
                              className={`text-xs ${
                                post.published
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }`}
                            >
                              {post.published ? "已发布" : "草稿"}
                            </span>
                          </div>
                          <form action={deletePost.bind(null, post.id)}>
                            <Button
                              type="submit"
                              variant="outline"
                              size="sm"
                              className="ml-2"
                            >
                              删除
                            </Button>
                          </form>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
