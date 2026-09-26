"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import WorkoutCard from "@/components/WorkoutCard";
import { Workout } from "@/types/workout";

interface WorkoutLibraryContentProps {
  workouts: Workout[];
}

type SortOption = "duration" | "calories" | "rating";

const WorkoutLibraryContent = ({
  workouts,
}: WorkoutLibraryContentProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const sortedWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) => {
      if (sortBy === "duration") {
        return b.duration - a.duration;
      }

      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }

      return b.rating - a.rating;
    });
  }, [workouts, sortBy]);

  return (
    <section id="library" className="bg-black">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-[#CCFF00]">
              Workout Library
            </p>

            <h2 className="text-4xl font-black uppercase tracking-[-0.04em] text-white sm:text-5xl">
              The Library
            </h2>

            <p className="mt-3 text-sm text-white/40 sm:text-base">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/35">
              Sort By
            </span>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="select select-bordered h-11 min-h-11 w-40 appearance-none rounded-none border-white/15 bg-[#0B0B0B] px-4 pr-10 text-xs font-bold uppercase tracking-wide text-white outline-none focus:border-[#CCFF00] focus:outline-none"
                aria-label="Sort workouts"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
              />
            </div>
          </div>
        </div>

        {/* Workout Count */}
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-widest text-white/30">
            {sortedWorkouts.length} Exercises
          </p>
        </div>

        {/* Workout Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkoutLibraryContent;