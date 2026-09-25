'use client';

import {createContext,useContext,useState,ReactNode} from "react";
import { Workout } from "@/types/workout";

interface WorkoutContextType {
  plan: Workout[];
  saved: Workout[];
  completed: number[];

  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;

  saveWorkout: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;

  markAsDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isCompleted: (id: number) => boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(
  undefined
);

export const WorkoutProvider = ({children,}: {
  children: ReactNode;
}) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);

  const addToPlan = (workout: Workout) => {
    setPlan((currentPlan) => {
      // Don't add duplicates
      if (currentPlan.some((item) => item.id === workout.id)) {
        return currentPlan;
      }

      // Maximum 5 workouts
      if (currentPlan.length >= 5) {
        return currentPlan;
      }

      return [...currentPlan, workout];
    });
  };

  const removeFromPlan = (id: number) => {
    setPlan((currentPlan) =>
      currentPlan.filter((workout) => workout.id !== id)
    );
  };

  const saveWorkout = (workout: Workout) => {
    setSaved((currentSaved) => {
      if (currentSaved.some((item) => item.id === workout.id)) {
        return currentSaved;
      }

      return [...currentSaved, workout];
    });
  };

  const removeFromSaved = (id: number) => {
    setSaved((currentSaved) =>
      currentSaved.filter((workout) => workout.id !== id)
    );
  };

  const markAsDone = (id: number) => {
    setCompleted((currentCompleted) => {
      if (currentCompleted.includes(id)) {
        return currentCompleted;
      }

      return [...currentCompleted, id];
    });
  };

  const isInPlan = (id: number) => {
    return plan.some((workout) => workout.id === id);
  };

  const isSaved = (id: number) => {
    return saved.some((workout) => workout.id === id);
  };

  const isCompleted = (id: number) => {
    return completed.includes(id);
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        completed,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeFromSaved,
        markAsDone,
        isInPlan,
        isSaved,
        isCompleted,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      "useWorkout must be used inside WorkoutProvider"
    );
  }

  return context;
};