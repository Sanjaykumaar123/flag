"use client";
import { motion } from "framer-motion";
import { Network } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#architecture", label: "Architecture" },
  { href: "#metrics", label: "Evaluation" },
  { href: "/diagnostics", label: "Diagnostics" },
  { href: "/studio", label: "Studio" },
];

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ background: "rgba(15,17,24,0.75)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#f0b90b,#f5d060)", boxShadow: "0 0 20px rgba(240,185,11,0.35)" }}>
          <Network className="w-5 h-5 text-black" />
        </div>
        <span className="text-lg font-bold text-white tracking-tight">
          ContextForge <span style={{ color: "#f0b90b" }}>AI</span>
        </span>
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
        {NAV_LINKS.map(l => (
          <Link key={l.href} href={l.href}
            className="hover:text-white transition-colors duration-200 relative group">
            {l.label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-yellow-400 group-hover:w-full transition-all duration-300" />
          </Link>
        ))}
      </div>

      {/* CTA */}
      <Link href="/studio">
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: "0 0 35px rgba(240,185,11,0.45)" }}
          whileTap={{ scale: 0.97 }}
          className="btn-gold text-sm"
        >
          Enter Studio
        </motion.button>
      </Link>
    </motion.nav>
  );
}
