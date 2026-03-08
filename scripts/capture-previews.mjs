/**
 * Captures real screenshots of portfolio sites and saves them to public/.
 * Run: npm run capture-previews
 * Requires: npm install puppeteer
 */
import puppeteer from "puppeteer";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");

const VIEWPORT = { width: 1200, height: 760 };
const CAPTURES = [
  {
    url: "https://ciavagliatimepieces.ca",
    path: join(publicDir, "preview-ciavaglia.jpg"),
  },
  {
    url: "https://studysession.io",
    path: join(publicDir, "preview-studysession.jpg"),
  },
];

async function capture() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    for (const { url, path } of CAPTURES) {
      console.log("Capturing:", url);
      try {
        await page.goto(url, {
          waitUntil: "networkidle2",
          timeout: 20000,
        });
        await new Promise((r) => setTimeout(r, 1500));
        const buffer = await page.screenshot({
          type: "jpeg",
          quality: 88,
          path,
        });
        if (buffer) writeFileSync(path, buffer);
        console.log("  ->", path);
      } catch (err) {
        console.error("  Error:", err.message);
      }
    }
  } finally {
    await browser.close();
  }
}

capture();
