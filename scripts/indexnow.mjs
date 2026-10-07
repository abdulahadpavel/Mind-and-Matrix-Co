// Tells Bing (and other IndexNow search engines: Yandex, Seznam, Naver) which pages changed,
// so they crawl them within hours. Run after a deploy: npm run indexnow
// Optional: pass paths to submit only those, e.g. npm run indexnow -- /white-label /
const KEY = "59ddb6e93697e3422b0c238b16557b7b"; // also served at /59ddb6e93697e3422b0c238b16557b7b.txt (public/)
const SITE = "https://www.mindandmatrixco.com";

const paths = process.argv.slice(2);
let urls;
if (paths.length) {
  urls = paths.map((p) => SITE + (p.startsWith("/") ? p : "/" + p));
} else {
  const xml = await (await fetch(SITE + "/sitemap.xml")).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} — submitted ${urls.length} URL(s)`);
if (res.status >= 300) process.exit(1);
