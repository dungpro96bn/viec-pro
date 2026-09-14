// Download banner images with full browser headers (curl fails with 403 for some sites)
const urls = [
  {
    url: "https://media-blog.jobsgo.vn/blog/wp-content/uploads/2026/05/Banner-web-1.jpg",
    out: "/home/z/my-project/public/banners/banner-3.jpg",
  },
];

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
  "Accept-Encoding": "gzip, deflate, br",
  "Cache-Control": "no-cache",
  "Pragma": "no-cache",
  "Sec-Ch-Ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"macOS"',
  "Sec-Fetch-Dest": "image",
  "Sec-Fetch-Mode": "no-cors",
  "Sec-Fetch-Site": "cross-site",
  Referer: "https://jobsgo.vn/",
};

for (const item of urls) {
  try {
    console.log(`Downloading: ${item.url}`);
    const res = await fetch(item.url, { headers, redirect: "follow" });
    if (!res.ok) {
      console.error(`  HTTP ${res.status} ${res.statusText}`);
      process.exit(1);
    }
    const buf = new Uint8Array(await res.arrayBuffer());
    await Bun.write(item.out, buf);
    console.log(`  Saved ${buf.byteLength} bytes -> ${item.out}`);
  } catch (err) {
    console.error(`  Error:`, err);
    process.exit(1);
  }
}
