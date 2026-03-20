import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://vanthavettuvom.com",
  output: "static",
  adapter: vercel({
    edgeMiddleware: false,
  }),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      serialize(item) {
        if (/blog\/[^\/]+/.test(item.url)) {
          // For blog posts, we can use the current date or try to match with posts.json
          // But since we are building now, using the current date is usually fine
          // or we can just let Astro handle it if we provide the right metadata.
          item.lastmod = new Date().toISOString();
        }
        return item;
      },
    }),
  ],
});
