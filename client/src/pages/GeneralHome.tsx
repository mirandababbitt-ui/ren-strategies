import { ArrowDownRight, ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ren Strategies",
  url: "https://renstrategies.ca",
  logo: "https://renstrategies.ca/favicon.png",
  description:
    "Website strategy, website audits, conversion optimization, audience research and copy, and Squarespace websites.",
  founder: {
    "@type": "Person",
    name: "Miranda Babbitt",
    jobTitle: "Website Strategist & Conversion Consultant",
  },
  areaServed: "Worldwide",
  serviceType: [
    "Website Audit",
    "Conversion Optimization",
    "Audience Research",
    "Website Copywriting",
    "Squarespace Websites",
  ],
};

const services = [
  {
    number: "01",
    title: "Website audits",
    copy: "A fresh, careful look at the words, journeys, and friction points keeping your site from doing its job.",
  },
  {
    number: "02",
    title: "Conversion optimization",
    copy: "Make it easier for the right people to understand what you do and take a useful next step.",
  },
  {
    number: "03",
    title: "Audience research & copy",
    copy: "Get closer to the language your audience already uses, then make your message clearer and more specific.",
  },
  {
    number: "04",
    title: "Squarespace websites",
    copy: "Thoughtful Squarespace websites and templates that give your message a clear, considered home.",
  },
];

