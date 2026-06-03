"use server";

import { createClient } from "@/lib/supabase/server";

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  const content = formData.get("content") as string;
  if (!content?.trim()) {
    throw new Error("O post não pode estar vazio");
  }

  const { error } = await supabase.from("posts").insert({
    user_id: user.id,
    content,
  });

  if (error) {
    throw new Error(error.message);
  }
}
