#!/usr/bin/env node

/**
 * Sube imágenes procesadas a Cloudflare R2 usando wrangler CLI.
 *
 * Uso:
 *   node scripts/upload-to-r2.mjs [source] [--bucket=nombre]
 *
 * Variables de entorno:
 *   R2_BUCKET_NAME  — nombre del bucket R2 (se puede pasar con --bucket)
 *
 * Ejemplos:
 *   R2_BUCKET_NAME=my-bucket node scripts/upload-to-r2.mjs
 *   node scripts/upload-to-r2.mjs dist-images/ --bucket=my-bucket
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..");

const CONTENT_TYPES = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

function parseArgs() {
  const args = process.argv.slice(2);
  const positional = args.filter((a) => !a.startsWith("--"));
  const bucketFlag = args.find((a) => a.startsWith("--bucket="));

  const bucket = bucketFlag
    ? bucketFlag.split("=")[1]
    : process.env.R2_BUCKET_NAME;

  if (!bucket) {
    console.error(
      "❌ Falta el nombre del bucket. Usá --bucket=nombre o la variable R2_BUCKET_NAME."
    );
    process.exit(1);
  }

  return {
    sourceDir: path.resolve(ROOT, positional[0] || "dist-images"),
    bucket,
  };
}

function findFiles(dir) {
  const results = [];

  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }

  return results;
}

function uploadFile(filePath, key, bucket) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = CONTENT_TYPES[ext] || "application/octet-stream";

  const cmd = [
    "npx wrangler r2 object put",
    `"${bucket}/${key}"`,
    `--file="${filePath}"`,
    `--content-type="${contentType}"`,
    "--remote",
  ].join(" ");

  execSync(cmd, { stdio: "pipe", cwd: ROOT });
}

function main() {
  const { sourceDir, bucket } = parseArgs();

  console.log("☁️  Upload a Cloudflare R2 — Clínica Sada-Borrás");
  console.log(`   Origen: ${path.relative(ROOT, sourceDir)}/`);
  console.log(`   Bucket: ${bucket}`);
  console.log();

  if (!fs.existsSync(sourceDir)) {
    console.error(
      `❌ El directorio ${path.relative(ROOT, sourceDir)}/ no existe. Ejecutá primero: npm run process:images`
    );
    process.exit(1);
  }

  const files = findFiles(sourceDir);
  if (files.length === 0) {
    console.log("⚠️  No se encontraron archivos para subir.");
    return;
  }

  console.log(`📂 ${files.length} archivos encontrados\n`);

  let uploaded = 0;
  let errors = 0;

  for (const filePath of files) {
    const key = path.relative(sourceDir, filePath).replace(/\\/g, "/");
    const progress = Math.round(((uploaded + errors + 1) / files.length) * 100);

    process.stdout.write(`  [${progress}%] ${key}\r`);

    try {
      uploadFile(filePath, key, bucket);
      uploaded++;
    } catch (err) {
      errors++;
      console.error(`\n❌ Error subiendo ${key}: ${err.message}`);
    }
  }

  console.log();
  console.log(`✅ Upload completado`);
  console.log(`   Subidos: ${uploaded}`);
  console.log(`   Errores: ${errors}`);
  console.log(`   Total:   ${files.length}`);

  if (uploaded > 0) {
    console.log(
      `\n🌐 URL pública: https://pub-146edcb977de463eb79397c4bb7d8d06.r2.dev/`
    );
  }
}

main();
