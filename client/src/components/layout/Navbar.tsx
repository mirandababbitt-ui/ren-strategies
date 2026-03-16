import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", path: "/services" },
    { name: "Templates", path: "/templates" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border/50 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/">
          <span className="font-serif text-2xl font-semibold tracking-wide text-foreground cursor-pointer">
            Ren Strategies
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <span
                className={`text-sm tracking-wide transition-colors hover:text-primary cursor-pointer ${
                  location === link.path ? "text-primary font-semibold" : "text-foreground/80"
                }`}
              >
                {link.name}
              </span>
            </Link>
          ))}
          <Button asChild variant="outline" className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors px-6">
            <Link href="/contact">Book an Audit</Link>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border/50 py-6 px-6 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <span
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-serif cursor-pointer ${
                  location === link.path ? "text-primary font-semibold" : "text-foreground"
                }`}
              >
                {link.name}
              </span>
            </Link>
          ))}
          <Button asChild className="rounded-none bg-foreground text-background w-full py-6">
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Book an Audit</Link>
          </Button>
        </div>
      )}
    </header>
  );
}