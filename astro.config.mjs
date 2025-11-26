import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://sadaborras.com",
  base: "/",
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
});
