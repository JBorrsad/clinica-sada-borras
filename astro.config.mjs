import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://jborrsad.github.io",
  // base: "/clinica-sada-borras", // Comentado para desarrollo local
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
});
