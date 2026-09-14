// Cross-platform replacement for `NODE_ENV=production bun .next/standalone/server.js`.
// Sets the runtime env vars (which cannot be prefixed inline on Windows) then
// launches the standalone server with plain Node.
process.env.NODE_ENV ||= "production";
process.env.PORT ||= "3000";

await import("../.next/standalone/server.js");
