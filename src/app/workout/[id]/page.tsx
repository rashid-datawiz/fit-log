import { notFound } from "next/navigation";
import {
  Clock3,
  Flame,
  Gauge,
  ListChecks,
  Star,
} from "lucide-react";

import WorkoutActions from "@/components/WorkoutActions";
import { Workout } from "@/types/workout";
import Image from "next/image";

const getWorkoutById = async (
  id: string
): Promise<Workout | null> => {
  const res = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  return data;
};

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const WorkoutDetailsPage = async ({
  params,
}: WorkoutDetailsPageProps) => {
  const { id } = await params;

  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="bg-black">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16 lg:px-8 lg:py-20">

        {/* Breadcrumb */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/35">
            Workout Library
            <span className="mx-2 text-[#CCFF00]">/</span>
            {workout.name}
          </p>
        </div>

        {/* Main Details Card */}
        <div className="card overflow-hidden rounded-none border border-white/10 bg-[#0B0B0B] shadow-none">

          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">

            {/* Image */}
            <figure className="relative min-h-[420px] overflow-hidden bg-[#151515] lg:min-h-[680px]">
              <Image
                src={workout.image}
                alt={workout.name}
                width={588}
                height={735}
                className="absolute inset-0 object-cover"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Difficulty */}
              <div className="absolute left-5 top-5">
                <span className="badge rounded-none border-0 bg-[#CCFF00] px-4 py-4 text-[10px] font-black uppercase tracking-wider text-black">
                  {workout.difficulty}
                </span>
              </div>

              {/* Rating */}
              <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-black/80 px-4 py-2.5 backdrop-blur-sm">
                <Star
                  size={15}
                  fill="currentColor"
                  className="text-[#CCFF00]"
                />

                <span className="text-sm font-bold text-white">
                  {workout.rating}
                </span>

                <span className="text-xs text-white/40">
                  Rating
                </span>
              </div>
            </figure>

            {/* Content */}
            <div className="card-body gap-0 p-6 sm:p-8 lg:p-10">

              {/* Eyebrow */}
              <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#CCFF00]">
                Exercise Details
              </p>

              {/* Title */}
              <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl">
                {workout.name}
              </h1>

              {/* Muscle Groups */}
              <div className="mt-6 flex flex-wrap gap-2">
                {workout.muscleGroups.map((muscle) => (
                  <span
                    key={muscle}
                    className="badge rounded-none border border-white/15 bg-white/[0.04] px-3 py-3 text-[10px] font-bold uppercase tracking-[0.08em] text-white/65"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="mt-6 text-sm leading-7 text-white/50">
                {workout.description}
              </p>

              {/* Key Stats */}
              <div className="mt-8 grid grid-cols-2 border-y border-white/10">

                <div className="border-b border-r border-white/10 p-4 sm:p-5">
                  <div className="mb-2 flex items-center gap-2 text-white/35">
                    <Gauge size={15} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Equipment
                    </span>
                  </div>

                  <p className="text-sm font-bold text-white">
                    {workout.equipment}
                  </p>
                </div>

                <div className="border-b border-white/10 p-4 sm:p-5">
                  <div className="mb-2 flex items-center gap-2 text-white/35">
                    <ListChecks size={15} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Sets / Reps
                    </span>
                  </div>

                  <p className="text-sm font-bold text-white">
                    {workout.sets} × {workout.reps}
                  </p>
                </div>

                <div className="border-r border-white/10 p-4 sm:p-5">
                  <div className="mb-2 flex items-center gap-2 text-white/35">
                    <Clock3 size={15} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Duration
                    </span>
                  </div>

                  <p className="text-sm font-bold text-white">
                    {workout.duration} minutes
                  </p>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="mb-2 flex items-center gap-2 text-white/35">
                    <Flame size={15} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Calories
                    </span>
                  </div>

                  <p className="text-sm font-bold text-white">
                    {workout.caloriesBurned} kcal
                  </p>
                </div>

              </div>

              {/* Instructions */}
              <div className="mt-8">
                <h2 className="text-sm font-black uppercase tracking-[0.12em] text-white">
                  How To Perform
                </h2>

                <ol className="mt-5 space-y-4">
                  {workout.instructions.map(
                    (instruction, index) => (
                      <li
                        key={instruction}
                        className="flex gap-4"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#CCFF00]/40 text-[10px] font-black text-[#CCFF00]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <p className="pt-1 text-sm leading-6 text-white/50">
                          {instruction}
                        </p>
                      </li>
                    )
                  )}
                </ol>
              </div>

              {/* Actions */}
              <WorkoutActions workout={workout} />

            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WorkoutDetailsPage;