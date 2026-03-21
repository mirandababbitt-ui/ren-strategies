import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";

// Import images
import cedar1 from "@assets/cedar-1.png";
import cedar2 from "@assets/cedar-2.png";
import cedar3 from "@assets/cedar-3.png";
import cedar4 from "@assets/cedar-4.png";

import elevate1 from "@assets/elevate-1.png";
import elevate2 from "@assets/elevate-2.png";
import elevate3 from "@assets/elevate-3.png";
import elevate4 from "@assets/elevate-4.png";

import lara1 from "@assets/lara-1.png";
import lara2 from "@assets/lara-2.png";
import lara3 from "@assets/lara-3.png";
import lara4 from "@assets/lara-4.png";

import mountains1 from "@assets/mountains-1.png";
import mountains2 from "@assets/mountains-2.png";
import mountains3 from "@assets/mountains-3.png";
import mountains4 from "@assets/mountains-4.png";

import allison1 from "@assets/allison-1.png";
import allison2 from "@assets/allison-2.png";
import allison3 from "@assets/allison-3.png";
import allison4 from "@assets/allison-4.png";

const templates = [
  {
    id: "cedar-grove",
    name: "Cedar Grove",
    description: "Warm and grounding. For solo practices.",
    bestFor: "Therapists in private practice, coaches, counsellors",
    price: "$135",
    images: [cedar1, cedar2, cedar3, cedar4],
    etsyUrl: "https://www.etsy.com/ca/listing/4317044832/one-page-therapist-website-squarespace",
    demoUrl: "https://ranunculus-cheetah-t2zz.squarespace.com/",
  },
  {
    id: "elevate",
    name: "Elevate",
    description: "Polished and professional. For growing practices.",
    bestFor: "Coaches and consultants",
    price: "$145",
    images: [elevate1, elevate2, elevate3, elevate4],
    etsyUrl: "https://www.etsy.com/ca/listing/4319743191/business-coach-website-squarespace-71",
    demoUrl: "https://iguana-harpsichord-65aw.squarespace.com/",
  },
  {
    id: "lara",
    name: "Lara",
    description: "Elegant and refined. For solo practitioners.",
    bestFor: "Psychologists, wellness coaches, private therapists",
    price: "$275",
    images: [lara1, lara2, lara3, lara4],
    etsyUrl: "https://www.etsy.com/ca/listing/4307898607/therapist-website-template-full-practice?ref=listings_manager_grid",
    demoUrl: "https://lara-therapist-template-mockup.webp", // Placeholder as none provided for lara specifically in text
  },
  {
    id: "mountains",
    name: "Mountains",
    description: "Open and airy. For modern practitioners.",
    bestFor: "Mindfulness coaches, yoga therapists, holistic health",
    price: "$275",
    images: [mountains1, mountains2, mountains3, mountains4],
    etsyUrl: "https://www.etsy.com/ca/listing/4316858777/therapist-website-regulation-ready?ref=listings_manager_grid",
    demoUrl: "https://aqua-rhombus-rm2w.squarespace.com/",
  },
  {
    id: "allison",
    name: "Allison",
    description: "Personal and inviting. For individual brands.",
    bestFor: "Relationship coaches, life coaches, solo therapists",
    price: "$275",
    images: [allison1, allison2, allison3, allison4],
    etsyUrl: "https://www.etsy.com/ca/listing/4390162912/trauma-informed-therapist-website-warm?ref=listings_manager_grid",
    demoUrl: "https://glockenspiel-pigeon-hccr.squarespace.com",
  },
];

const features = [
  "Homepage, services, about, and contact pages already laid out",
  "Clear sections for fees, approaches, and who you work with",
  "Copy prompts written specifically for therapists and coaches",
  "Step-by-step setup guide so you always know what to do next",
  "Mobile-optimized layout that looks good on any device",
  "Light email support if you get stuck",
];

