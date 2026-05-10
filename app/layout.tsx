import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ContextForge AI | Autonomous Long-Context Annotation",
  description: "The future infrastructure for autonomous AI data operations. Enterprise-scale automated annotation, long-context reasoning, hallucination prevention.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "antialiased min-h-screen bg-background text-foreground overflow-x-hidden")}>
        {children}
      </body>
    </html>
  );
}
