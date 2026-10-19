// -> /api/benchmark

{/* import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    return NextResponse.json(
      { error: "You must be signed in to run this benchmark." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  const start = performance.now();
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("id, full_name, email, phone_number, user_role, created_at")
    .eq("id", authData.user.id)
    .single();
  const databaseMs = performance.now() - start;

  if (profileError) {
    return NextResponse.json(
      { error: profileError.message, databaseMs: Number(databaseMs.toFixed(2)) },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(
    {
      databaseMs: Number(databaseMs.toFixed(2)),
      profile,
    },
    {
      headers: {
        "Cache-Control": "no-store",
        "Server-Timing": `database;dur=${databaseMs.toFixed(2)}`,
      },
    },
  );
}
*/}