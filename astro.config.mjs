import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import posts from "./data/blog/posts.json";

// Calculate the latest post date from the blog JSON to use for other pages automatically
const latestPostDate = posts.reduce((latest, post) => {
  const current = new Date(post.modifiedDate || post.date);
  return current > latest ? current : latest;
}, new Date(0));

export default defineConfig({
  site: "https://www.vanthavettuvom.com",
  output: "server",
  redirects: {
    "/blog/cheapest-whatsapp-api-providers-india-2026": "/blog/affordable-whatsapp-api-providers-india-2026",
  },
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
  }),
  integrations: [
    sitemap({
      serialize(item) {
        const path = new URL(item.url).pathname;
        
        // 1. Priority & Frequency Logic
        if (path === '/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
          item.lastmod = latestPostDate; // Always use latest blog update for home
        } else if (path === '/blog' || path === '/blog/') {
          item.priority = 0.6;
          item.changefreq = 'daily';
          item.lastmod = latestPostDate; // Always use latest blog update for blog list
        } else if (path.startsWith('/blog/')) {
          item.priority = 0.7;
          item.changefreq = 'weekly';
        } else if (path.includes('/privacy-policy') || path.includes('/terms-and-conditions')) {
          item.priority = 0.3;
          item.changefreq = 'monthly';
          item.lastmod = latestPostDate; // Even policy pages get the latest site update date
        }

        // 2. Blog Post Dates
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
