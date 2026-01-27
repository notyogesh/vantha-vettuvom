import { e as createAstro, f as createComponent, h as addAttribute, o as renderHead, p as renderSlot, r as renderTemplate } from './astro/server_C7e3TOl5.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */

const $$Astro = createAstro("https://vanthavettuvom.com");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Vantha Vettuvom Salon Franchise Opportunities - Start your luxury salon business today." } = Astro2.props;
  return renderTemplate`<html lang="en" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/x-icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="description"${addAttribute(description, "content")}><!-- SEO & Open Graph --><meta name="keywords" content="salon franchise, beauty salon franchise, vantha vettuvom, salon franchise in india, best salon franchise, low investment franchise, tamil nadu salon franchise"><link rel="canonical" href="https://vanthavettuvom.com/"><meta property="og:type" content="website"><meta property="og:url" content="https://vanthavettuvom.com/"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image" content="https://vanthavettuvom.com/hero-salon.png"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url" content="https://vanthavettuvom.com/"><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image" content="https://vanthavettuvom.com/hero-salon.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet"><title>${title}</title>${renderHead()}</head> <body class="bg-gray-950 text-white antialiased selection:bg-gold-500 selection:text-white"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/yogesh/Documents/yo/vv2.0/vv/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
