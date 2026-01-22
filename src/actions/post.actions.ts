
"use server";

import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

export async function createPost(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  const desc = formData.get("desc") as string;

  await prisma.post.create({
    data: {
      userId,
      desc,
    },
  });
}
