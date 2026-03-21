import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import SEO from "@/components/SEO";

const servicesJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "The Website Audit",
    provider: { "@type": "Organization", name: "Ren Strategies" },
    description: "A 20-minute recorded walkthrough of your site with page-by-page analysis, plain-English copy feedback, and a prioritized action plan.",
    offers: {
      "@type": "Offer",
      price: "495",
      priceCurrency: "CAD",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "495", priceCurrency: "CAD", unitText: "flat fee" },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you build websites from scratch?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. I can build a complete custom site, typically after an audit so we know exactly what it needs to say before we build it." },
      },
      {
        "@type": "Question",
        name: "What platforms do you work with?",
        acceptedAnswer: { "@type": "Answer", text: "I can audit any site regardless of platform. For implementation on an existing site, I work in WordPress and Squarespace. For new builds, I build custom-coded sites from scratch." },
      },
      {
        "@type": "Question",
        name: "How long does an audit take?",
        acceptedAnswer: { "@type": "Answer", text: "Once you book and fill out the intake form, you'll receive your recorded video and action plan within 7 business days." },
      },
      {
        "@type": "Question",
        name: "What if I can't implement the changes myself?",
        acceptedAnswer: { "@type": "Answer", text: "I offer implementation as a follow-on service. Book a discovery call after your audit and we'll scope it out." },
      },
    ],
  },
];

