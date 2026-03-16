import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground py-20 px-6 md:px-12 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2 space-y-6">
          <h2 className="font-serif text-3xl font-semibold">Ren Strategies</h2>
          <p className="text-card-foreground/70 max-w-sm font-sans font-light leading-relaxed">
            Website audit and conversion optimization consulting for mission-driven organizations, therapists, and coaches.
          </p>
        </div>
        
        <div className="space-y-6">
          <h3 className="font-serif text-xl tracking-wider text-primary">Navigation</h3>
          <ul className="space-y-4">
            <li>
              <Link href="/">
                <span className="text-card-foreground/70 hover:text-primary transition-colors font-light cursor-pointer">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/services">
                <span className="text-card-foreground/70 hover:text-primary transition-colors font-light cursor-pointer">Services</span>
              </Link>
            </li>
            <li>
              <Link href="/templates">
                <span className="text-card-foreground/70 hover:text-primary transition-colors font-light cursor-pointer">Templates</span>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <span className="text-card-foreground/70 hover:text-primary transition-colors font-light cursor-pointer">About</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="font-serif text-xl tracking-wider text-primary">Connect</h3>
          <ul className="space-y-4">
            <li>
              <Link href="/contact">
                <span className="text-card-foreground/70 hover:text-primary transition-colors font-light cursor-pointer">Contact</span>
              </Link>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/mirandababbitt" target="_blank" rel="noopener noreferrer" className="text-card-foreground/70 hover:text-primary transition-colors font-light">LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto mt-20 pt-8 border-t border-card-foreground/10 text-card-foreground/50 text-sm font-light flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Ren Strategies. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-card-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-card-foreground transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}