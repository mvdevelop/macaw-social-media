import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { id, username } = await request.json();

    if (!id || !username) {
      return NextResponse.json(
        { error: "id and username are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase.from("users").insert({
      id,
      username,
    });

    if (error) {
      console.error("Erro ao criar usuário no Supabase:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
