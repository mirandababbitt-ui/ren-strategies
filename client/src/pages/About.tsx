import { motion } from "framer-motion";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import mirandaPortrait from "@assets/Miranda_Babbitt-380_1771893736120.jpg";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Miranda Babbitt",
  jobTitle: "Website Strategist & Conversion Consultant",
  url: "https://renstrategies.ca/about",
  worksFor: { "@type": "Organization", name: "Ren Strategies", url: "https://renstrategies.ca" },
  address: { "@type": "PostalAddress", addressLocality: "Vancouver", addressCountry: "CA" },
  knowsAbout: ["Conversion Optimization", "Website Audits", "Copywriting", "UX Design", "Squarespace"],
};

export default function About() {
  return (
    <div className="pt-32 pb-20">
      <SEO
        title="About Miranda Babbitt"
        description="Hi, I'm Miranda. I help therapists, coaches, and mission-driven organizations stop guessing why their website isn't working. Based in Vancouver, combining data with empathy."
        path="/about"
        keywords="Miranda Babbitt, Ren Strategies, Vancouver website consultant, conversion copywriting, website strategist for therapists"
        jsonLd={personSchema}
      />
      <section className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-16 items-start">
          
          {/* Image/Visual side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-5 relative"
          >
            <div className="aspect-[3/4] bg-card overflow-hidden relative shadow-xl">
              {/* Actual headshot */}
              <img 
                src={mirandaPortrait} 
                alt="Miranda Babbitt"
                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-primary/10 mix-blend-multiply pointer-events-none" />
            </div>
            
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#e8e6e1] -z-10" />
          </motion.div>

          {/* Content side */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-7 pt-8 md:pl-8"
          >
            <h1 className="text-5xl md:text-7xl mb-10">
              Hi, I'm Miranda.
            </h1>
            
            <div className="prose prose-lg prose-p:font-light prose-p:text-foreground/80 prose-p:leading-relaxed prose-headings:font-serif">
              <p className="text-2xl font-serif text-foreground mb-8">
                I help therapists, coaches, and mission-driven organizations stop guessing why their website isn't working.
              </p>
              
              <p>
                Based in Vancouver, I started Ren Strategies after watching too many incredibly talented professionals struggle to communicate their value online. 
              </p>
              
              <p>
                You've spent years honing your craft. You know exactly how to hold space for your clients and guide them to breakthroughs. But when it comes to your website, you're stuck relying on generic templates and vague copy like "empowering you to live your best life."
              </p>
              
              <div className="editorial-divider" />
              
              <h2 className="text-3xl mt-12 mb-6">Data meets empathy.</h2>
              
              <p>
                My approach is rooted in conversion copywriting principles (shoutout to Joanna Wiebe) combined with a deep respect for the sensitive nature of your work.
              </p>
              
              <p>
                I don't believe in aggressive sales tactics or manipulative countdown timers. I believe in using voice-of-customer research to find the exact words your prospects are already using to describe their pain, and reflecting that back to them in a clean, frictionless user journey.
              </p>
              
              <p>
                When we work together, you get the uncomfortable truth about why your site isn't converting, but you get it from someone who genuinely wants your mission to succeed.
              </p>
            </div>

            <div className="mt-16">
              <Link href="/contact">
                <span className="inline-block border-b border-foreground pb-1 font-semibold tracking-wide hover:text-primary hover:border-primary transition-colors cursor-pointer">
                  Let's chat about your site &rarr;
                </span>
              </Link>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}