export default function Services() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="pt-32 pb-20">
      <SEO
        title="Services & Pricing"
        description="Website audit for $495 flat fee. Conversion strategy from $1,500. Clear, transparent pricing for therapists and coaches who want their website to actually convert."
        path="/services"
        keywords="website audit pricing, therapist website audit, conversion strategy, UX audit, website optimization for therapists, coaching website review"
        jsonLd={servicesJsonLd}
      />

      {/* Hero */}
      <section className="container mx-auto px-6 md:px-12 mb-20 text-center max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-sans tracking-widest text-sm text-foreground/50 uppercase mb-6"
        >
          For therapists, coaches &amp; mission-driven organizations
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-5xl md:text-7xl mb-8"
        >
          You're getting referrals.{" "}
          <span className="italic text-primary/90">Your site's losing them.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-foreground/70 font-light leading-relaxed max-w-2xl mx-auto"
        >
          I find exactly where the friction is. Then I fix it. Flat fees, clear scope, 7-day turnaround.
        </motion.p>
      </section>

      {/* Signature Service: The Audit */}
      <section className="bg-card text-card-foreground py-24 px-6 md:px-12 mb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="inline-block border border-primary/50 text-primary px-4 py-1 rounded-full text-sm tracking-wider font-mono mb-8">
                SIGNATURE SERVICE
              </div>
              <h2 className="text-4xl md:text-5xl mb-6">The Website Audit</h2>
              <p className="text-xl text-primary font-serif mb-8">$495 CAD — flat fee</p>

              <p className="text-card-foreground/80 text-lg font-light leading-relaxed mb-4">
                You don't need a $10,000 redesign.
              </p>
              <p className="text-card-foreground/80 text-lg font-light leading-relaxed mb-10">
                You need someone to point out where the friction is. I go through your site exactly
                the way your ideal client would — and record everything I see. You get a plain-English
                breakdown of why visitors aren't turning into inquiries, and a prioritized plan to fix it.
              </p>

              <Button asChild size="lg" className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6">
                <Link href="/contact">Book This Service</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-background/5 border border-white/10 p-10"
            >
              <h3 className="text-2xl font-serif mb-8 border-b border-white/10 pb-4">What you get:</h3>
              <ul className="space-y-6">
                {[
                  "A 20-minute recorded walkthrough: what's working, what isn't, and why",
                  "Page-by-page review of your homepage, services, and about pages",
                  "Copy feedback using your clients' own language — not marketing jargon",
                  "Every spot where a visitor gets confused or gives up",
                  "A prioritized Notion action plan: what to fix first, what to skip",
                  "One week of email Q&A while you implement",
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <Check className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <span className="font-light text-card-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial — right after the audit, before other services */}
      <section className="py-16 px-6 md:px-12 bg-[#f5f0eb] mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-4xl"
        >
          <div className="text-5xl text-primary/30 font-serif mb-4">"</div>
          <p className="text-2xl md:text-3xl leading-relaxed font-serif italic mb-6 text-foreground" data-testid="text-services-testimonial">
            She helped me clarify who I am as a clinician and how I want to show up for clients.
            I found my voice and launched my practice with confidence.
          </p>
          <p className="text-foreground/50 font-sans text-sm tracking-wide">
            — Jason Ryant, Registered Clinical Counsellor, Vancouver BC
          </p>
        </motion.div>
      </section>

      {/* Additional Services */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-sans tracking-widest text-sm text-foreground/50 uppercase mb-3">Beyond the audit</p>
          <h2 className="text-3xl md:text-4xl">Need more than a roadmap?</h2>
          <p className="text-foreground/60 font-light leading-relaxed mt-4 max-w-2xl">
            If you need a new site, I do custom website design too. Strategy first, then a build that fits your practice and makes it easy to book.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-border p-10 flex flex-col"
          >
            <h3 className="text-3xl font-serif mb-2">Conversion Strategy</h3>
            <p className="text-foreground/50 font-mono text-sm mb-3">$1,500 – $3,500 CAD depending on scope</p>
            <p className="text-primary/80 text-sm font-semibold mb-6 tracking-wide">
              For you if: you're launching something new, rebranding, or the audit revealed you need to rethink what your site says before touching how it looks.
            </p>
            <p className="font-light leading-relaxed mb-4 flex-1">
              Deeper than an audit. We start with research: customer interviews, survey analysis,
              and a clear picture of what your audience needs to hear before they'll reach out.
              You get wireframes and copy strategy built around that — so when it's time to build
              or rewrite, nothing is guesswork.
            </p>
            <p className="text-foreground/50 text-sm font-light mb-8">
              Scope varies based on the number of service lines and depth of research needed.
              Book a call and I'll give you a firm number within 24 hours.
            </p>
            <Link href="/contact">
              <span className="text-primary hover-underline font-semibold tracking-wide cursor-pointer">Book a discovery call &rarr;</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="border border-border p-10 flex flex-col"
          >
            <h3 className="text-3xl font-serif mb-2">Custom Website Design</h3>
            <p className="text-foreground/50 font-mono text-sm mb-3">CUSTOM PRICING</p>
            <p className="text-primary/80 text-sm font-semibold mb-6 tracking-wide">
              For you if: you want a site built for you, or you have an audit (or already know what needs fixing) but no time, or no desire, to touch your website yourself.
            </p>
            <p className="font-light leading-relaxed mb-4 flex-1">
              I either implement your audit recommendations on your existing site, or design and build something new from scratch. Either way, you get a flat-fee quote before anything starts.
            </p>
            <p className="text-foreground/50 text-sm font-light mb-8">
              For existing sites, I work in WordPress and Squarespace. For new builds, I design and build custom-coded sites from scratch.
            </p>
            <Link href="/contact">
              <span className="text-primary hover-underline font-semibold tracking-wide cursor-pointer">Book a discovery call &rarr;</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why it works — brief proof section */}
      <section className="bg-[#f0f3ed]/60 py-20 px-6 md:px-12 mb-0">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="font-sans tracking-widest text-sm text-foreground/50 uppercase mb-3">Why it works</p>
            <h2 className="text-3xl md:text-4xl font-serif">Not vibes. Not trends. Research.</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                heading: "I specialize in one niche.",
                body: "Therapists, coaches, and mission-driven organizations. That means I already know the objections your visitors have, the language that converts, and the trust signals that matter.",
              },
              {
                heading: "Every recommendation is prioritized.",
                body: "You get a ranked action plan — not a 40-point list that paralyzes you. The highest-impact changes come first so you see results without overhauling everything.",
              },
              {
                heading: "You keep the roadmap forever.",
                body: "Your Notion action plan doesn't expire. Whether you implement it yourself or bring me in, you have a clear picture of exactly what your site needs.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-border p-8 bg-background/50"
              >
                <h3 className="text-xl font-serif mb-3">{item.heading}</h3>
                <p className="text-foreground/70 font-light leading-relaxed text-sm">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#e8e6e1] py-24 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl text-center mb-16">Frequently Asked Questions</h2>

          <div className="space-y-12">
            {[
              {
                q: "Do you build websites from scratch?",
                a: "Yes. I can build a complete custom site, typically after an audit so we know exactly what it needs to say before we build it. I've built custom-coded sites for clients on Netlify, and I'm comfortable with Squarespace and Webflow builds too.",
              },
              {
                q: "What platforms do you work with?",
                a: "I can audit any site regardless of platform — WordPress, Squarespace, Wix, Webflow, custom builds. For implementation on an existing site, I work in WordPress and Squarespace. If you need a new site built from scratch, I build custom-coded sites.",
              },
              {
                q: "How long does an audit take?",
                a: "Once you book and fill out the intake form, you'll have your recorded video and action plan within 7 business days.",
              },
              {
                q: "What if I can't implement the changes myself?",
                a: "Book a discovery call after you receive your audit. We'll go through your action plan together, scope what needs doing, and I'll give you a flat-fee quote to implement it.",
              },
            ].map((faq, i) => (
              <div key={i} className="border-b border-foreground/10 pb-8">
                <h3 className="text-2xl font-serif mb-4">{faq.q}</h3>
                <p className="text-foreground/70 font-light leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 md:px-12 text-center">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              See what a 7-day turnaround looks like.
            </h2>
            <p className="text-foreground/60 text-lg font-light mb-10">
              Book the audit. Get your video and action plan in a week. Start fixing the friction.
            </p>
            <Button asChild size="lg" className="rounded-none bg-foreground text-background hover:bg-foreground/90 px-10 py-6 text-lg h-auto">
              <Link href="/contact">Book the $495 Audit</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
