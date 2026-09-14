// Two-step download: 1) fetch jobsgo.vn homepage to obtain cookies, 2) use cookies to fetch the image
const targetUrl = "https://media-blog.jobsgo.vn/blog/wp-content/uploads/2026/05/Banner-web-1.jpg";
const homeUrl = "https://jobsgo.vn/";

const ua =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

const commonHeaders = {
  "User-Agent": ua,
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
  "Accept-Language": "vi-VN,vi;q=0.9,en;q=0.8",
  "Sec-Ch-Ua":
    '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"macOS"',
};

// Step 1: visit homepage to gather cookies
console.log(`Step 1: Fetching home page ${homeUrl}`);
const homeRes = await fetch(homeUrl, {
  headers: { ...commonHeaders, "Sec-Fetch-Dest": "document", "Sec-Fetch-Mode": "navigate", "Sec-Fetch-Site": "none" },
  redirect: "follow",
});
console.log(`  Home: ${homeRes.status}`);
const setCookies = homeRes.headers.getSetCookie?.() ?? [];
const cookieStr = setCookies.map((c) => c.split(";")[0]).join("; ");
console.log(`  Cookies: ${cookieStr || "(none)"}`);

// Step 2: fetch the image with cookies + referer
console.log(`Step 2: Fetching image ${targetUrl}`);
const imgRes = await fetch(targetUrl, {
  headers: {
    ...commonHeaders,
    Referer: homeUrl,
    Cookie: cookieStr,
    "Sec-Fetch-Dest": "image",
    "Sec-Fetch-Mode": "no-cors",
    "Sec-Fetch-Site": "cross-site",
  },
  redirect: "follow",
});
console.log(`  Image: ${imgRes.status} ${imgRes.statusText}`);
if (!imgRes.ok) {
  // try without referer/cookies as last resort
  console.log("  Retrying with no cookies/referer...");
  const r2 = await fetch(targetUrl, { headers: { "User-Agent": ua } });
  console.log(`  Retry: ${r2.status}`);
  if (!r2.ok) process.exit(1);
  const buf = new Uint8Array(await r2.arrayBuffer());
  await Bun.write("/home/z/my-project/public/banners/banner-3.jpg", buf);
  console.log(`  Saved ${buf.byteLength} bytes`);
  process.exit(0);
}
const buf = new Uint8Array(await imgRes.arrayBuffer());
await Bun.write("/home/z/my-project/public/banners/banner-3.jpg", buf);
console.log(`  Saved ${buf.byteLength} bytes -> banner-3.jpg`);
