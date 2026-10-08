import { motion } from "framer-motion";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import mirandaPortrait from "@assets/Miranda_Babbitt-380_1771893736120.jpg";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Miranda Babbitt",
  jobTitle: "Client Journey & Conversion Strategist",
  url: "https://renstrategies.ca/about",
  worksFor: { "@type": "Organization", name: "Ren Strategies", url: "https://renstrategies.ca" },
  address: { "@type": "PostalAddress", addressLocality: "Vancouver", addressCountry: "CA" },
  knowsAbout: ["Conversion Optimization", "Website Audits", "Client Journey Strategy", "Marketing Automation", "Inquiry Follow-up Systems"],
};

export default function About() {
  return (
    <div className="pt-32 pb-20">
      <SEO
        title="About Miranda Babbitt"
        description="Miranda Babbitt helps businesses turn website interest into a clearer next step, through strategy, follow-up, and practical systems."
        path="/about"
        keywords="Miranda Babbitt, Ren Strategies, Vancouver website consultant, conversion strategy, website strategist"
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
                I help businesses make the path from first interest to a real conversation feel clearer.
              </p>
              
              <p>
                Based in Vancouver, I started Ren Strategies after watching capable people lose interested customers to ordinary problems: a website that doesn't say what the business does, a form that sits unanswered, tools that don't talk to each other, and too much work done by hand.
              </p>
              
              <p>
                The shape of the work is the same across industries. Someone finds you. They try to tell if you're the right fit. They decide whether to take the next step. I look at that whole path, whether you run a practice, a studio, a consultancy, or another kind of company.
              </p>
              
              <div className="editorial-divider" />
              
              <h2 className="text-3xl mt-12 mb-6">Data meets empathy.</h2>
              
              <p>
                I use conversion strategy, customer research, and simple systems. The goal is to understand what people need to hear before they'll reach out, then build a path that responds at the right time and still leaves room for a person.
              </p>
              
              <p>
                Follow-up should feel useful. Automation should save time, and a human should still show up where one is needed.
              </p>
              
              <p>
                When we work together, you get an honest view of where people get stuck, a short list of what to fix first, and implementation that gives your team time back.
              </p>
            </div>

            <div className="mt-16">
              <Link href="/contact">
                <span className="inline-block border-b border-foreground pb-1 font-semibold tracking-wide hover:text-primary hover:border-primary transition-colors cursor-pointer">
                  Let's find the friction &rarr;
                </span>
              </Link>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