export default function GeneralHome() {
  return (
    <div className="pt-32 pb-20 overflow-hidden">
      <SEO
        title="Website Strategy & Conversion Consulting"
        description="Ren Strategies helps organizations make their websites work as part of a wider marketing system through website audits, conversion optimization, audience research and copy, and Squarespace websites."
        path="/"
        keywords="website strategy, website audit, conversion optimization, audience research, conversion copywriting, Squarespace websites, Ren Strategies"
        jsonLd={organizationSchema}
      />

      <section className="container mx-auto px-6 md:px-12 mb-28">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 items-center">
          <div className="max-w-3xl">
            <p className="font-sans tracking-[0.2em] text-xs text-foreground/55 uppercase mb-7">
              Website strategy with the bigger picture in view
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.06] mb-8 text-foreground">
              Your website is part of a <span className="italic text-primary">whole system.</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/75 mb-10 font-light leading-relaxed max-w-2xl">
              The best website work starts before the homepage. It connects what
              you know about your audience to what you say, what your pages do,
              and how people find their way to you.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Button
                asChild
                size="lg"
                className="rounded-none bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-base h-auto"
              >
                <Link href="/services">Explore services</Link>
              </Button>
              <Link
                href="/about"
                className="hover-underline text-foreground font-semibold flex items-center gap-2"
              >
                Meet Miranda <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="relative max-w-lg w-full mx-auto lg:ml-auto">
            <div className="bg-[#e8e6e1] p-7 md:p-10 min-h-[390px] flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-foreground/15 pb-4">
                <span className="font-sans text-xs tracking-[0.16em] uppercase text-foreground/55">
                  The connected picture
                </span>
                <span className="font-mono text-xs text-foreground/45">01—04</span>
              </div>
              <div className="space-y-3 py-9">
                {[
                  ["Audience", "What matters to them?"],
                  ["Message", "What do they need to hear?"],
                  ["Website", "Where does it all come together?"],
                  ["Next step", "What should happen from here?"],
                ].map(([label, detail], index) => (
                  <div
                    key={label}
                    className={`flex items-center gap-4 border-b border-foreground/10 pb-3 ${
                      index === 2 ? "pl-5 border-l-2 border-l-primary" : ""
                    }`}
                  >
                    <span className="font-mono text-xs text-primary">0{index + 1}</span>
                    <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                      <span className="font-serif text-xl">{label}</span>
                      <span className="text-xs text-foreground/55 font-light">{detail}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-foreground/60 font-light">
                A more useful website begins with a clearer view of the whole journey.
              </p>
            </div>
            <ArrowDownRight
              aria-hidden="true"
              className="absolute -bottom-7 -right-5 w-12 h-12 text-primary/70"
              strokeWidth={1}
            />
          </div>
        </div>
      </section>

      <section className="bg-card text-card-foreground py-20 md:py-24 px-6 md:px-12 mb-28">
        <div className="container mx-auto grid md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-20 items-start">
          <div>
            <p className="font-sans tracking-[0.18em] text-xs text-primary uppercase mb-5">
              Not just a prettier homepage
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              A website has a job to do.
            </h2>
          </div>
          <div className="space-y-6 max-w-2xl">
            <p className="text-card-foreground/80 text-xl md:text-2xl font-serif leading-relaxed">
              It needs to meet the right people, help them understand why you
              matter, and make the next step feel clear.
            </p>
            <p className="text-card-foreground/65 font-light leading-relaxed">
              That only works when the pieces agree with each other. Audience
              insight shapes the message. The message gives the pages direction.
              And the pages guide visitors toward a meaningful action. Ren
              Strategies looks at those connections—not just the surface.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-12 mb-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-sans tracking-[0.18em] text-xs text-foreground/55 uppercase mb-4">
              Where we can start
            </p>
            <h2 className="text-4xl md:text-5xl font-serif">The work, in practice.</h2>
          </div>
          <Link
            href="/services"
            className="hover-underline text-foreground font-semibold inline-flex items-center gap-2"
          >
            See services & pricing <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 border-t border-l border-border">
          {services.map((service) => (
            <article
              key={service.number}
              className="min-h-[220px] p-7 md:p-9 border-r border-b border-border flex flex-col justify-between"
            >
              <div className="flex justify-between items-start gap-5">
                <h3 className="text-2xl md:text-3xl font-serif">{service.title}</h3>
                <span className="font-mono text-xs text-primary pt-2">{service.number}</span>
              </div>
              <p className="text-foreground/65 font-light leading-relaxed max-w-md mt-8">
                {service.copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f0f3ed]/70 px-6 md:px-12 py-20 md:py-24 mb-28">
        <div className="container mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          <div>
            <p className="font-sans tracking-[0.18em] text-xs text-foreground/55 uppercase mb-5">
              Start with what you know
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-6">
              Clear thinking before more marketing.
            </h2>
            <p className="text-foreground/70 font-light text-lg leading-relaxed">
              A focused audit can show you what is already working, where
              visitors get stuck, and which changes are worth making first.
            </p>
          </div>
          <ul className="space-y-5">
            {[
              "Understand your website from a visitor's point of view.",
              "Find unclear messaging and avoidable friction.",
              "Leave with a prioritized, practical roadmap.",
            ].map((point) => (
              <li key={point} className="flex items-start gap-4 border-b border-foreground/10 pb-5">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" aria-hidden="true" />
                <span className="text-foreground/80 font-light leading-relaxed">{point}</span>
              </li>
            ))}
            <li className="pt-2">
              <Button
                asChild
                variant="outline"
                className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background px-6"
              >
                <Link href="/services">How an audit works</Link>
              </Button>
            </li>
          </ul>
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-12 mb-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="border-y border-border py-10 md:py-14">
            <p className="font-sans tracking-[0.18em] text-xs text-foreground/55 uppercase mb-5">
              The person behind the strategy
            </p>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">A thoughtful second set of eyes.</h2>
            <p className="text-foreground/70 font-light leading-relaxed max-w-xl mb-8">
              Miranda Babbitt brings research, conversion thinking, and a
              practical respect for the people on both sides of a website.
              Clear advice, grounded in what your audience needs to know.
            </p>
            <Link
              href="/about"
              className="hover-underline text-foreground font-semibold inline-flex items-center gap-2"
            >
              More about Miranda <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="bg-[#e8e6e1] p-8 md:p-12">
            <p className="font-sans tracking-[0.18em] text-xs text-foreground/55 uppercase mb-6">
              The through-line
            </p>
            <p className="text-3xl md:text-4xl font-serif leading-snug mb-8">
              A good website is not a standalone fix. It is where a clear
              understanding of your audience becomes easier to act on.
            </p>
            <div className="h-px w-16 bg-primary/70" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-12 mb-24">
        <div className="relative overflow-hidden bg-[#e8e6e1] px-8 py-14 md:px-16 md:py-20">
          <div className="relative z-10 max-w-3xl">
            <p className="font-sans tracking-[0.18em] text-xs text-foreground/55 uppercase mb-5">
              A dedicated path for therapists and coaches
            </p>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-6">
              Your audience has its own context.
            </h2>
            <p className="text-foreground/70 text-lg font-light leading-relaxed max-w-2xl mb-9">
              Explore the therapist and coach overview for specialized services,
              practical guidance, and Squarespace templates built for practices
              and independent professionals.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-none bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-base h-auto"
            >
              <Link href="/therapists">Explore the therapist & coach pathway</Link>
            </Button>
          </div>
          <div aria-hidden="true" className="absolute -right-10 -bottom-24 w-64 h-64 border border-foreground/10 rounded-full" />
          <div aria-hidden="true" className="absolute -right-2 -bottom-16 w-48 h-48 border border-foreground/10 rounded-full" />
        </div>
      </section>
    </div>
  );
}
