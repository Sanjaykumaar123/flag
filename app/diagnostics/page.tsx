"use client";
import { motion } from "framer-motion";
import { Cpu, HardDrive, Network, Zap, ShieldAlert, Activity, Server, Database, ChevronLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GlowOrbs } from "@/components/StudioUI";

function MetricGauge({ label, value, max, color, suffix = "%" }: { label: string, value: number, max: number, color: string, suffix?: string }) {
  const percentage = (value / max) * 100;
  return (
    <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-3">
      <div className="flex justify-between items-end">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{label}</span>
        <span className={`text-xl font-bold font-mono text-${color}-400`}>{value.toFixed(1)}{suffix}</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${percentage}%` }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`absolute inset-y-0 left-0 rounded-full bg-${color}-500 shadow-[0_0_15px_rgba(var(--${color}-500),0.5)]`}
        />
      </div>
    </div>
  );
}

export default function DiagnosticsPage() {
  const [stats, setStats] = useState({
    vram: 84.2,
    tokens: 4200,
    latency: 120,
    nodes: 8,
    firewall: 14,
  });

  // Simulate live telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        vram: Math.max(60, Math.min(99, prev.vram + (Math.random() * 4 - 2))),
        tokens: Math.max(2000, Math.min(8000, prev.tokens + (Math.random() * 800 - 400))),
        latency: Math.max(40, Math.min(300, prev.latency + (Math.random() * 20 - 10))),
        nodes: prev.nodes,
        firewall: prev.firewall + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen relative flex flex-col pt-24 pb-12" style={{ background: "#0f1118" }}>
      <GlowOrbs />
      
      <div className="container mx-auto px-6 relative z-10 max-w-6xl space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Server className="w-8 h-8 text-violet-400" />
              System Diagnostics
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-bold ml-2 animate-pulse">
                Online
              </span>
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl">Live hardware telemetry and orchestration metrics for the ContextForge Qwen3-4B inference cluster.</p>
          </div>
          <Link href="/">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-outline flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" /> Back to Home
            </motion.button>
          </Link>
        </header>

        {/* Primary Gauges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricGauge label="GPU VRAM Allocation" value={stats.vram} max={100} color="violet" />
          <MetricGauge label="Token Throughput" value={stats.tokens} max={8000} color="blue" suffix=" t/s" />
          <MetricGauge label="Inference Latency" value={stats.latency} max={400} color="emerald" suffix=" ms" />
          <MetricGauge label="Active Shards" value={stats.nodes} max={16} color="yellow" suffix="" />
        </div>

        {/* Massive Terminal/Grid View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Architecture Visualizer */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden h-[400px]">
            <h3 className="text-sm font-semibold text-white mb-6 flex items-center gap-2">
              <Network className="w-4 h-4 text-blue-400" /> Cluster Topology
            </h3>
            
            {/* Animated Nodes Simulation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-10">
              {/* Core Router */}
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                className="w-32 h-32 rounded-full border border-dashed border-violet-500/30 flex items-center justify-center relative">
                <div className="w-16 h-16 rounded-full bg-violet-500/10 border border-violet-400 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                  <Cpu className="w-6 h-6 text-violet-300" />
                </div>
                {/* Orbital nodes */}
                {[0, 1, 2].map(i => (
                  <motion.div key={i} className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                    style={{ 
                      top: "50%", left: "50%", 
                      transform: `translate(-50%, -50%) rotate(${i * 120}deg) translateY(-4rem)`
                    }} 
                  />
                ))}
              </motion.div>
            </div>
            
            {/* Streaming Server Logs Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/40 border border-white/5 rounded-lg p-3 font-mono text-[10px] text-muted-foreground">
               <p><span className="text-emerald-400">[OK]</span> Node-01 (A100-80GB) initialized. Context window: 128k.</p>
               <p><span className="text-emerald-400">[OK]</span> Node-02 (A100-80GB) initialized. Context window: 128k.</p>
               <p><span className="text-blue-400">[INFO]</span> Balancing vector retrieval queues...</p>
               <p><span className="text-yellow-400">[WARN]</span> Firewall blocked {stats.firewall} hallucinatory generations in the last hour.</p>
               <p className="text-violet-400 mt-1 animate-pulse">_ awaiting stream inputs...</p>
            </div>
          </div>

          {/* Sub-panels */}
          <div className="space-y-6">
            
            {/* Memory Matrix */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" /> Semantic KV Cache
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({length: 16}).map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5 + Math.random() * 2, delay: Math.random() * 2 }}
                    className="h-8 rounded bg-emerald-500/20 border border-emerald-500/30"
                  />
                ))}
              </div>
            </div>

            {/* Hallucination Interceptors */}
            <div className="glass-panel p-5 rounded-2xl border border-red-500/20 bg-red-500/5">
              <h3 className="text-sm font-semibold text-red-300 mb-2 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400" /> Active Firewalls
              </h3>
              <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-red-200/70">Contradiction Intercepts</span>
                  <span className="font-mono text-red-400 font-bold">{stats.firewall}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-red-200/70">Ontology Mismatches</span>
                  <span className="font-mono text-red-400 font-bold">42</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-red-200/70">Numerical Drift Blocks</span>
                  <span className="font-mono text-red-400 font-bold">18</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
