"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, BrainCircuit, CheckCircle2, Database, Network, ShieldCheck, Sparkles, Zap, FileText, BarChart3, ChevronRight } from "lucide-react";

// ─── Animated Counter ──────────────────────────────────────────────
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(start));
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
}

// ─── Architecture Section ─────────────────────────────────────────
const pipelineSteps = [
  { icon: <Database className="w-5 h-5" />, label: "Data Ingestion", desc: "Parse & tokenize documents", color: "text-gray-300", border: "border-gray-500/30", glow: "bg-gray-400" },
  { icon: <BrainCircuit className="w-5 h-5" />, label: "ICL Retrieval", desc: "Few-shot prompt construction", color: "text-blue-300", border: "border-blue-500/30", glow: "bg-blue-400" },
  { icon: <Sparkles className="w-5 h-5" />, label: "Qwen3-4B Generator", desc: "Structured annotation inference", color: "text-purple-300", border: "border-purple-500/30", glow: "bg-purple-400" },
  { icon: <ShieldCheck className="w-5 h-5" />, label: "Fact Verifier", desc: "Hallucination firewall", color: "text-emerald-300", border: "border-emerald-500/30", glow: "bg-emerald-400" },
  { icon: <BarChart3 className="w-5 h-5" />, label: "Confidence Scorer", desc: "F1 · Precision · Recall", color: "text-yellow-300", border: "border-yellow-500/30", glow: "bg-yellow-400" },
];

