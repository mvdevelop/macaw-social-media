"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB — seguro para plano free, com compressão client-side
const MAX_VIDEO_SIZE = 15 * 1024 * 1024; // 15MB para vídeos

function validateFileSize(file: File, isVideo = false): void {
  const limit = isVideo ? MAX_VIDEO_SIZE : MAX_FILE_SIZE;
  if (file.size > limit) {
    const type = isVideo ? "Vídeo" : "Imagem";
    throw new Error(
      `${type} muito grande (${(file.size / 1024 / 1024).toFixed(1)}MB). ` +
      `Máximo permitido: ${(limit / 1024 / 1024).toFixed(0)}MB.`
    );
  }
}

/** Remove arquivo antigo do Storage para evitar arquivos órfãos */
async function deleteStorageFile(bucket: string, filePath: string): Promise<void> {
  if (!filePath || filePath.includes("pexels")) return; // não remove URLs externas
  try {
    const supabase = await createClient();
    // Extrai o path relativo da URL pública
    const url = new URL(filePath);
    const pathParts = url.pathname.split("/");
    // O path no storage é: {bucket}/userId/filename
    const storagePath = pathParts.slice(pathParts.indexOf(bucket) + 1).join("/");
    if (storagePath) {
      await supabase.storage.from(bucket).remove([storagePath]);
    }
  } catch {
    // Silencioso — não deve quebrar a operação principal
  }
}
async function ensureUserExists(userId: string, email?: string) {
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .maybeSingle();
  if (existing) return;
  const username = email?.split("@")[0] || `user_${userId.slice(0, 8)}`;
  const { error } = await supabase.from("users").insert({
    id: userId, username, name: username, surname: "",
    avatar: "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg",
  });
  if (error && error.code !== "23505") {
    // 23505 = duplicate key, ignora (corrida concorrente)
    console.warn("ensureUserExists insert error:", error);
  }
}

// ============================
// PROFILE
// ============================
export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");
  await ensureUserExists(user.id, user.email);

  const fields = ["name", "surname", "description", "city", "school", "work", "website"];
  const updates: Record<string, string> = {};
  for (const field of fields) {
    const val = formData.get(field) as string;
    if (val !== null && val !== undefined) updates[field] = val;
  }

  // Só faz update se tiver campos de texto OU avatar
  if (Object.keys(updates).length === 0 && !formData.has("avatar")) {
    return; // nada pra atualizar
  }

  const avatar = formData.get("avatar") as File | null;
  if (avatar && avatar.size > 0) {
    validateFileSize(avatar);
    // Deleta avatar antigo antes de enviar o novo
    const { data: oldProfile } = await supabase.from("users").select("avatar").eq("id", user.id).single();
    if (oldProfile?.avatar) await deleteStorageFile("avatars", oldProfile.avatar);
    const ext = avatar.name.split(".").pop();
    const filePath = `${user.id}/avatar.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatar, { upsert: true });
    if (!uploadError) {
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath);
      updates.avatar = urlData.publicUrl;
    }
  }

  const { error } = await supabase.from("users").update(updates).eq("id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/settings");
}

export async function updateProfileCover(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");
  await ensureUserExists(user.id, user.email);

  const cover = formData.get("cover") as File;
  if (!cover || cover.size === 0) throw new Error("No cover file");
  validateFileSize(cover);

  // Deleta cover antigo antes de enviar o novo
  const { data: oldProfile } = await supabase.from("users").select("cover").eq("id", user.id).single();
  if (oldProfile?.cover) await deleteStorageFile("avatars", oldProfile.cover);

  const ext = cover.name.split(".").pop();
  const filePath = `${user.id}/cover.${ext}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, cover, { upsert: true });
  if (uploadError) throw new Error(uploadError.message);

  const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath);
  const { error } = await supabase.from("users").update({ cover: urlData.publicUrl }).eq("id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/settings");
}

