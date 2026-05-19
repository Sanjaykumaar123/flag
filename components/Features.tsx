"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Network, Zap, Target, Search, BarChart3 } from "lucide-react";

const features = [
  { icon: <Network className="w-6 h-6" />, color: "#60a5fa", title: "In-Context Learning (ICL) Solution", description: "Dynamically constructs few-shot prompts to guide the Qwen3-4B model through automatic data annotation." },
  { icon: <ShieldCheck className="w-6 h-6" />, color: "#34d399", title: "Hallucination Firewall", description: "Real-time cross-checking detects unsupported claims and triggers automatic self-correction pipelines." },
  { icon: <Search className="w-6 h-6" />, color: "#a78bfa", title: "Unified Dataset Support", description: "Seamlessly ingest the unified dataset provided by the organizing committee." },
  { icon: <Target className="w-6 h-6" />, color: "#fb923c", title: "Self-Healing Pipeline", description: "Low-confidence chunks are automatically re-annotated with stricter prompts until quality thresholds are met." },
  { icon: <Zap className="w-6 h-6" />, color: "#f0b90b", title: "Confidence Scorer", description: "Calculates Precision, Recall, and F1 metrics per chunk ensuring enterprise-grade annotation quality." },
  { icon: <BarChart3 className="w-6 h-6" />, color: "#f472b6", title: "Inference Validation", description: "Perform rigorous inference validation on the standardized evaluation dataset with one-click export." },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-4 px-3 py-1.5 rounded-full"
            style={{ color: "#f0b90b", background: "rgba(240,185,11,0.1)", border: "1px solid rgba(240,185,11,0.2)" }}>
            Built for Track 3
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-5 text-white">
            The Infrastructure of <span className="text-gradient">Intelligence</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Design an effective In-Context Learning (ICL) solution for automatic data annotation based on Qwen3-4B model.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-panel p-7 group cursor-default relative overflow-hidden"
              style={{ borderRadius: "1.5rem" }}
            >
              {/* Top shimmer on hover */}
              <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${f.color}60, transparent)` }} />

              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{ background: `${f.color}15`, color: f.color }}>
                {f.icon}
              </div>
              <h3 className="text-lg font-bold mb-2.5 text-white group-hover:transition-colors" style={{ lineHeight: 1.3 }}>
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
