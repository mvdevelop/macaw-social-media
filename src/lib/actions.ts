"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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

  const image = formData.get("image") as File | null;
  let imgUrl: string | null = null;

  // Upload imagem se existir
  if (image && image.size > 0) {
    const ext = image.name.split(".").pop();
    const filePath = `${user.id}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("post-images")
      .upload(filePath, image);

    if (uploadError) {
      throw new Error(`Erro no upload: ${uploadError.message}`);
    }

    const { data: urlData } = supabase.storage
      .from("post-images")
      .getPublicUrl(filePath);

    imgUrl = urlData.publicUrl;
  }

  const { error } = await supabase.from("posts").insert({
    user_id: user.id,
    content,
    img: imgUrl,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function likePost(postId: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  // Verifica se já curtiu
  const { data: existing } = await supabase
    .from("likes")
    .select("id")
    .eq("user_id", user.id)
    .eq("post_id", postId)
    .single();

  if (existing) {
    // Descurtir
    await supabase
      .from("likes")
      .delete()
      .eq("id", existing.id);
  } else {
    // Curtir
    await supabase
      .from("likes")
      .insert({ user_id: user.id, post_id: postId });
  }

  revalidatePath("/");
}

export async function followUser(targetUserId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  const { data: existing } = await supabase
    .from("followers")
    .select("id")
    .eq("follower_id", user.id)
    .eq("following_id", targetUserId)
    .single();

  if (existing) {
    await supabase.from("followers").delete().eq("id", existing.id);
  } else {
    await supabase.from("followers").insert({
      follower_id: user.id,
      following_id: targetUserId,
    });
  }

  revalidatePath("/");
}

export async function createComment(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  const content = formData.get("content") as string;
  const postId = Number(formData.get("postId"));

  if (!content?.trim()) throw new Error("Comentário vazio");
  if (!postId) throw new Error("Post ID obrigatório");

  await supabase.from("comments").insert({
    content,
    user_id: user.id,
    post_id: postId,
  });

  revalidatePath("/");
}
