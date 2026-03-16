# Ren Strategies - Website for Miranda Babbitt

## Overview
Professional, editorial-style website for Ren Strategies — Miranda Babbitt's website audit and conversion optimization consultancy targeting therapists, coaches, and mission-driven organizations.

## Tech Stack
- React 19, TypeScript, Vite, Tailwind v4
- wouter (routing), framer-motion (animations), react-hook-form + zod (forms)
- react-helmet-async (per-page SEO meta tags)
- lucide-react (icons)
- Formspree for contact form (https://formspree.io/f/mojnyezd)
- Google Analytics 4 (G-CVYRJYPPP2)

## Architecture
- Static site, no backend database needed
- Build outputs to `dist/public`
- Image assets: Use `@assets/` alias (Vite) to import from `attached_assets/`
- Color tokens use raw `H S% L%` format in CSS (Tailwind v4 `@theme inline`)

## Pages & Routes
| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home.tsx | Landing page with hero, pain points, two paths, testimonial, audit process, stats, templates preview |
| `/services` | Services.tsx | Pricing ($495 audit, $1500+ strategy, custom implementation), FAQ |
| `/about` | About.tsx | Miranda's bio, approach, headshot |
| `/contact` | Contact.tsx | Formspree contact form + Calendly link |
| `/templates` | Templates.tsx | 5 Squarespace templates catalog (Cedar Grove, Elevate, Lara, Mountains, Allison) |
| `/lynda` | Lynda.tsx | Personalized landing page for prospect |

## SEO Implementation
- **react-helmet-async**: Dynamic per-page title, description, keywords, canonical URLs, Open Graph, Twitter Cards
- **Structured Data (JSON-LD)**: ProfessionalService (home), Service + FAQPage (services), Person (about), ItemList/Product (templates)
- **sitemap.xml**: Lists all public pages at `client/public/sitemap.xml`
- **robots.txt**: Allows all crawlers, points to sitemap
- **SEO Component**: Reusable `client/src/components/SEO.tsx`

## Key Files
- `client/index.html` - Base HTML with GA4, favicon, fallback meta tags
- `client/src/components/SEO.tsx` - Reusable SEO component with JSON-LD support
- `client/src/components/layout/Navbar.tsx` - Navigation
- `client/src/components/layout/Footer.tsx` - Footer with social links
- `client/public/sitemap.xml` - XML sitemap
- `client/public/robots.txt` - Robots file

## Design
- Editorial/luxury aesthetic: sharp corners (border-radius: 0), generous whitespace
- Fonts: Cormorant Garamond (serif), Nunito Sans (sans)
- Grayscale-to-color hover effect on photos
- Framer Motion entrance animations

## Domain
- Primary: renstrategies.ca
- Deployed via Replit autoscale
