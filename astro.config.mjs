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
        // More specific URL matching to avoid priority overwrites
        const path = new URL(item.url).pathname;
        
        if (path === '/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (path === '/blog' || path === '/blog/') {
          item.priority = 0.6;
          item.changefreq = 'daily';
        } else if (path.startsWith('/blog/')) {
          item.priority = 0.7;
          item.changefreq = 'weekly';
        } else if (path.includes('/privacy-policy') || path.includes('/terms-and-conditions')) {
          item.priority = 0.3;
          item.changefreq = 'monthly';
        }

        const blogPost = posts.find((p) => path.replace(/\/$/, '') === `/blog/${p.slug}`);
        if (blogPost) {
          item.lastmod = new Date(blogPost.modifiedDate || blogPost.date);
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
