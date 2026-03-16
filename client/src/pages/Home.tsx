import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import mirandaHero from "@assets/Miranda_Babbitt-103_1773019817151.jpg";
import mirandaPortrait from "@assets/Miranda Babbitt-400.jpg";

import healerImg from "@assets/allison-therapist-template.webp";
import guideImg from "@assets/lara-therapist-template-mockup.webp";
import coachImg from "@assets/elevate-coach-template-mockup.webp";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ren Strategies",
  url: "https://renstrategies.ca",
  logo: "https://renstrategies.ca/favicon.png",
  description: "Website audits and conversion optimization for therapists, coaches, and mission-driven organizations.",
  founder: {
    "@type": "Person",
    name: "Miranda Babbitt",
    jobTitle: "Website Strategist & Conversion Consultant",
  },
  areaServed: "Worldwide",
  priceRange: "$135–$1500+",
  serviceType: ["Website Audit", "Conversion Optimization", "Squarespace Templates"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vancouver",
    addressCountry: "CA",
  },
};

export default function Home() {
  const [selectedFit, setSelectedFit] = useState<string | null>(null);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFitClick = (id: string, sectionId: string) => {
    setSelectedFit(id);
    setTimeout(() => scrollToSection(sectionId), 150);
  };

  return (
    <div className="pt-32 pb-20 overflow-hidden">
      <SEO
        title="Website Audits & Conversion Optimization for Therapists"
        description="Most therapist sites don't come close to capturing who they actually are. Get a website audit, conversion strategy, or Squarespace template designed to fill your calendar."
        path="/"
        keywords="therapist website audit, coaching website optimization, conversion strategy, Squarespace templates for therapists, fill your calendar, website strategy for coaches"
        jsonLd={organizationSchema}
      />

      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-12 mb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 text-foreground"
              data-testid="text-hero-headline"
            >
              Someone just landed on your website.{" "}
              <span className="italic text-primary/90">
                Within seconds they've decided if you feel safe enough to reach out to.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl text-foreground/80 mb-10 font-light leading-relaxed"
            >
              Most therapy and coaching sites lose that visitor before they ever scroll.
              The copy is too careful. The navigation is too complex. The right client lands,
              hesitates, and leaves. I find exactly where that's happening — and fix it.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <Button
                asChild
                size="lg"
                className="rounded-none bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-lg h-auto"
                data-testid="button-hero-cta"
              >
                <Link href="/contact">Book a free discovery call</Link>
              </Button>
              <button
                onClick={() => scrollToSection('templates')}
                className="text-foreground/60 hover:text-foreground font-light text-base cursor-pointer flex items-center gap-2 transition-colors underline underline-offset-4"
                data-testid="button-hero-templates"
              >
                Or start with a template
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 max-w-md mx-auto">
              <img
                src={mirandaHero}
                alt="Miranda Babbitt — Website Strategist"
                className="w-full h-auto object-cover object-top relative z-10"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sound Familiar Section */}
      <section className="container mx-auto px-6 md:px-12 mb-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-foreground/10" />
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-12 pt-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif" data-testid="text-sound-familiar">Sound familiar?</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "\"I just need to get something live.\"",
              desc: "You've been putting it off for months. You know what you do, you just can't find the words — and every week without a website is a week you're not showing up where your clients are looking."
            },
            {
              title: "\"I've had a website for years and I'm embarrassed by it.\"",
              desc: "It doesn't reflect who you are anymore. The copy feels stiff, the design feels dated, and you cringe a little every time you hand someone your card."
            },
            {
              title: "\"I'm growing and my site isn't keeping up.\"",
              desc: "New clinicians, new locations, a press mention you keep meaning to add. Your practice has evolved but your website is frozen in 2019."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-border p-8"
              data-testid={`card-pain-point-${i}`}
            >
              <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
              <p className="text-foreground/70 font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial - Sabrina Sibbald */}
      <section className="py-16 px-6 md:px-12 bg-[#f5f0eb]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-4xl text-center"
        >
          <div className="text-6xl text-primary/30 font-serif mb-6">"</div>
          <h2 className="text-2xl md:text-4xl leading-relaxed font-serif italic mb-10 text-foreground" data-testid="text-testimonial">
            Her insight into the specific therapy space helped me spend my time
            focusing on the part of my job that I love — connecting with and supporting clients in session.
          </h2>
          <p className="text-foreground/50 font-sans text-sm tracking-wide">
            — Sabrina Sibbald, Registered Social Worker (MSW, RSW) and Psychotherapist, Hamilton
          </p>
        </motion.div>
      </section>

      {/* Find Your Fit Section */}
      <section className="bg-[#f0f3ed]/60 px-6 md:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-14"
        >
          <div className="flex items-center gap-6 w-full max-w-xl mb-8">
            <div className="flex-1 h-px bg-foreground/10" />
            <Compass className="w-5 h-5 text-foreground/30" strokeWidth={1.5} />
            <div className="flex-1 h-px bg-foreground/10" />
          </div>
          <p className="font-sans tracking-widest text-sm text-foreground/60 uppercase mb-4">Pick your starting point</p>
          <h2 className="text-3xl md:text-5xl font-serif" data-testid="text-find-your-fit">Find your fit.</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { id: "launch", label: "I need to launch something fast", target: "templates" },
            { id: "redo", label: "My site needs a full redo", target: "custom-build" },
            { id: "unsure", label: "I'm not sure what my site needs", target: "audit-process" },
          ].map((card, i) => (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleFitClick(card.id, card.target)}
              className={`p-8 text-left transition-all duration-300 cursor-pointer border ${
                selectedFit === card.id
                  ? 'border-[#a3b18a] bg-[#a3b18a]/10'
                  : 'border-border hover:border-foreground/30'
              }`}
              data-testid={`button-fit-${card.id}`}
            >
              <h3 className="text-xl md:text-2xl font-serif leading-snug">{card.label}</h3>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="pt-28 pb-20 px-6 md:px-12 container mx-auto relative">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-px bg-foreground/10" />
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <p className="font-sans tracking-widest text-sm text-foreground/60 uppercase mb-4">Squarespace templates</p>
          <h2 className="text-4xl md:text-6xl font-serif mb-6 text-foreground" data-testid="text-templates-heading">Launch without starting from scratch.</h2>
          <p className="text-foreground/70 text-xl font-light max-w-3xl mx-auto">
            Squarespace templates built specifically for therapists and coaches. Grab one and be live this week.
          </p>
        </motion.div>

        <div className="space-y-20 mb-16">
          {[
            {
              name: "Allison",
              slug: "allison",
              desc: "Personal and inviting. For individual brands.",
              bestFor: "Relationship coaches, life coaches, solo therapists",
              price: "$275",
              image: healerImg,
            },
            {
              name: "Lara",
              slug: "lara",
              desc: "Elegant and refined. For solo practitioners.",
              bestFor: "Psychologists, wellness coaches, private therapists",
              price: "$275",
              image: guideImg,
            },
            {
              name: "Elevate",
              slug: "elevate",
              desc: "Polished and professional. For growing practices.",
              bestFor: "Coaches and consultants",
              price: "$145",
              image: coachImg,
            }
          ].map((template, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-20 items-center`}
            >
              <div className="flex-1 w-full overflow-hidden group">
                <div className="w-full h-full overflow-hidden shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="flex-1 max-w-md">
                <div className="flex items-baseline gap-4 mb-4">
                  <h3 className="text-3xl md:text-4xl font-serif text-foreground">{template.name}</h3>
                  <span className="text-xl font-light text-primary">{template.price}</span>
                </div>
                <p className="text-foreground/70 text-lg font-light leading-relaxed mb-3">{template.desc}</p>
                <p className="text-foreground/50 text-sm font-sans tracking-wide mb-8">Best for: {template.bestFor}</p>
                <Button asChild variant="outline" className="rounded-none border-foreground text-foreground px-6 py-4 h-auto hover:bg-foreground hover:text-background transition-colors">
                  <Link href={`/templates#${template.slug}`}>View Details</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="rounded-none border-foreground text-foreground px-10 py-6 h-auto text-xl hover:bg-foreground hover:text-background transition-colors">
            <Link href="/templates">Browse all templates</Link>
          </Button>
        </div>
      </section>

      {/* Testimonial - Abbey Young */}
      <section className="py-16 px-6 md:px-12 bg-[#f0f3ed]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="text-6xl text-primary/30 font-serif mb-6">"</div>
          <h2 className="text-3xl md:text-5xl leading-tight font-serif italic mb-10 text-foreground">
            The final website feels so aligned with who I am and what I want to communicate to my clients.
            It captured me better than I could've imagined.
          </h2>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-secondary/30 rounded-full mb-4 flex items-center justify-center text-foreground font-serif text-xl">
              AY
            </div>
            <p className="font-semibold tracking-wide">Abbey Young</p>
            <p className="text-foreground/60 text-sm">
              Therapist & Private Practice Owner
            </p>
          </div>
        </motion.div>
      </section>


      {/* Custom Build Section */}
      <section id="custom-build" className="py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-12"
          >
            <p className="font-sans tracking-widest text-sm text-foreground/60 uppercase mb-4">Full custom build</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              A site built entirely around your practice — your copy, your brand, your clients.
            </h2>
            <p className="text-foreground/60 text-xl font-light max-w-3xl mb-12">
              We start with an audit so we know exactly what the site needs to say. Then I build it — custom-coded, designed around your brand, written in your clients' language.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { stat: "4–6 weeks", label: "from deposit to launch" },
              { stat: "No monthly fees", label: "your site runs without a Squarespace subscription" },
              { stat: "No dependency", label: "it keeps running whether you work with me or not" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-border p-8"
              >
                <div className="text-3xl md:text-4xl text-primary font-serif mb-2">{item.stat}</div>
                <p className="text-foreground/50 text-sm font-sans tracking-wide">{item.label}</p>
              </motion.div>
            ))}
          </div>

          <Button asChild size="lg" className="rounded-none bg-foreground text-background hover:bg-foreground/90 px-10 py-6 text-lg h-auto">
            <Link href="/contact">Book a discovery call</Link>
          </Button>
        </div>
      </section>

      {/* Audit Process */}
      <section id="audit-process" className="bg-[#e8e6e1] py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-14"
          >
            <p className="font-sans tracking-widest text-sm text-foreground/60 uppercase mb-4">The audit</p>
            <h2 className="text-3xl md:text-4xl mb-4 font-serif">
              The fastest way to know what your site actually needs.
            </h2>
            <p className="text-foreground/60 text-lg font-light max-w-2xl mx-auto">
              $495. Seven business days. You get a recorded walkthrough and a prioritized action plan — no guessing, no generic advice.
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                num: "01",
                title: "We start with what's keeping you up at night",
                desc: "You fill out a brief intake form telling me your goals, where you feel stuck, and who you're trying to reach.",
              },
              {
                num: "02",
                title: "I see your site through fresh eyes",
                desc: "I go through your site step-by-step exactly how your ideal client would, recording my screen the entire time.",
              },
              {
                num: "03",
                title: "You get the uncomfortable truth",
                desc: "No fluff. Just honest, constructive feedback on why your copy isn't landing and your design is causing friction.",
              },
              {
                num: "04",
                title: "A roadmap you can actually use",
                desc: "You receive a prioritized checklist. Do the quick wins this week, save the bigger structural changes for later.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 md:gap-8 items-start"
              >
                <div className="text-primary/60 font-mono text-base md:text-lg font-light pt-0.5">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl mb-2 font-serif text-foreground/80">
                    {step.title}
                  </h3>
                  <p className="text-foreground/60 text-base font-light leading-relaxed max-w-2xl">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="rounded-none bg-foreground text-background hover:bg-foreground/90 px-10 py-6 text-lg h-auto">
              <Link href="/contact">Book the $495 Audit</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="bg-[#e8e6e1] relative overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-10 md:p-16 lg:p-20 space-y-10 relative z-10">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
                  See what it feels like for your website to actually get you clients.
                </h2>
                <Button
                  asChild
                  size="lg"
                  className="rounded-none bg-foreground text-background hover:bg-foreground/90 px-10 py-8 text-xl h-auto w-fit"
                >
                  <Link href="/contact">Book your free discovery call</Link>
                </Button>
              </div>
              <div className="relative h-80 md:h-full min-h-[500px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                <img
                  src={mirandaPortrait}
                  alt="Miranda Babbitt"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 md:px-12 mb-16">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-4" data-testid="text-newsletter-heading">
              Website tips for therapists and coaches — when I have something worth saying.
            </h2>
            <p className="text-foreground/60 text-lg font-light mb-10">
              Copy that doesn't make you cringe. Conversion fixes that don't feel manipulative.
              No set schedule, no filler.
            </p>
            <form
              action="https://mailchi.mp/renstrategies/mailing-list"
              method="POST"
              target="_blank"
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              data-testid="form-newsletter"
            >
              <input
                type="email"
                name="EMAIL"
                placeholder="Your email address"
                required
                className="flex-1 px-5 py-4 border border-border bg-background text-foreground font-light focus:outline-none focus:border-foreground transition-colors"
                data-testid="input-newsletter-email"
              />
              <Button
                type="submit"
                className="rounded-none bg-foreground text-background hover:bg-foreground/90 px-8 py-4 h-auto whitespace-nowrap"
                data-testid="button-newsletter-submit"
              >
                Send me the good stuff
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
