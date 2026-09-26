import WorkoutCard from "@/components/WorkoutCard";
import { Workout } from "@/types/workout";

const getWorkouts = async (): Promise<Workout[]> => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/fitlog"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const data = await res.json();

  return data;
};

const WorkoutLibrary = async () => {
  const workouts = await getWorkouts();

  return (
    <section
      id="library"
      className="bg-black"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8 lg:py-24">

        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

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

          <p className="text-xs font-bold uppercase tracking-widest text-white/30">
            {workouts.length} Exercises
          </p>

        </div>

        {/* Workout Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
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

export default WorkoutLibrary;