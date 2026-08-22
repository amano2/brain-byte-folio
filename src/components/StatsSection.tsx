import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TrendingUp, CheckCircle, GraduationCap } from "lucide-react";

const stats = [
  {
    value: 3,
    label: "Projects Shipped",
    emoji: "🚀",
    icon: <TrendingUp className="w-3.5 h-3.5" />,
    color: "#ffffff",       // Sampled pure white
    suffix: "",
  },
  {
    value: 1,
    label: "Certification",
    emoji: "🏅",
    icon: <CheckCircle className="w-3.5 h-3.5" />,
    color: "#c750fd",       // Sampled purple #c750fd
    suffix: "",
  },
  {
    value: 7.76,
    label: "M.Tech CGPA",
    emoji: "🎓",
    icon: <GraduationCap className="w-3.5 h-3.5" />,
    color: "#00bc7d",       // Sampled green #00bc7d
    suffix: "",
  },
  {
    value: 7.91,
    label: "B.Tech CGPA",
    emoji: "🎓",
    icon: <GraduationCap className="w-3.5 h-3.5" />,
    color: "#fe9a00",       // Sampled amber #fe9a00
    suffix: "",
  },
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
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 font-mono text-xs text-muted-foreground"
            style={{
              background: "rgba(255,255,255,0.03)",
              borderColor: "rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ color: "#a855f7" }}>✦</span>
            portfolio.stats // credentials
          </div>

          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4">
            Impact, measured.
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg leading-relaxed font-body">
            A snapshot of the work, learning, and momentum behind Aman Hossain —
            building intelligent systems with curiosity and intent.
          </p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="p-5 rounded-2xl flex flex-col justify-between min-h-[155px] transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: `1px solid ${i === 0 ? "rgba(255,255,255,0.08)" : `${stat.color}35`}`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${stat.color}60`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${stat.color}15`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = i === 0 ? "rgba(255,255,255,0.08)" : `${stat.color}35`;
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Top row: emoji badge + icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-base">
                  {stat.emoji}
                </div>
                <span style={{ color: stat.color, opacity: 0.4 }}>{stat.icon}</span>
              </div>

              {/* Count */}
              <div>
                <div
                  className="text-4xl md:text-5xl font-bold font-body leading-none mb-1.5"
                  style={{ color: stat.color }}
                >
                  {stat.value === 3 ? "03" : stat.value === 1 ? "01" : stat.value.toFixed(2)}
                </div>

                {/* Label */}
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
