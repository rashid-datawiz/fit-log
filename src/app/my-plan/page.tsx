'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    ArrowUpRight,
    Check,
    Clock3,
    Flame,
    Star,
    X,
    ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";

import { useWorkout } from "@/context/WorkoutContext";
import Image from "next/image";

const MyPlan = () => {
    const searchParams = useSearchParams();

    const {
        plan,
        saved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
        isCompleted,
    } = useWorkout();

    const [toast, setToast] = useState<string | null>(null);

    type SortOption = "duration" | "calories" | "rating";

    const [sortBy, setSortBy] = useState<SortOption>("duration");

    const activeTab =
        searchParams.get("tab") === "saved" ? "saved" : "plan";

    const activeWorkouts = activeTab === "saved" ? saved : plan;

    const sortedWorkouts = [...activeWorkouts].sort((a, b) => {
        if (sortBy === "duration") {
            return b.duration - a.duration;
        }

        if (sortBy === "calories") {
            return b.caloriesBurned - a.caloriesBurned;
        }

        return b.rating - a.rating;
    });

    const totalMinutes = activeWorkouts.reduce(
        (total, workout) => total + workout.duration,
        0
    );

    const totalCalories = activeWorkouts.reduce(
        (total, workout) => total + workout.caloriesBurned,
        0
    );

    useEffect(() => {
        if (!toast) return;

        const timer = setTimeout(() => {
            setToast(null);
        }, 2500);

        return () => clearTimeout(timer);
    }, [toast]);

    const handleRemove = (id: number) => {
        if (activeTab === "saved") {
            removeFromSaved(id);
            setToast("Workout removed from saved.");
        } else {
            removeFromPlan(id);
            setToast("Workout removed from today's plan.");
        }
    };

    const handleMarkAsDone = (id: number) => {
        if (isCompleted(id)) {
            setToast("Workout is already marked as done.");
            return;
        }

        markAsDone(id);
        setToast("Workout marked as done.");
    };

    return (
        <main className="min-h-[75vh] bg-black">
            <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16 lg:px-8 lg:py-20">
                {/* Header */}
                <div className="mb-10">
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-[#CCFF00]">
                        Your Workouts
                    </p>

                    <h1 className="text-4xl font-black uppercase tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                        My Plan
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/40 sm:text-base">
                        Cap of five lifts for today. Finish them, then load more.
                    </p>
                </div>

                {/* Metrics */}
                <div className="mb-10 grid grid-cols-3 border-y border-white/10">
                    <div className="border-r border-white/10 px-4 py-5 sm:px-6">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/35">
                            Exercises
                        </p>

                        <p className="mt-2 text-2xl font-black text-white sm:text-3xl">
                            {activeWorkouts.length}
                        </p>
                    </div>

                    <div className="border-r border-white/10 px-4 py-5 sm:px-6">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/35">
                            Minutes
                        </p>

                        <p className="mt-2 text-2xl font-black text-white sm:text-3xl">
                            {totalMinutes}
                        </p>
                    </div>

                    <div className="px-4 py-5 sm:px-6">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/35">
                            Calories
                        </p>

                        <p className="mt-2 text-2xl font-black text-white sm:text-3xl">
                            {totalCalories}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                {/* Tabs + Sort */}
                <div className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-0 sm:flex-row sm:items-end sm:justify-between">
                    {/* Tabs */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="/my-plan"
                            className={`relative pb-4 text-xs font-black uppercase tracking-[0.1em] transition ${activeTab === "plan"
                                    ? "text-white"
                                    : "text-white/35 hover:text-white"
                                }`}
                        >
                            Today's Plan

                            {activeTab === "plan" && (
                                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#CCFF00]" />
                            )}
                        </Link>

                        <Link
                            href="/my-plan?tab=saved"
                            className={`relative pb-4 text-xs font-black uppercase tracking-[0.1em] transition ${activeTab === "saved"
                                    ? "text-white"
                                    : "text-white/35 hover:text-white"
                                }`}
                        >
                            Saved

                            {activeTab === "saved" && (
                                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#CCFF00]" />
                            )}
                        </Link>
                    </div>

                    {/* Sort */}
                    <div className="mb-4 flex items-center gap-3 sm:mb-3">
                        <span className="text-sm text-white/50">
                            Sort By
                        </span>

                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(event) =>
                                    setSortBy(event.target.value as SortOption)
                                }
                                className="select select-bordered h-14 min-h-14 w-40 appearance-none rounded-2xl border-white/10 bg-[#101116] px-4 pr-11 text-base text-white outline-none focus:border-white/20 focus:outline-none"
                                aria-label="Sort workouts"
                            >
                                <option value="duration">Duration</option>
                                <option value="calories">Calories</option>
                                <option value="rating">Rating</option>
                            </select>

                            <ChevronDown
                                size={20}
                                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50"
                            />
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                {activeWorkouts.length === 0 ? (
                    <div className="flex min-h-[380px] items-center justify-center border border-white/10 bg-[#0B0B0B] px-6 text-center">
                        <div className="max-w-md">
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#CCFF00]">
                                FitLog
                            </p>

                            <h2 className="mt-4 text-3xl font-black uppercase tracking-[-0.03em] text-white">
                                Nothing Here Yet
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-white/40">
                                Browse the library and add a lift to get today moving.
                            </p>

                            <Link
                                href="/"
                                className="btn mt-7 h-12 min-h-12 rounded-none border-0 bg-[#CCFF00] px-6 text-xs font-black uppercase tracking-[0.08em] text-black shadow-none hover:bg-[#d9ff4d]"
                            >
                                Go To Workouts
                                <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* Workout Cards */
                    <div className="grid gap-4 md:grid-cols-2">
                        {sortedWorkouts.map((workout) => {
                            const completed = isCompleted(workout.id);

                            return (
                                <article
                                    key={workout.id}
                                    className={`card overflow-hidden rounded-none border bg-[#0B0B0B] shadow-none transition ${completed
                                        ? "border-[#CCFF00]/30"
                                        : "border-white/10"
                                        }`}
                                >
                                    <div className="flex flex-col sm:flex-row">
                                        {/* Image */}
                                        <figure className="relative h-56 shrink-0 overflow-hidden bg-[#151515] sm:h-auto sm:w-44">
                                            <Image
                                                src={workout.image}
                                                alt={workout.name}
                                                width={161}
                                                height={80}
                                                className={`h-full w-full object-cover transition ${completed ? "opacity-50 grayscale" : ""
                                                    }`}
                                            />

                                            {completed && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#CCFF00] text-black">
                                                        <Check size={20} strokeWidth={3} />
                                                    </div>
                                                </div>
                                            )}
                                        </figure>

                                        {/* Content */}
                                        <div className="card-body gap-0 p-5">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <div className="mb-2 flex flex-wrap gap-2">
                                                        {workout.muscleGroups.slice(0, 2).map((muscle) => (
                                                            <span
                                                                key={muscle}
                                                                className="badge rounded-none border border-white/10 bg-white/[0.04] px-2.5 py-3 text-[9px] font-bold uppercase tracking-[0.08em] text-white/50"
                                                            >
                                                                {muscle}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <h2
                                                        className={`text-xl font-black uppercase leading-tight tracking-[-0.025em] ${completed
                                                            ? "text-white/40 line-through"
                                                            : "text-white"
                                                            }`}
                                                    >
                                                        {workout.name}
                                                    </h2>

                                                    <p className="mt-2 text-xs font-medium text-white/40">
                                                        {workout.equipment}
                                                    </p>
                                                </div>

                                                {/* Remove */}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemove(workout.id)}
                                                    className="btn btn-circle btn-ghost btn-sm shrink-0 text-white/30 hover:bg-white/10 hover:text-red-400"
                                                    aria-label={`Remove ${workout.name}`}
                                                >
                                                    <X size={17} />
                                                </button>
                                            </div>

                                            {/* Stats */}
                                            <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-white/10 pt-4">
                                                <div className="flex items-center gap-1.5 text-white/45">
                                                    <Clock3 size={14} />
                                                    <span className="text-xs font-semibold">
                                                        {workout.duration} min
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-1.5 text-white/45">
                                                    <Flame size={14} />
                                                    <span className="text-xs font-semibold">
                                                        {workout.caloriesBurned} kcal
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-1.5 text-[#CCFF00]">
                                                    <Star size={14} fill="currentColor" />
                                                    <span className="text-xs font-bold">
                                                        {workout.rating}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                                                <Link
                                                    href={`/workout/${workout.id}`}
                                                    className="btn h-10 min-h-10 flex-1 rounded-none border border-white/15 bg-transparent text-[10px] font-black uppercase tracking-[0.08em] text-white shadow-none hover:border-white/30 hover:bg-white/5"
                                                >
                                                    View Details
                                                    <ArrowUpRight size={14} />
                                                </Link>

                                                {activeTab === "plan" && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleMarkAsDone(workout.id)}
                                                        disabled={completed}
                                                        className={`btn h-10 min-h-10 flex-1 rounded-none border-0 text-[10px] font-black uppercase tracking-[0.08em] shadow-none ${completed
                                                            ? "bg-white/10 text-white/30"
                                                            : "bg-[#CCFF00] text-black hover:bg-[#d9ff4d]"
                                                            }`}
                                                    >
                                                        <Check size={14} />
                                                        {completed ? "Completed" : "Mark As Done"}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Toast */}
            {toast && (
                <div className="toast toast-end toast-bottom z-[100]">
                    <div className="alert border border-white/10 bg-[#161616] text-white shadow-2xl">
                        <Check size={18} className="text-[#CCFF00]" />
                        <span className="text-sm font-medium">{toast}</span>
                    </div>
                </div>
            )}
        </main>
    );
};

export default MyPlan;