export default function Templates() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const templatesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Squarespace Templates for Therapists & Coaches",
    description: "Professional Squarespace website templates designed specifically for therapists, coaches, and wellness practitioners.",
    itemListElement: templates.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: t.name,
        description: `${t.description} Best for: ${t.bestFor}`,
        offers: { "@type": "Offer", price: t.price.replace("$", ""), priceCurrency: "USD", availability: "https://schema.org/InStock" },
      },
    })),
  };

  return (
    <div className="pt-32 pb-20">
      <SEO
        title="Squarespace Templates for Therapists & Coaches"
        description="Professional Squarespace website templates designed for therapists, coaches, and wellness practitioners. Calm design, clear structure, easy to customize. Starting at $135."
        path="/templates"
        keywords="Squarespace templates for therapists, therapist website template, coaching website template, wellness practitioner website, Squarespace website design"
        jsonLd={templatesJsonLd}
      />
      {/* Hero */}
      <section className="container mx-auto px-6 md:px-12 mb-20">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl mb-8 font-serif">Launch a therapist website this week.</h1>
          <p className="text-xl text-foreground/70 font-light leading-relaxed">
            Squarespace templates built for therapists and coaches. No staring at a blank page, no guessing what sections you need — just a site that already knows how your practice works.
          </p>
        </motion.div>
      </section>

      {/* Anchor Nav */}
      <nav className="sticky top-20 z-40 bg-background/80 backdrop-blur-md border-y border-border/50 py-4 mb-20 overflow-x-auto">
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-start md:justify-center gap-8 whitespace-nowrap">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => scrollToSection(t.id)}
              className="text-sm tracking-widest uppercase hover:text-primary transition-colors font-sans"
            >
              {t.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Who these are for */}
      <section className="container mx-auto px-6 md:px-12 mb-32 text-center max-w-2xl">
        <motion.p
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed italic"
        >
          These templates are for therapists and coaches who want a site that looks professional, feels like them, and doesn't require 40 hours to set up. Follow the prompts, add your words and photos, and publish when you're ready.
        </motion.p>
      </section>

      {/* What every template includes */}
      <section className="bg-[#e8e6e1] py-24 px-6 md:px-12 mb-32">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">Included in every template:</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <span className="text-lg font-light">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Sections */}
      <div className="space-y-48 mb-32">
        {templates.map((template, i) => (
          <section
            key={template.id}
            id={template.id}
            className="container mx-auto px-6 md:px-12 scroll-mt-32"
          >
            <div className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-20 items-start`}>
              <div className="flex-1 w-full space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {template.images.map((img, idx) => (
                    <div key={idx} className="aspect-[4/3] bg-foreground/5 shadow-sm border border-border overflow-hidden flex items-start">
                      <img src={img} alt={`${template.name} preview ${idx + 1}`} className="w-full h-full object-cover object-top" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 max-w-md pt-4">
                <h2 className="text-4xl md:text-6xl font-serif mb-4 leading-tight">{template.name}</h2>
                <p className="text-xl text-primary font-serif italic mb-2">{template.description}</p>
                <p className="text-foreground/60 text-sm tracking-wide uppercase mb-8">Best for: {template.bestFor}</p>
                <div className="text-3xl font-serif mb-8">{template.price}</div>
                <div className="flex flex-col gap-4">
                  <Button asChild size="lg" className="rounded-none bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-lg h-auto">
                    <a href={template.etsyUrl} target="_blank" rel="noopener noreferrer">Get this template</a>
                  </Button>
                  <div className="space-y-2">
                    <a href={template.demoUrl} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors font-semibold flex items-center gap-2">
                      Preview demo <ArrowRight size={18} />
                    </a>
                    <p className="text-xs text-foreground/50 italic">Password: demo</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* How it works */}
      <section className="bg-card text-card-foreground py-32 px-6 md:px-12 mb-32">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl mb-20 text-center font-serif">How it works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                num: "01",
                title: "Choose your template",
                desc: "Pick the design that feels most like you."
              },
              {
                num: "02",
                title: "Get instant access",
                desc: "You'll receive the template link and setup guide right away."
              },
              {
                num: "03",
                title: "Add your content",
                desc: "Follow the guided checklist to add your words, photos, and colors. Most therapists can be live in a weekend."
              }
            ].map((step, i) => (
              <div key={i} className="space-y-6">
                <div className="text-primary font-mono text-2xl font-light">{step.num}</div>
                <h3 className="text-2xl font-serif">{step.title}</h3>
                <p className="text-card-foreground/70 font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 md:px-12 mb-32 text-center">
        <div className="max-w-2xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-5xl font-serif leading-tight">Not sure which one to pick?</h2>
          <p className="text-xl text-foreground/70 font-light">Book a free discovery call and I'll help you choose.</p>
          <Button asChild size="lg" className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-8 text-xl h-auto">
            <Link href="/contact">Book a call</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
