"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/dashboard", // 注册成功后尝试跳转
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          // 很多时候注册会自动登录，或者你可以跳转到登录页
          alert("注册成功！即将跳转...");
          router.push("/dashboard");
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
        <h1 className="text-2xl font-bold mb-4">注册账户</h1>

        <input
          type="text"
          placeholder="姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-2 border rounded text-black"
        />
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
          onClick={handleSignUp}
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "注册中..." : "注册"}
        </button>

        <p className="mt-4 text-sm text-center">
          已有账号？{" "}
          <Link href="/sign-in" className="text-blue-500">
            去登录
          </Link>
        </p>
      </div>
    </div>
  );
}