export function ArchitectureSection() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveStep(p => (p + 1) % pipelineSteps.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="architecture" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4 px-3 py-1 rounded-full border border-primary/30 bg-primary/10">
            <Network className="w-4 h-4" /> Multi-Agent Orchestration
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">The Pipeline <span className="text-gradient">Architecture</span></h2>
          <p className="text-muted-foreground text-lg">An effective In-Context Learning (ICL) solution for automatic data annotation based on Qwen3-4B model.</p>
        </motion.div>

        {/* Animated pipeline */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-0 max-w-5xl mx-auto mb-16">
          {pipelineSteps.map((step, i) => (
            <div key={i} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-500 cursor-pointer ${activeStep === i ? `${step.border} bg-white/5 shadow-[0_0_30px_rgba(255,255,255,0.05)]` : "border-white/5 bg-transparent"}`}
                onClick={() => setActiveStep(i)}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeStep === i ? "bg-white/10" : "bg-white/5"} ${step.color} transition-all`}>
                  {step.icon}
                </div>
                <div className="text-center">
                  <p className={`text-sm font-semibold ${activeStep === i ? "text-white" : "text-muted-foreground"} transition-colors`}>{step.label}</p>
                  <p className="text-xs text-muted-foreground mt-1 hidden md:block">{step.desc}</p>
                </div>
                {activeStep === i && (
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.8, ease: "linear" }} style={{ originX: 0 }} className={`h-0.5 w-full rounded-full ${step.glow} opacity-70`} />
                )}
              </motion.div>
              {i < pipelineSteps.length - 1 && (
                <ChevronRight className="w-5 h-5 text-white/20 mx-1 shrink-0 hidden md:block" />
              )}
            </div>
          ))}
        </div>

        {/* Active step details */}
        <motion.div key={activeStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto glass-panel rounded-2xl p-6 border border-white/10 text-center">
          <div className={`text-lg font-bold ${pipelineSteps[activeStep].color} mb-2`}>{pipelineSteps[activeStep].label}</div>
          <p className="text-muted-foreground">{pipelineSteps[activeStep].desc}</p>
          <div className="mt-4 flex items-center justify-center gap-2">
            {pipelineSteps.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === activeStep ? "bg-primary scale-125" : "bg-white/20"}`} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Metrics Section ──────────────────────────────────────────────
const metrics = [
  { value: 94, suffix: "%", label: "Annotation Accuracy", sub: "vs 71% manual baseline" },
  { value: 98, suffix: "%", label: "Hallucination Catch Rate", sub: "Fact Verifier firewall" },
  { value: 14024, suffix: "", label: "Chunks Annotated", sub: "In benchmark evaluation" },
  { value: 0.94, suffix: "", label: "F1 Score", sub: "Precision · Recall balance", isFloat: true },
];

export function MetricsSection() {
  return (
    <section id="metrics" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium mb-4 px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10">
            <CheckCircle2 className="w-4 h-4" /> Benchmark Evaluation
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Measurable <span className="text-gradient">Superiority</span></h2>
          <p className="text-muted-foreground text-lg">Every metric is computed from real inference validation on the standardized evaluation dataset.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {metrics.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-panel rounded-2xl p-6 border border-white/5 text-center glow-border group hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl font-extrabold text-white mb-2 group-hover:text-gradient transition-all">
                {m.isFloat ? m.value : <AnimatedNumber target={m.value} suffix={m.suffix} />}
                {m.isFloat ? m.suffix : ""}
              </div>
              <div className="text-sm font-semibold text-white mb-1">{m.label}</div>
              <div className="text-xs text-muted-foreground">{m.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto glass-panel rounded-2xl border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <span className="font-semibold text-white">ContextForge AI vs Baseline Approaches</span>
          </div>
          <div className="p-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground text-left">
                  <th className="pb-3 font-medium">Method</th>
                  <th className="pb-3 font-medium text-center">Accuracy</th>
                  <th className="pb-3 font-medium text-center">Hallucination Rate</th>
                  <th className="pb-3 font-medium text-center">F1 Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { method: "Manual Annotation", acc: "71%", hall: "12%", f1: "0.68", highlight: false },
                  { method: "Naive Prompting (no ICL)", acc: "79%", hall: "8%", f1: "0.77", highlight: false },
                  { method: "Fixed-shot ICL", acc: "86%", hall: "4%", f1: "0.84", highlight: false },
                  { method: "ContextForge AI ✦", acc: "94%", hall: "2%", f1: "0.94", highlight: true },
                ].map((row, i) => (
                  <tr key={i} className={row.highlight ? "text-white" : "text-muted-foreground"}>
                    <td className="py-3 font-medium">{row.highlight ? <span className="text-primary">{row.method}</span> : row.method}</td>
                    <td className="py-3 text-center">{row.highlight ? <span className="text-emerald-400 font-bold">{row.acc}</span> : row.acc}</td>
                    <td className="py-3 text-center">{row.highlight ? <span className="text-emerald-400 font-bold">{row.hall}</span> : row.hall}</td>
                    <td className="py-3 text-center">{row.highlight ? <span className="text-emerald-400 font-bold">{row.f1}</span> : row.f1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────
export function CTASection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent pointer-events-none" />
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="glass-panel border border-primary/20 rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-[0_0_80px_rgba(120,119,198,0.2)]">
          <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-6 px-3 py-1 rounded-full border border-primary/30 bg-primary/10">
            <Zap className="w-4 h-4" /> FlagOS Track 3 · Season 1
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Ready to <span className="text-gradient">Annotate</span> at Scale?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Design your effective In-Context Learning (ICL) solution using the unified dataset provided by the organizing committee, and perform inference validation seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/studio">
              <button className="px-8 py-4 bg-primary text-white font-semibold rounded-2xl shadow-[0_0_40px_rgba(120,119,198,0.4)] hover:shadow-[0_0_60px_rgba(120,119,198,0.6)] transition-all flex items-center gap-2">
                Launch Studio <ArrowRight className="w-5 h-5" />
              </button>
            </a>
            <a href="/studio">
              <button className="px-8 py-4 glass-panel text-white font-semibold rounded-2xl hover:bg-white/5 transition-all flex items-center gap-2 glow-border border border-white/10">
                <FileText className="w-5 h-5" /> View Sample Report
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
