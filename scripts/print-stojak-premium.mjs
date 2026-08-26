import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";
import puppeteer from "puppeteer-core";

const root = path.resolve(import.meta.dirname, "..");
const htmlPath = path.resolve(root, process.argv[2] || "public/stojak/premium-spec.html");
const outPath = path.resolve(root, process.argv[3] || "public/stojak/premium-spec.pdf");
const pageWidth = process.argv[4] || "210mm";
const pageHeight = process.argv[5] || "297mm";
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function mmToPx(value) {
  return Math.round((parseFloat(value) * 96) / 25.4);
}

if (!fs.existsSync(chrome)) {
  throw new Error("Nie znaleziono Google Chrome.");
}

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
});

const page = await browser.newPage();
await page.setViewport({
  width: mmToPx(pageWidth),
  height: mmToPx(pageHeight),
  deviceScaleFactor: 2,
});
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
  width: pageWidth,
  height: pageHeight,
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
});

await browser.close();
console.log(`Zapisano: ${outPath}`);
