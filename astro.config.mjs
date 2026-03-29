import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import posts from "./data/blog/posts.json";

export default defineConfig({
  site: "https://vanthavettuvom.com",
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  integrations: [
    sitemap({
      serialize(item) {
        if (item.url.endsWith('/')) {
          item.priority = 1.0;
        } else if (item.url.endsWith('/blog')) {
          item.priority = 0.6;
        } else if (item.url.includes('/blog/')) {
          item.priority = 0.7;
        } else if (item.url.includes('/privacy-policy') || item.url.includes('/terms-and-conditions')) {
          item.priority = 0.3;
        }

        const blogPost = posts.find((p) => item.url.endsWith(`/blog/${p.slug}`));
        if (blogPost) {
          item.lastmod = new Date(blogPost.modifiedDate || blogPost.date);
        } else if (item.url.endsWith('/') || item.url.endsWith('/blog')) {
          // Use the date of the latest post for the list pages
          const latestDate = posts.reduce((acc, p) => {
            const date = new Date(p.modifiedDate || p.date);
            return date > acc ? date : acc;
          }, new Date(0));
          item.lastmod = latestDate;
        }
        return item;
      },
    }),
  ],
  security: {
    checkOrigin: false,
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['@astrojs/vercel']
    }
  },
});