// ============================
// POSTS
// ============================
export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Usuário não autenticado");
  await ensureUserExists(user.id, user.email);

  const content = formData.get("content") as string;
  if (!content?.trim()) throw new Error("O post não pode estar vazio");

  const media = formData.get("media") as File | null;
  let imgUrl: string | null = null;

  if (media && media.size > 0) {
    const isVideo = media.type.startsWith("video/");
    validateFileSize(media, isVideo);
    const ext = media.name.split(".").pop();
    const filePath = `${user.id}/${Date.now()}.${ext}`;
    const bucket = isVideo ? "post-videos" : "post-images";

    const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, media);
    if (uploadError) throw new Error(`Erro no upload: ${uploadError.message}`);
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
    imgUrl = urlData.publicUrl;
  }

  const { error } = await supabase.from("posts").insert({
    id: Date.now() * 1000 + Math.floor(Math.random() * 1000),
    user_id: user.id, content, img: imgUrl,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/");
}

export async function updatePost(postId: number, content: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");
  const { error } = await supabase.from("posts").update({ content, updated_at: new Date().toISOString() }).eq("id", postId).eq("user_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
}

export async function deletePost(postId: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  // Busca a imagem do post para deletar do storage
  const { data: post } = await supabase.from("posts").select("img").eq("id", postId).eq("user_id", user.id).single();
  if (post?.img) {
    await deleteStorageFile("post-images", post.img);
    await deleteStorageFile("post-videos", post.img);
  }

  const { error } = await supabase.from("posts").delete().eq("id", postId).eq("user_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
}

export async function likePost(postId: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");
  await ensureUserExists(user.id, user.email);
  const { data: existing } = await supabase.from("likes").select("id").eq("user_id", user.id).eq("post_id", postId).maybeSingle();
  if (existing) {
    await supabase.from("likes").delete().eq("id", existing.id);
  } else {
    await supabase.from("likes").insert({ id: Date.now() * 1000 + Math.floor(Math.random() * 1000), user_id: user.id, post_id: postId });
  }
  revalidatePath("/");
}

export async function sharePost(postId: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");
  const { data: existing } = await supabase.from("shares").select("id").eq("user_id", user.id).eq("post_id", postId).maybeSingle();
  if (!existing) {
    await supabase.from("shares").insert({ id: Date.now() * 1000 + Math.floor(Math.random() * 1000), user_id: user.id, post_id: postId });
  }
  revalidatePath("/");
}

// ============================
// COMMENTS
// ============================
export async function createComment(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");
  await ensureUserExists(user.id, user.email);
  const content = formData.get("content") as string;
  const postId = Number(formData.get("postId"));
  const parentIdRaw = formData.get("parentId");
  const parentId = parentIdRaw ? Number(parentIdRaw) : null;
  if (!content?.trim()) throw new Error("Comentário vazio");
  if (!postId) throw new Error("Post ID obrigatório");
  const { error } = await supabase.from("comments").insert({
    id: Date.now() * 1000 + Math.floor(Math.random() * 1000),
    content, user_id: user.id, post_id: postId, parent_id: parentId,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/");
}

export async function likeComment(commentId: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");
  const { data: existing } = await supabase.from("likes").select("id").eq("user_id", user.id).eq("comment_id", commentId).maybeSingle();
  if (existing) {
    await supabase.from("likes").delete().eq("id", existing.id);
  } else {
    await supabase.from("likes").insert({ id: Date.now() * 1000 + Math.floor(Math.random() * 1000), user_id: user.id, comment_id: commentId });
  }
}

export async function deleteComment(commentId: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");
  await supabase.from("comments").delete().eq("id", commentId).eq("user_id", user.id);
  revalidatePath("/");
}

// ============================
// FOLLOW / FRIENDS
// ============================
export async function sendFriendRequest(receiverId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");
  await supabase.from("follow_requests").insert({ sender_id: user.id, receiver_id: receiverId });
  revalidatePath("/friends");
}

export async function acceptFriendRequest(senderId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");
  // Deleta a solicitação
  await supabase.from("follow_requests").delete().eq("sender_id", senderId).eq("receiver_id", user.id);
  // Cria seguidor nos dois sentidos (amizade mútua)
  await supabase.from("followers").insert({ follower_id: user.id, following_id: senderId });
  await supabase.from("followers").insert({ follower_id: senderId, following_id: user.id });
  revalidatePath("/friends");
}

export async function rejectFriendRequest(senderId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");
  await supabase.from("follow_requests").delete().eq("sender_id", senderId).eq("receiver_id", user.id);
  revalidatePath("/friends");
}

export async function followUser(targetUserId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");
  await ensureUserExists(user.id, user.email);
  const { data: existing } = await supabase
    .from("followers")
    .select("id")
    .eq("follower_id", user.id)
    .eq("following_id", targetUserId)
    .maybeSingle();
  if (existing) {
    await supabase.from("followers").delete().eq("id", existing.id);
  } else {
    await supabase.from("followers").insert({ follower_id: user.id, following_id: targetUserId });
  }
  revalidatePath("/");
  revalidatePath(`/profile/${targetUserId}`);
}

export async function unfollowUser(targetUserId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");
  await supabase.from("followers").delete().eq("follower_id", user.id).eq("following_id", targetUserId);
  revalidatePath("/");
}

// ============================
// MESSAGES (CHAT)
// ============================
export async function sendMessage(conversationId: number, content: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");
  const { error } = await supabase.from("messages").insert({
    id: Date.now() * 1000 + Math.floor(Math.random() * 1000),
    content, sender_id: user.id, conversation_id: conversationId,
  });
  if (error) throw new Error(error.message);
  await supabase.from("conversations").update({ updated_at: new Date().toISOString() }).eq("id", conversationId);
}

export async function getOrCreateConversation(otherUserId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  // Tenta achar conversa existente
  const { data: existing } = await supabase.rpc("get_or_create_conversation", {
    user1_id: user.id, user2_id: otherUserId,
  });
  return existing as number;
}

export async function markConversationRead(conversationId: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");
  await supabase.from("conversation_participants").update({ last_read_at: new Date().toISOString() })
    .eq("conversation_id", conversationId).eq("user_id", user.id);
}

// ============================
// NOTIFICATIONS
// ============================
export async function markNotificationRead(notificationId: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");
  await supabase.from("notifications").update({ read: true }).eq("id", notificationId).eq("user_id", user.id);
}

export async function markAllNotificationsRead() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");
  await supabase.from("notifications").update({ read: true }).eq("user_id", user.id).eq("read", false);
  revalidatePath("/");
}
