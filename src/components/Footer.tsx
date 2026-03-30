export default function Footer() {
  return (
    <footer id="contact" className="py-16 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <p className="font-mono text-primary text-sm text-glow">
          aman@dev:~$ echo "Let's connect"
        </p>
        <p className="text-muted-foreground text-sm">
          Open to collaborations, research opportunities, and interesting projects.
        </p>
        <p className="font-mono text-xs text-muted-foreground/50 pt-8">
          © {new Date().getFullYear()} Aman Hossain — Built with precision.
        </p>
      </div>
    </footer>
  );
}
