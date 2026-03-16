import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

export default function Lynda() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="pt-32 pb-20">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Your Website Should Be Your Best Employee | Ren Strategies</title>
      </Helmet>
      <section className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="mb-16"
        >
          <div className="inline-block border border-primary/50 text-primary px-4 py-1 rounded-full text-sm tracking-wider font-mono mb-8">
            FOR LYNDA
          </div>
          <h1 className="text-5xl md:text-7xl mb-8 leading-tight">
            Your website should be your <span className="italic text-primary">best employee.</span>
          </h1>
          <p className="text-xl text-foreground/70 font-light leading-relaxed">
            Lynda, I've put together this dedicated space to show you exactly how we can transform your current site into a high-converting client generator. 
          </p>
        </motion.div>

        <div className="editorial-divider" />

        <div className="grid md:grid-cols-2 gap-16 items-start mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-serif">The Opportunity</h2>
            <p className="text-foreground/80 font-light leading-relaxed">
              Based on our initial look, your site has a strong foundation but is currently leaking potential clients at the "Consideration" stage. Visitors are interested, but they're not quite sure what the next step is.
            </p>
            <ul className="space-y-4">
              {[
                "Clarity on your primary offering",
                "Reduced friction in the booking flow",
                "Copy that speaks directly to pain points",
                "Strategic placement of social proof"
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-center text-foreground/70">
                  <CheckCircle2 size={18} className="text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card p-10 text-card-foreground"
          >
            <h3 className="text-2xl font-serif mb-6">Recommended Next Step</h3>
            <p className="text-card-foreground/70 font-light mb-8">
              A **Signature Website Audit** will provide the roadmap for these changes.
            </p>
            <div className="text-4xl font-serif mb-8 text-primary">$495 <span className="text-sm font-sans text-card-foreground/50 uppercase tracking-widest">Flat Fee</span></div>
            <Button asChild className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg">
              <Link href="/contact">Get Started, Lynda</Link>
            </Button>
          </motion.div>
        </div>

        <section className="bg-[#e8e6e1] -mx-6 md:-mx-12 px-6 md:px-12 py-20 mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-8">What you'll get from the audit:</h2>
            <div className="grid sm:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <h4 className="font-serif text-xl">45-Min Video Teardown</h4>
                <p className="text-foreground/70 font-light">I'll walk through your site exactly as a prospective client would, highlighting every point of friction.</p>
              </div>
              <div className="space-y-4">
                <h4 className="font-serif text-xl">Prioritized Action Plan</h4>
                <p className="text-foreground/70 font-light">A checklist of "Quick Wins" you can implement today, and a strategy for long-term growth.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center">
          <p className="text-foreground/60 italic mb-8">"I'm ready when you are."</p>
          <Link href="/contact">
            <span className="inline-block border-b border-foreground pb-1 font-semibold tracking-wide hover:text-primary hover:border-primary transition-colors cursor-pointer text-xl">
              Book your audit now &rarr;
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}