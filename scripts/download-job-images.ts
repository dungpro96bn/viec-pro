// Download job images via Unsplash with proper headers
const images = [
  { url: "https://images.unsplash.com/photo-1581092160562-40aa08e78832?auto=format&fit=crop&w=600&q=80", out: "/home/z/my-project/public/jobs/job-1.jpg" },
  { url: "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=600&q=80", out: "/home/z/my-project/public/jobs/job-2.jpg" },
  { url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80", out: "/home/z/my-project/public/jobs/job-3.jpg" },
  { url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80", out: "/home/z/my-project/public/jobs/job-4.jpg" },
  { url: "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?auto=format&fit=crop&w=600&q=80", out: "/home/z/my-project/public/jobs/job-5.jpg" },
  { url: "https://images.unsplash.com/photo-1504384308090-c894fd495d86?auto=format&fit=crop&w=600&q=80", out: "/home/z/my-project/public/jobs/job-6.jpg" },
];

for (const item of images) {
  try {
    const res = await fetch(item.url, {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" }
    });
    if (!res.ok) { console.error(`FAIL ${item.url}: ${res.status}`); continue; }
    const buf = new Uint8Array(await res.arrayBuffer());
    await Bun.write(item.out, buf);
    console.log(`OK ${item.out} (${buf.byteLength} bytes)`);
  } catch (e) {
    console.error(`ERR ${item.url}:`, e);
  }
}
