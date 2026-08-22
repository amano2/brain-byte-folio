import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Terminal, User, Code2, FolderOpen, Award, BookOpen, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", value: "about", isSection: true, icon: <User className="w-3 h-3" /> },
  { label: "Skills", value: "skills", isSection: true, icon: <Code2 className="w-3 h-3" /> },
  { label: "Projects", value: "projects", isSection: true, icon: <FolderOpen className="w-3 h-3" /> },
  { label: "Certifications", value: "certifications", isSection: true, icon: <Award className="w-3 h-3" /> },
  { label: "Blog", value: "/blog", isSection: false, icon: <BookOpen className="w-3 h-3" /> },
  { label: "Contact", value: "contact", isSection: true, icon: <Mail className="w-3 h-3" /> },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    setActiveSection(sectionId);
    if (isHome) {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl rounded-full transition-all duration-300 ${
        scrolled || !isHome
          ? "backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] py-3 px-6"
          : "py-3 px-6 border border-white/8"
      }`}
      style={{
        background: "rgba(13,13,13,0.85)",
      }}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 font-mono font-bold text-sm tracking-widest text-foreground hover:text-green-400 transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-xs text-[#00dcb7]">
            &gt;_
          </div>
          <span>AMAN<span style={{ color: "#00dcb7" }}>.DEV</span></span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = link.isSection
              ? activeSection === link.value
              : location.pathname.startsWith(link.value);

            if (link.isSection) {
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.value)}
                  className={`flex items-center gap-1.5 text-xs font-mono transition-all duration-200 cursor-pointer ${
                    isActive
                      ? link.value === "contact"
                        ? "px-3.5 py-1.5 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                        : "text-[#22c55e] border-b border-[#22c55e] pb-0.5"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className={isActive ? "text-[#22c55e]" : "opacity-50"}>{link.icon}</span>
                  {link.label}
                </button>
              );
            }
            return (
              <Link
                key={link.label}
                to={link.value}
                className={`flex items-center gap-1.5 text-xs font-mono transition-all duration-200 pb-0.5 ${
                  isActive
                    ? "text-[#22c55e] border-b border-[#22c55e]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className={isActive ? "text-[#22c55e]" : "opacity-50"}>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: ONLINE status + mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              ONLINE
            </span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground hover:text-green-400 transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-4 pt-4 border-t border-white/5 flex flex-col gap-3 rounded-2xl p-4 backdrop-blur-md"
            style={{ background: "rgba(13,13,13,0.95)" }}
          >
            {navLinks.map((link) => {
              if (link.isSection) {
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.value)}
                    className="flex items-center gap-2 text-left font-mono text-sm text-muted-foreground hover:text-foreground py-1.5 border-b border-white/5 transition-colors cursor-pointer"
                  >
                    <span className="opacity-50">{link.icon}</span>
                    {link.label}
                  </button>
                );
              }
              return (
                <Link
                  key={link.label}
                  to={link.value}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 font-mono text-sm py-1.5 border-b border-white/5 transition-colors ${
                    location.pathname.startsWith(link.value)
                      ? "text-green-400 font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="opacity-50">{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
            <div className="flex items-center gap-1.5 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Online</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
