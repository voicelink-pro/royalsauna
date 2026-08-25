import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";
import puppeteer from "puppeteer-core";

const root = path.resolve(import.meta.dirname, "..");
const htmlPath = path.join(root, "public/stojak/premium-spec.html");
const outPath = path.join(root, "public/stojak/premium-spec.pdf");
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

if (!fs.existsSync(chrome)) {
  throw new Error("Nie znaleziono Google Chrome.");
}

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
});

const page = await browser.newPage();
await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load", timeout: 30_000 });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(async () => {
  await Promise.all(
    [...document.images].map((img) =>
      img.complete ? undefined : new Promise((resolve) => {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", resolve, { once: true });
      }),
    ),
  );
});

await page.pdf({
  path: outPath,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
});

await browser.close();
console.log(`Zapisano: ${outPath}`);
