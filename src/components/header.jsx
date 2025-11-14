"use client";

import { IconCode } from "@tabler/icons-react";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function Header() {
  const router = useRouter();
  return (
    <div className="border-b border-border/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <IconCode className="h-6 w-6 text-primary" />
          </div>
          <h1
            onClick={() => router.push("/")}
            className="text-4xl md:text-5xl font-extrabold tracking-tight cursor-pointer"
          >
            ZeroGuru
          </h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          AI-powered code analysis and execution flow visualization
        </p>
      </div>
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <AnimatedThemeToggler className="cursor-pointer hover:scale-105 transition-transform w-full" />
        <Button
          onClick={() => router.push("/faqs")}
          className="cursor-pointer hover:scale-105 transition-transform"
        >
          FAQs
        </Button>
      </div>
    </div>
  );
}
