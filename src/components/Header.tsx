import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    if (isHome) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${sectionId}`);
      // The scroll will be handled by the hash effect on load or standard navigation
    }
  };

  const navLinks = [
    { label: "About", value: "about", isSection: true },
    { label: "Skills", value: "skills", isSection: true },
    { label: "Projects", value: "projects", isSection: true },
    { label: "Certifications", value: "certifications", isSection: true },
    { label: "Blog", value: "/blog", isSection: false },
    { label: "Contact", value: "contact", isSection: true },
  ];

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl rounded-full transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-background/70 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.2)] py-3 px-6"
          : "bg-transparent py-4 px-6 border border-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-mono font-bold text-sm tracking-widest text-foreground hover:text-purple-400 transition-colors"
        >
          <Terminal className="w-4 h-4 text-purple-400" />
          <span>AMAN.DEV</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            if (link.isSection) {
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.value)}
                  className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  //{link.label}
                </button>
              );
            } else {
              return (
                <Link
                  key={link.label}
                  to={link.value}
                  className={`text-xs font-mono transition-colors ${
                    location.pathname.startsWith(link.value)
                      ? "text-purple-400 font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  //{link.label}
                </Link>
              );
            }
          })}
        </nav>

        {/* Mobile Hamburger toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground hover:text-purple-400 transition-colors cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-4 pt-4 border-t border-white/5 flex flex-col gap-4 bg-background/90 rounded-2xl p-4 backdrop-blur-md"
          >
            {navLinks.map((link) => {
              if (link.isSection) {
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.value)}
                    className="text-left font-mono text-sm text-muted-foreground hover:text-foreground py-1 border-b border-white/5 transition-colors cursor-pointer"
                  >
                    //{link.label}
                  </button>
                );
              } else {
                return (
                  <Link
                    key={link.label}
                    to={link.value}
                    onClick={() => setIsOpen(false)}
                    className={`font-mono text-sm py-1 border-b border-white/5 transition-colors block ${
                      location.pathname.startsWith(link.value)
                        ? "text-purple-400 font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    //{link.label}
                  </Link>
                );
              }
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
