import { updateSession } from "@/lib/supabase/proxy";
import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/settings(.*)",
  "/profile(.*)",
  "/friends(.*)",
  "/groups(.*)",
  "/events(.*)",
  "/marketplace(.*)",
];

// Rotas que redirecionam para home se já estiver logado
const guestOnlyRoutes = ["/sign-in(.*)", "/sign-up(.*)"];

export default async function proxy(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);

  const url = new URL(request.url);
  const path = url.pathname;

  // Protege rotas que exigem login
  const isProtected = protectedRoutes.some((route) => {
    const regex = new RegExp(`^${route}$`);
    return regex.test(path);
  });

  if (isProtected && !user) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(signInUrl);
  }

  // Redireciona usuários logados para home em páginas de login
  const isGuestOnly = guestOnlyRoutes.some((route) => {
    const regex = new RegExp(`^${route}$`);
    return regex.test(path);
  });

  if (isGuestOnly && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
