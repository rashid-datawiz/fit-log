"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useWorkout } from "@/context/WorkoutContext";
import logo from "@/assets/logo.png";

const Navbar = () => {
    const pathname = usePathname();
    const { plan, saved } = useWorkout();

    const [menuOpen, setMenuOpen] = useState(false);

    const isWorkoutActive = pathname === "/";
    const isPlanActive = pathname === "/my-plan";

    return (
        <header className="sticky top-0 z-50 border-b border-[#20242a] bg-[#090b0f]/95 backdrop-blur-md">
            <nav className="navbar mx-auto h-20 min-h-20 max-w-7xl border-0 px-5 lg:px-8">
                {/* Logo */}
                <div className="navbar-start">
                    <Link
                        href="/"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3"
                    >
                        <Image
                            src={logo}
                            alt="FitLog"
                            width={48}
                            height={48}
                            priority
                            className="h-12 w-12 object-contain"
                        />

                        <span className="text-lg font-black tracking-[-0.04em] text-white">
                            FIT<span className="text-[#CCFF00]">LOG</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="navbar-center hidden md:flex">
                    <div className="flex h-full items-center gap-8">
                        <Link
                            href="/"
                            className={`relative flex h-20 items-center px-2 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors ${isWorkoutActive
                                ? "text-white"
                                : "text-[#777d87] hover:text-white"
                                }`}
                        >
                            Workout

                            {isWorkoutActive && (
                                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#CCFF00]" />
                            )}
                        </Link>

                        <Link
                            href="/my-plan"
                            className={`relative flex h-20 items-center px-2 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors ${isPlanActive
                                ? "text-white"
                                : "text-[#777d87] hover:text-white"
                                }`}
                        >
                            My Plan

                            {isPlanActive && (
                                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#CCFF00]" />
                            )}
                        </Link>
                    </div>
                </div>

                {/* Desktop Right Side */}
                <div className="navbar-end hidden items-center gap-2 md:flex">
                    <Link
                        href="/my-plan"
                        className="btn btn-sm h-9 min-h-9 rounded-md border border-[#CCFF00] bg-[#CCFF00] px-3 text-[11px] font-bold uppercase tracking-wide text-black hover:border-[#d8ff45] hover:bg-[#d8ff45]"
                    >
                        <span>Plan</span>

                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[10px] text-[#CCFF00]">
                            {plan.length}
                        </span>
                    </Link>

                    <Link
                        href="/my-plan?tab=saved"
                        className="btn btn-sm h-9 min-h-9 rounded-md border border-[#30343b] bg-transparent px-3 text-[11px] font-bold uppercase tracking-wide text-[#d5d8dc] hover:border-[#CCFF00] hover:bg-transparent hover:text-[#CCFF00]"
                    >
                        <span>Saved</span>

                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1a1d22] px-1.5 text-[10px] text-[#aeb3bb]">
                            {saved.length}
                        </span>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="navbar-end md:hidden">
                    <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="btn btn-square btn-ghost h-10 min-h-10 w-10 text-[#d5d8dc] hover:bg-[#15181d] hover:text-[#CCFF00]"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            {menuOpen && (
                <div className="border-t border-[#20242a] bg-[#090b0f] md:hidden">
                    <div className="mx-auto max-w-7xl px-5 py-4">
                        <div className="flex flex-col gap-1">
                            {/* Workout */}
                            <Link
                                href="/"
                                onClick={() => setMenuOpen(false)}
                                className={`rounded-md px-4 py-3 text-[13px] font-semibold uppercase tracking-wide transition ${isWorkoutActive
                                    ? "bg-[#CCFF00] text-black"
                                    : "text-[#858b95] hover:bg-[#15181d] hover:text-white"
                                    }`}
                            >
                                Workout
                            </Link>

                            {/* My Plan */}
                            <Link
                                href="/my-plan"
                                onClick={() => setMenuOpen(false)}
                                className={`flex items-center justify-between rounded-md px-4 py-3 text-[13px] font-semibold uppercase tracking-wide transition ${isPlanActive
                                    ? "bg-[#CCFF00] text-black"
                                    : "text-[#858b95] hover:bg-[#15181d] hover:text-white"
                                    }`}
                            >
                                <span>My Plan</span>

                                <span
                                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] ${isPlanActive
                                        ? "bg-black text-[#CCFF00]"
                                        : "bg-[#1a1d22] text-[#aeb3bb]"
                                        }`}
                                >
                                    {plan.length}
                                </span>
                            </Link>

                            {/* Saved */}
                            <Link
                                href="/my-plan?tab=saved"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center justify-between rounded-md px-4 py-3 text-[13px] font-semibold uppercase tracking-wide text-[#858b95] transition hover:bg-[#15181d] hover:text-white"
                            >
                                <span>Saved</span>

                                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1a1d22] px-1.5 text-[10px] text-[#aeb3bb]">
                                    {saved.length}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;