// Download SVG flag icons from flagcdn.com (free, no API key)
// Each SVG is ~2-5KB, very lightweight

const flagMap: { code: string; iso: string }[] = [
  { code: "jp", iso: "JP" }, // Nhật Bản
  { code: "tw", iso: "TW" }, // Đài Loan
  { code: "kr", iso: "KR" }, // Hàn Quốc
  { code: "cn", iso: "CN" }, // Trung Quốc
  { code: "my", iso: "MY" }, // Malaysia
  { code: "gr", iso: "GR" }, // Hy Lạp
  { code: "bg", iso: "BG" }, // Bulgaria
  { code: "lt", iso: "LT" }, // Litva
  { code: "ro", iso: "RO" }, // Rumani
  { code: "de", iso: "DE" }, // Đức
  { code: "pl", iso: "PL" }, // Ba Lan
  { code: "hu", iso: "HU" }, // Hungary
  { code: "sk", iso: "SK" }, // Slovakia
  { code: "hr", iso: "HR" }, // Croatia
  { code: "dk", iso: "DK" }, // Đan Mạch
  { code: "lv", iso: "LV" }, // Latvia
  { code: "rs", iso: "RS" }, // Serbia
  { code: "es", iso: "ES" }, // Tây Ban Nha
  { code: "at", iso: "AT" }, // Áo
  { code: "cz", iso: "CZ" }, // Séc
  { code: "no", iso: "NO" }, // Na Uy
  { code: "ie", iso: "IE" }, // Ireland
  { code: "al", iso: "AL" }, // Albania
  { code: "dz", iso: "DZ" }, // Algeria
  { code: "sa", iso: "SA" }, // Ả Rập Xê Út
  { code: "ae", iso: "AE" }, // Dubai (UAE)
  { code: "ru", iso: "RU" }, // Nga
];

let okCount = 0;
let failCount = 0;

for (const { code } of flagMap) {
  const url = `https://flagcdn.com/${code}.svg`;
  const out = `/home/z/my-project/public/flags/${code}.svg`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`FAIL ${code}: HTTP ${res.status}`);
      failCount++;
      continue;
    }
    const text = await res.text();
    await Bun.write(out, text);
    okCount++;
    console.log(`OK ${code}.svg (${text.length} bytes)`);
  } catch (err) {
    console.error(`ERR ${code}:`, err);
    failCount++;
  }
}

console.log(`\nDone: ${okCount} ok, ${failCount} fail`);
