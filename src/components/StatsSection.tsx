import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 3, suffix: "+", label: "Projects Shipped", color: "#a855f7", icon: "🚀" },
  { value: 2, suffix: "", label: "Certifications", color: "#06b6d4", icon: "🏅" },
  { value: 7.91, suffix: "", label: "B.Tech CGPA", color: "#ec4899", icon: "🎓" },
  { value: 5, suffix: "+", label: "Tech Stacks", color: "#6366f1", icon: "⚙️" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const steps = 40;
    const step = value / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += step;
      if (current >= value) {
        setDisplay(value);
        clearInterval(interval);
      } else {
        setDisplay(parseFloat(current.toFixed(2)));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {Number.isInteger(value) ? Math.round(display) : display.toFixed(2)}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div
          className="rounded-2xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Decorative gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(168,85,247,0.05) 0%, rgba(6,182,212,0.05) 100%)",
            }}
          />
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.12 * i }}
              className="relative text-center"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div
                className="text-4xl md:text-5xl font-bold font-body mb-1"
                style={{ color: stat.color }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
