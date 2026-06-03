import { updateSession } from "@/lib/supabase/proxy";
import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/settings(.*)"];

export default async function proxy(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);

  const url = new URL(request.url);
  const isProtected = protectedRoutes.some((route) => {
    const regex = new RegExp(`^${route}$`);
    return regex.test(url.pathname);
  });

  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    // Ignora arquivos estáticos e internals do Next
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Sempre roda para APIs
    "/(api|trpc)(.*)",
  ],
};
