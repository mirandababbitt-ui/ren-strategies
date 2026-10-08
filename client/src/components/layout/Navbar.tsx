import { Link, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audienceMenuOpen, setAudienceMenuOpen] = useState(false);
  const audienceMenuRef = useRef<HTMLDivElement>(null);
  const mobileAudienceMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !audienceMenuRef.current?.contains(target) &&
        !mobileAudienceMenuRef.current?.contains(target)
      ) {
        setAudienceMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAudienceMenuOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const audienceLinks = [
    { name: "Therapist & coach overview", path: "/therapists" },
    { name: "Services", path: "/services" },
    { name: "Templates", path: "/templates" },
  ];
  const isAudiencePage = audienceLinks.some((link) => location === link.path);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md" : "bg-background/90 backdrop-blur-sm"
      }`}
    >
      <div className="h-8 bg-[#e8e6e1] text-foreground/75 flex items-center justify-center px-4">
        <p className="font-sans text-[10px] sm:text-xs tracking-[0.08em]">
          Ren Strategies for Therapists and Coaches
        </p>
      </div>

      <div className="container mx-auto px-6 md:px-12 min-h-[76px] flex justify-between items-center">
        <Link
          href="/"
          aria-label="Ren Strategies home"
          className="font-serif text-2xl font-semibold tracking-wide text-foreground hover:text-primary transition-colors"
        >
          Ren Strategies
        </Link>

        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm tracking-wide transition-colors hover:text-primary ${
                location === link.path ? "text-primary font-semibold" : "text-foreground/80"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="relative" ref={audienceMenuRef}>
            <button
              type="button"
              aria-expanded={audienceMenuOpen}
              aria-controls="audience-menu"
              onClick={() => setAudienceMenuOpen((open) => !open)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setAudienceMenuOpen(true);
                  requestAnimationFrame(() => {
                    document.querySelector<HTMLAnchorElement>("#audience-menu a")?.focus();
                  });
                }
              }}
              className={`inline-flex items-center gap-1.5 text-sm tracking-wide transition-colors hover:text-primary ${
                isAudiencePage ? "text-primary font-semibold" : "text-foreground/80"
              }`}
            >
              Are you a therapist or coach?
              <ChevronDown size={15} aria-hidden="true" className={`transition-transform ${audienceMenuOpen ? "rotate-180" : ""}`} />
            </button>
            {audienceMenuOpen && (
              <div
                id="audience-menu"
                role="menu"
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setAudienceMenuOpen(false);
                    document.querySelector<HTMLButtonElement>('button[aria-controls="audience-menu"]')?.focus();
                  }
                }}
                className="absolute left-0 top-full mt-4 w-64 border border-border bg-background p-2 shadow-lg"
              >
                {audienceLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setAudienceMenuOpen(false)}
                    className="block px-4 py-3 text-sm text-foreground/80 hover:bg-[#e8e6e1] hover:text-foreground focus:bg-[#e8e6e1] focus:outline-none"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Button asChild variant="outline" className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors px-5">
            <Link href="/contact">Book an Audit</Link>
          </Button>
        </nav>
        <button
          type="button"
          className="lg:hidden text-foreground p-2 -mr-2"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav aria-label="Mobile navigation" className="lg:hidden absolute top-full left-0 w-full bg-background border-y border-border/50 py-5 px-6 flex flex-col gap-1 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 text-lg font-serif ${
                location === link.path ? "text-primary font-semibold" : "text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div ref={mobileAudienceMenuRef} className="border-t border-border/70 mt-2 pt-3">
            <button
              type="button"
              aria-expanded={audienceMenuOpen}
              aria-controls="mobile-audience-menu"
              onClick={() => setAudienceMenuOpen((open) => !open)}
              className="w-full flex justify-between items-center py-2 text-left font-serif text-lg"
            >
              Are you a therapist or coach?
              <ChevronDown size={18} aria-hidden="true" className={`transition-transform ${audienceMenuOpen ? "rotate-180" : ""}`} />
            </button>
            {audienceMenuOpen && (
              <div
                id="mobile-audience-menu"
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setAudienceMenuOpen(false);
                    document.querySelector<HTMLButtonElement>('button[aria-controls="mobile-audience-menu"]')?.focus();
                  }
                }}
                className="flex flex-col pl-4 border-l border-primary/40"
              >
                {audienceLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAudienceMenuOpen(false);
                    }}
                    className="py-2.5 text-sm text-foreground/75 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Button asChild className="rounded-none bg-foreground text-background w-full py-6 mt-3">
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Book an Audit</Link>
          </Button>
        </nav>
      )}
    </header>
  );
}