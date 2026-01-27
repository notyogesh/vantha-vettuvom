import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://vanthavettuvom.com",
  output: "server",
  adapter: vercel({
    edgeMiddleware: false,
  }),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
