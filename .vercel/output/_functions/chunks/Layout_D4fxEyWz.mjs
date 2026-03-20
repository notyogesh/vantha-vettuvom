import { e as createAstro, f as createComponent, r as renderTemplate, o as renderSlot, p as renderHead, u as unescapeHTML, h as addAttribute } from './astro/server_3jlUvdsL.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://vanthavettuvom.com");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "Vantha Vettuvom Salon Franchise Opportunities - Start your luxury salon business today.",
    image = "/hero-salon.png",
    keywords = "salon franchise, beauty salon franchise, vantha vettuvom, salon franchise in india, best salon franchise, low investment franchise, tamil nadu salon franchise",
    additionalSchema = []
  } = Astro2.props;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const socialImageURL = new URL(image, Astro2.site);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://vanthavettuvom.com/#organization",
        "name": "Vantha Vettuvom",
        "url": "https://vanthavettuvom.com",
        "logo": "https://vanthavettuvom.com/logo1.png",
        "description": description,
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Tamil Nadu",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://vanthavettuvom.com/#website",
        "url": "https://vanthavettuvom.com",
        "name": "Vantha Vettuvom",
        "publisher": {
          "@id": "https://vanthavettuvom.com/#organization"
        }
      },
      ...additionalSchema
    ]
  };
  return renderTemplate(_a || (_a = __template(['<html lang="en" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/x-icon" href="/favicon.ico"><meta name="generator"', '><meta name="description"', '><!-- SEO & Open Graph --><meta name="keywords"', '><link rel="canonical"', '><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet"><title>', '</title><!-- Schema.org JSON-LD --><script type="application/ld+json">', "<\/script>", '</head> <body class="bg-gray-950 text-white antialiased selection:bg-gold-500 selection:text-white"> ', " </body></html>"])), addAttribute(Astro2.generator, "content"), addAttribute(description, "content"), addAttribute(keywords, "content"), addAttribute(canonicalURL, "href"), addAttribute(canonicalURL, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(socialImageURL, "content"), addAttribute(canonicalURL, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(socialImageURL, "content"), title, unescapeHTML(JSON.stringify(schema)), renderHead(), renderSlot($$result, $$slots["default"]));
}, "C:/Users/yogesh/Documents/yo/vv2.0/vv/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
