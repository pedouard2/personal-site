import React, { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Journal", href: "/journal" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out border-b
        ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md py-3 shadow-md border-text/10"
            : "bg-transparent py-6 border-transparent"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Home Link */}
          <a
            href="/"
            className="flex items-center gap-3 group cursor-pointer no-underline border-none hover:bg-transparent"
          >
            <div className="relative w-10 h-10 bg-primary overflow-hidden border-2 border-text group-hover:border-accent transition-all transform group-hover:-rotate-3 shadow-[6px_6px_0px_var(--color-secondary)]">
              <div className="w-full h-full flex items-center justify-center text-sm font-heading text-background font-bold italic tracking-tighter">
                ME
              </div>
            </div>

            <span className="font-heading uppercase italic tracking-tighter text-xl text-text transition-colors group-hover:text-secondary">
              Your Name
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                // Overriding base global link styles to fit the navbar look
                className="text-sm font-body font-bold uppercase tracking-widest text-text/70 hover:text-secondary hover:bg-transparent border-none transition-colors relative group p-0"
              >
                {link.name}
                {/* Custom animated underline using Primary color */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-text p-2 hover:text-secondary transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`
        fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300
        ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"}
      `}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-5xl font-heading italic text-text border-none hover:text-primary hover:skew-x-[-10deg] transition-all hover:bg-transparent"
          >
            {link.name}
          </a>
        ))}
      </div>
    </>
  );
}
