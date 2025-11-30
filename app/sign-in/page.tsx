"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/dashboard", // 登录成功跳转
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          router.push("/dashboard"); // 客户端路由跳转
          router.refresh(); // 刷新以更新 RSC 状态
        },
        onError: (ctx) => {
          setLoading(false);
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm p-6 bg-white border rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">登录</h1>

        <input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded text-black"
        />
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded text-black"
        />

        <button
          onClick={handleSignIn}
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "登录中..." : "登录"}
        </button>

        <p className="mt-4 text-sm text-center">
          还没有账号？{" "}
          <Link href="/sign-up" className="text-blue-500">
            去注册
          </Link>
        </p>
      </div>
    </div>
  );
}
