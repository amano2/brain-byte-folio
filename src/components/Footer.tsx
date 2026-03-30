import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="py-16 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <p className="font-mono text-primary text-sm text-glow">
          aman@dev:~$ echo "Let's connect"
        </p>
        <p className="text-muted-foreground text-sm">
          Open to collaborations, research opportunities, and interesting projects.
        </p>

        <div className="flex justify-center gap-5">
          <a
            href="https://github.com/amano2"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/aman-hossain-53a893242/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:amanhossainmail@gmail.com"
            className="p-3 rounded-lg border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <p className="font-mono text-xs text-muted-foreground/50 pt-8">
          © {new Date().getFullYear()} Aman Hossain — Built with precision.
        </p>
      </div>
    </footer>
  );
}
