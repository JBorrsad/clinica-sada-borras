#!/usr/bin/env node

/**
 * Procesa imágenes generando variantes WebP optimizadas (low, med, high).
 *
 * Uso:
 *   node scripts/process-images.mjs [source] [output] [--force]
 *
 * Ejemplos:
 *   node scripts/process-images.mjs
 *   node scripts/process-images.mjs public/img/ dist-images/ --force
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..");

const VARIANTS = [
  { suffix: "low", width: 200, quality: 30 },
  { suffix: "med", width: 800, quality: 70 },
  { suffix: "high", width: 1600, quality: 85 },
];

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function parseArgs() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const positional = args.filter((a) => !a.startsWith("--"));

  return {
    sourceDir: path.resolve(ROOT, positional[0] || "public/img"),
    outputDir: path.resolve(ROOT, positional[1] || "dist-images"),
    force,
  };
}

function findImages(dir) {
  const results = [];

  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findImages(fullPath));
    } else if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      results.push(fullPath);
    }
  }

  return results;
}

function allVariantsExist(baseName, outputSubDir) {
  return VARIANTS.every((v) =>
    fs.existsSync(path.join(outputSubDir, `${baseName}-${v.suffix}.webp`))
  );
}

async function processImage(sharp, sourcePath, outputSubDir, baseName) {
  fs.mkdirSync(outputSubDir, { recursive: true });

  const metadata = await sharp(sourcePath).metadata();
  const originalWidth = metadata.width || Infinity;

  const tasks = VARIANTS.map(async (variant) => {
    const outPath = path.join(outputSubDir, `${baseName}-${variant.suffix}.webp`);
    const targetWidth = Math.min(variant.width, originalWidth);

    await sharp(sourcePath)
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality: variant.quality })
      .toFile(outPath);
  });

  await Promise.all(tasks);
}

async function main() {
  const { sourceDir, outputDir, force } = parseArgs();

  console.log("🖼️  Procesador de imágenes — Clínica Sada-Borrás");
  console.log(`   Origen:  ${path.relative(ROOT, sourceDir)}/`);
  console.log(`   Destino: ${path.relative(ROOT, outputDir)}/`);
  console.log(`   Forzar:  ${force ? "sí" : "no"}`);
  console.log();

  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error("❌ No se pudo importar sharp. Instalalo con: npm i -D sharp");
    process.exit(1);
  }

  const images = findImages(sourceDir);
  if (images.length === 0) {
    console.log("⚠️  No se encontraron imágenes en el directorio de origen.");
    return;
  }

  console.log(`📂 ${images.length} imágenes encontradas\n`);

  let processed = 0;
  let skipped = 0;

  for (const imagePath of images) {
    const relativePath = path.relative(sourceDir, imagePath);
    const dirPart = path.dirname(relativePath);
    const baseName = path.basename(imagePath, path.extname(imagePath));
    const outputSubDir = path.join(outputDir, dirPart);
    const progress = Math.round(((processed + skipped + 1) / images.length) * 100);

    if (!force && allVariantsExist(baseName, outputSubDir)) {
      skipped++;
      continue;
    }

    process.stdout.write(
      `  [${progress}%] ${relativePath} → ${baseName}-{low,med,high}.webp\r`
    );

    try {
      await processImage(sharp, imagePath, outputSubDir, baseName);
      processed++;
    } catch (err) {
      console.error(`\n❌ Error procesando ${relativePath}: ${err.message}`);
    }
  }

  console.log();
  console.log(`✅ Proceso completado`);
  console.log(`   Procesadas: ${processed}`);
  console.log(`   Omitidas:   ${skipped} (ya existían)`);
  console.log(`   Total:      ${images.length}`);
}

main().catch((error) => {
  console.error("💥 Error fatal:", error.message);
  process.exit(1);
});
