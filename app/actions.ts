"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  revalidatePath("/");
}

export async function deleteUser(userId: number) {
  await prisma.user.delete({
    where: { id: userId },
  });

  revalidatePath("/");
}

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const authorId = parseInt(formData.get("authorId") as string);
  const published = formData.get("published") === "on";

  await prisma.post.create({
    data: {
      title,
      content,
      published,
      authorId,
    },
  });

  revalidatePath("/");
}

export async function deletePost(postId: number) {
  await prisma.post.delete({
    where: { id: postId },
  });

  revalidatePath("/");
}
