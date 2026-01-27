import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_C7e3TOl5.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DfA_7yxX.mjs';
import { p as posts } from '../chunks/posts_BYDZsSp_.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const title = "Blog - Vantha Vettuvom Salon Franchise";
  const description = "Latest news, insights, and franchise updates from Tamil Nadu's leading salon brand.";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<nav class="absolute top-0 left-0 w-full z-50 py-6 px-6 lg:px-12 flex justify-between items-center bg-gray-950/80 backdrop-blur-md border-b border-white/5"> <a href="/" class="block w-32 md:w-40 grayscale brightness-0 invert opacity-90 hover:opacity-100 transition duration-300"> <img src="/logo1.png" alt="Vantha Vettuvom Logo" class="w-full h-auto"> </a> <a href="/" class="text-gray-400 hover:text-white transition text-sm uppercase tracking-widest font-medium">Back to Home</a> </nav> <section class="pt-32 pb-24 px-6 md:px-12 min-h-screen bg-gray-950"> <div class="container mx-auto"> <div class="text-center mb-16"> <span class="text-gold-500 font-medium tracking-[0.2em] uppercase text-sm">Our Blog</span> <h1 class="text-4xl md:text-6xl font-display font-medium text-white mt-4">
Latest <span class="text-gold-400">Insights</span> </h1> </div> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> ${posts.map((post) => renderTemplate`<a${addAttribute(`/blog/${post.slug}`, "href")} class="group bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-gold-500/50 transition duration-500 block h-full"> <div class="h-48 bg-gray-900 border-b border-white/5 flex items-center justify-center relative overflow-hidden"> <div class="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50"></div> <span class="text-5xl font-display text-white/5 group-hover:text-gold-500/10 transition duration-500 transform group-hover:scale-110">
VV
</span> </div> <div class="p-8"> <span class="text-gold-500 text-xs font-bold uppercase tracking-widest"> ${post.date} </span> <h2 class="text-2xl font-display text-white mt-3 mb-3 group-hover:text-gold-400 transition leading-tight"> ${post.title} </h2> <p class="text-gray-400 text-sm line-clamp-3 leading-relaxed mb-6"> ${post.excerpt} </p> <div class="flex items-center text-gold-400 text-sm font-medium mt-auto">
Read Article${" "} <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2 group-hover:translate-x-1 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </div> </div> </a>`)} </div> </div> </section> <footer class="bg-black py-12 border-t border-white/5 text-center"> <p class="text-gray-600 text-xs tracking-wider">
© ${(/* @__PURE__ */ new Date()).getFullYear()} VANTHA VETTUVOM SALON. ALL RIGHTS RESERVED.
</p> </footer> ` })}`;
}, "C:/Users/yogesh/Documents/yo/vv2.0/vv/src/pages/blog/index.astro", void 0);

const $$file = "C:/Users/yogesh/Documents/yo/vv2.0/vv/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
