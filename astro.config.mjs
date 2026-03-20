import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

import posts from "./data/blog/posts.json";

export default defineConfig({
  site: "https://vanthavettuvom.com",
  output: "server",
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
          // Extract slug from URL (handles both trailing and no trailing slash)
          const urlParts = item.url.replace(/\/$/, '').split('/');
          const slug = urlParts[urlParts.length - 1];
          
          // Find matching post to get the correct date
          const post = posts.find(p => p.slug === slug);
          if (post) {
            item.lastmod = new Date(post.date).toISOString();
          } else {
            item.lastmod = new Date().toISOString();
          }
        }
        return item;
      },
    }),
  ],
});
