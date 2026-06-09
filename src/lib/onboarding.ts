"use server";

import { createClient } from "@/lib/supabase/server";
import { getServiceClient } from "@/lib/supabase/service";

/**
 * Verifica se o perfil do usuário está completo (tem nome definido).
 * Usado para redirecionar novos usuários ao onboarding.
 */
export async function isProfileComplete(): Promise<{ complete: boolean; needsOnboarding: boolean }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { complete: false, needsOnboarding: false };

  try {
    // Tenta usar service client (bypass RLS), fallback pro anon
    let profile: any = null;
    try {
      const svc = getServiceClient();
      const { data } = await svc
        .from("users")
        .select("name, avatar")
        .eq("id", user.id)
        .maybeSingle();
      profile = data;
    } catch {
      const { data } = await supabase
        .from("users")
        .select("name, avatar")
        .eq("id", user.id)
        .maybeSingle();
      profile = data;
    }

    if (!profile) {
      return { complete: false, needsOnboarding: true };
    }

    const email = user.email?.split("@")[0] || "";
    const isAutoName = !profile.name || profile.name === email || profile.name.startsWith("user_");
    const hasAvatar = !!profile.avatar;

    return {
      complete: !isAutoName && hasAvatar,
      needsOnboarding: isAutoName || !hasAvatar,
    };
  } catch {
    return { complete: false, needsOnboarding: false };
  }
}

/**
 * Atualiza o perfil do usuário durante o onboarding
 */
export async function completeOnboarding(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  const svc = getServiceClient();

  // Garante que o registro existe
  const username = user.email?.split("@")[0] || `user_${user.id.slice(0, 8)}`;
  const { data: existing } = await svc.from("users").select("id").eq("id", user.id).maybeSingle();
  if (!existing) {
    await svc.from("users").insert({
      id: user.id,
      username,
      name: username,
      surname: "",
      avatar: "",
      created_at: new Date().toISOString(),
    });
  }

  const name = formData.get("name") as string;
  const surname = formData.get("surname") as string;
  const username_new = formData.get("username") as string;
  const description = formData.get("description") as string;

  const updates: Record<string, string> = {};
  if (name?.trim()) updates.name = name.trim();
  if (surname?.trim()) updates.surname = surname.trim();
  if (username_new?.trim()) updates.username = username_new.trim();
  if (description?.trim()) updates.description = description.trim();

  // Upload avatar
  const avatar = formData.get("avatar") as File | null;
  if (avatar && avatar.size > 0) {
    const ext = avatar.name.split(".").pop() || "jpg";
    const filePath = `${user.id}/avatar.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatar, { upsert: true });
    if (!uploadError) {
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath);
      updates.avatar = urlData.publicUrl;
    }
  }

  if (Object.keys(updates).length > 0) {
    const { error } = await svc.from("users").update(updates).eq("id", user.id);
    if (error) throw new Error(error.message);
  }

  return { success: true };
}
