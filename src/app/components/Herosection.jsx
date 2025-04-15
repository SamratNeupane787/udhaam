"use client";
import { BackgroundBeams } from "./ui/background-beams";
import { TypewriterEffect } from "./ui/typewriter-effect";
import { Button } from "./ui/button";
import { Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";

export function TypewriterEffectDemo() {
  const words = [
    { text: "Platform " },
    { text: "for " },
    { text: "Nepali " },
    { text: "Startups" },
  ];

  return (
    <div className="flex  flex-col bg-[#1b1a1a] items-center justify-center h-[32rem] border-b-2 px-6 text-center">
      <p className="text-white dark:text-neutral-200 text-lg mb-6">
        The road to freedom starts from here
      </p>

      <TypewriterEffect words={words} className="text-white" />

      <div className="flex flex-col md:flex-row justify-center gap-4 mt-8 w-full sm:w-auto">
        <Link href="/Submit" className="w-full sm:w-auto">
          <Button size="lg" className="bg-blue-600 w-full sm:w-auto">
            Submit Your Startup
            <Rocket className="ml-2 h-4 w-4" />
          </Button>
        </Link>

        <Link href="/explore" className="w-full sm:w-auto">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Explore Startups
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* <BackgroundBeams /> */}
    </div>
  );
}
