import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

// One-time bootstrap: creates the first two owner accounts, then locks itself.
// Requires the x-bootstrap-key secret to match BOOTSTRAP_KEY and refuses once
// any admin exists.
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const providedKey = req.headers.get("x-bootstrap-key");
    const bootstrapKey = Deno.env.get("BOOTSTRAP_KEY");
    if (!bootstrapKey || !providedKey || providedKey !== bootstrapKey) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { count } = await supabaseAdmin
      .from("admin_users")
      .select("user_id", { count: "exact", head: true });
    if ((count ?? 0) > 0) {
      return new Response(JSON.stringify({ error: "Already bootstrapped" }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admins = [
      { email: "hersheyextraalt@gmail.com", password: crypto.randomUUID() + crypto.randomUUID() },
      { email: "colorthefuturefrisco@gmail.com", password: crypto.randomUUID() + crypto.randomUUID() },
    ];

    const created: { email: string; user_id: string }[] = [];
    for (const admin of admins) {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: admin.email,
        password: admin.password,
        email_confirm: true,
      });
      if (error) {
        if (error.message.includes("already registered")) {
          const lookup = await supabaseAdmin.auth.admin.listUsers();
          const existing = lookup.data?.users?.find((u) => u.email === admin.email);
          if (existing) {
            created.push({ email: admin.email, user_id: existing.id });
            continue;
          }
        }
        throw new Error(error.message);
      }
      created.push({ email: admin.email, user_id: data.user!.id });
    }

    const { error: insertError } = await supabaseAdmin.from("admin_users").insert(
      created.map((a) => ({ user_id: a.user_id, role: "owner" }))
    );
    if (insertError) throw new Error(insertError.message);

    await supabaseAdmin.from("admin_audit_log").insert({
      actor_email: "bootstrap",
      action: "bootstrap_owners",
      subject_table: "admin_users",
      details: { emails: created.map((c) => c.email) },
    });

    return new Response(JSON.stringify({ ok: true, admins: created.map((c) => c.email) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("bootstrap failed", err);
    return new Response(JSON.stringify({ error: "Bootstrap failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
