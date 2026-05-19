"use client";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Database, ShieldAlert, Sparkles } from "lucide-react";
import Link from "next/link";

const LOGS = [
  { icon: <Database className="w-4 h-4" />, color: "#f0b90b", text: "[DataIngestion] Loaded 14,024 pages. Semantic chunking initiated..." },
  { icon: <BrainCircuit className="w-4 h-4" />, color: "#60a5fa", text: "[ICLEngine] Built 5-shot prompt. Domain: Financial. Entities: 12 detected." },
  { icon: <Sparkles className="w-4 h-4" />, color: "#a78bfa", text: "[Qwen3-4B] Generating structured annotations... confidence: 94.2%" },
  { icon: <ShieldAlert className="w-4 h-4" />, color: "#34d399", text: "[FactVerifier] All 48 chunks passed grounding check. Zero hallucinations.", highlight: true },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Gold center glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(240,185,11,0.08) 0%, transparent 70%)" }} />
      {/* Violet side glow */}
      <div className="absolute top-1/2 left-[10%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "rgba(139,92,246,0.07)", filter: "blur(80px)" }} />

      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium"
            style={{ background: "rgba(240,185,11,0.1)", border: "1px solid rgba(240,185,11,0.3)", color: "#f0b90b" }}
          >
            <Sparkles className="w-4 h-4" />
            Track 3: FlagOS Open Computing Global Challenge
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
          >
            Autonomous <span className="text-gradient">Long-Context</span><br />
            Annotation Intelligence
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
          >
            An effective In-Context Learning (ICL) solution for automatic data annotation based on the Qwen3-4B model. Process the unified dataset and perform robust inference validation on the standardized evaluation dataset.
          </motion.p>

          {/* CTAs — CoverFi style */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link href="/studio">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 45px rgba(240,185,11,0.55)" }}
                whileTap={{ scale: 0.97 }}
                className="btn-gold flex items-center gap-2 px-8 py-4 text-base"
              >
                Launch Studio <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link href="#architecture">
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="btn-outline flex items-center gap-2 px-8 py-4 text-base"
              >
                <BrainCircuit className="w-5 h-5" /> Explore Architecture
              </motion.button>
            </Link>
          </motion.div>

          {/* Live pipeline preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
            className="mt-20 w-full max-w-3xl relative"
          >
            {/* Fade-out at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-20 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to top, #0f1118, transparent)" }} />

            <div className="glass-panel overflow-hidden" style={{ borderRadius: "1.5rem" }}>
              {/* Fake window header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono ml-2">contextforge_pipeline.ts</span>
                </div>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-400/10 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Agents Online
                </span>
              </div>

              {/* Log lines */}
              <div className="p-5 space-y-3 font-mono text-sm">
                {LOGS.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.5, duration: 0.4 }}
                    className={`flex items-start gap-3 p-2.5 rounded-xl ${log.highlight ? "border" : ""}`}
                    style={log.highlight ? { background: "rgba(52,211,153,0.05)", borderColor: "rgba(52,211,153,0.2)" } : {}}
                  >
                    <span style={{ color: log.color, marginTop: 2 }}>{log.icon}</span>
                    <span className="text-muted-foreground leading-relaxed">{log.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
