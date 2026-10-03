// Sends admin emails through the owner's Gmail via a Google Apps Script web app.
// The admin password is verified in the database; the Apps Script URL and its shared
// secret live in public.chatgpt26_mail_config (service role only), never in the browser.
const URL_ = Deno.env.get("SUPABASE_URL")!;
const KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MAX = 50;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });
}
function db(path: string, init: RequestInit = {}) {
  return fetch(`${URL_}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json", ...(init.headers || {}) },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
  if (req.method !== "POST") return json({ error: "method" }, 405);

  let p: { password?: string; messages?: { to?: string; subject?: string; body?: string }[] };
  try { p = await req.json(); } catch { return json({ error: "bad_json" }, 400); }

  const auth = await db("rpc/chatgpt26_admin_check", { method: "POST", body: JSON.stringify({ p_password: p.password ?? "" }) });
  if (!auth.ok) return json({ error: "unauthorized" }, 401);

  const msgs = Array.isArray(p.messages) ? p.messages : [];
  if (!msgs.length) return json({ error: "no_messages" }, 400);
  if (msgs.length > MAX) return json({ error: "too_many", max: MAX }, 400);
  const clean = [];
  for (const m of msgs) {
    const to = String(m.to ?? "").trim().toLowerCase();
    const subject = String(m.subject ?? "").trim();
    const body = String(m.body ?? "");
    if (!EMAIL.test(to) || !subject || subject.length > 200 || !body.trim() || body.length > 20000) {
      return json({ error: "invalid_message", to }, 400);
    }
    clean.push({ to, subject, body });
  }

  const cfgRes = await db("chatgpt26_mail_config?id=eq.1&select=script_url,secret");
  const cfg = cfgRes.ok ? (await cfgRes.json())[0] : null;
  if (!cfg?.script_url) return json({ error: "not_configured" }, 503);

  // Apps Script answers a POST with a 302 to the result; fetch follows it as a GET.
  const r = await fetch(cfg.script_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: cfg.secret, action: "mail", messages: clean }),
  });
  const text = await r.text();
  let out: Record<string, unknown>;
  try { out = JSON.parse(text); } catch { return json({ error: "script_error", status: r.status }, 502); }
  if (!out.ok) return json({ error: out.error || "script_error" }, 502);
  return json(out);
});
