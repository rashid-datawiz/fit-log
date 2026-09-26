import WorkoutLibraryContent from "@/components/WorkoutLibraryContent";
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

  return <WorkoutLibraryContent workouts={workouts} />;
};

export default WorkoutLibrary;