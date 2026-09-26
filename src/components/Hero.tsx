import Image from "next/image";
import Link from "next/link";

import banner from "@/assets/banner.png";
import { ArrowDownRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="border-b border-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">

        {/* Left Content */}
        <div className="max-w-2xl">

          <p className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-[#CCFF00]">
            Workout Library
          </p>

          <h1 className="text-5xl font-black uppercase leading-[0.92] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
            Train With Intent.
            <br />
            <span className="text-white/45">
              Log Every Set.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today's plan, and watch the week's work add up.
          </p>

          <Link
            href="/#"
            className="btn mt-8 h-12 min-h-12 rounded-none border-0 bg-[#CCFF00] px-6 text-xs font-black uppercase tracking-[0.08em] text-black shadow-none hover:bg-[#d9ff4d]"
          >
            Browse Workouts
            <ArrowDownRight size={17} strokeWidth={2.5} />
          </Link>

        </div>

        {/* Hero Image */}
        <div className="relative">
          <div className="overflow-hidden border border-white/10 bg-[#111]">
            <Image
              src={banner}
              alt="FitLog workout"
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          {/* Decorative accent */}
          <div className="absolute -bottom-2 -left-2 h-10 w-10 border-b-2 border-l-2 border-[#CCFF00]" />
          <div className="absolute -right-2 -top-2 h-10 w-10 border-r-2 border-t-2 border-[#CCFF00]" />
        </div>

      </div>
    </section>
  );
};

export default Hero;