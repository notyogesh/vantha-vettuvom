import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://vanthavettuvom.com",
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  outDir: "./dist",
  vite: {
    plugins: [tailwindcss()],
  },
});
