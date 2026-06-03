
"use server";

import { createClient } from "@/lib/supabase/server";

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  const desc = formData.get("desc") as string;

  await supabase.from("posts").insert({
    user_id: user.id,
    desc,
  });
}
