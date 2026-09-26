"use client";

import { Check, BookmarkPlus, Dumbbell } from "lucide-react";
import { useEffect, useState } from "react";

import { Workout } from "@/types/workout";
import { useWorkout } from "@/context/WorkoutContext";

interface WorkoutActionsProps {
  workout: Workout;
}

const WorkoutActions = ({
  workout,
}: WorkoutActionsProps) => {
  const {
    addToPlan,
    saveWorkout,
    isInPlan,
    isSaved,
    plan,
  } = useWorkout();

  const [toast, setToast] = useState<string | null>(null);

  const alreadyInPlan = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);
  const planIsFull = plan.length >= 5;

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleAddToPlan = () => {
    if (alreadyInPlan) {
      setToast("This workout is already in today's plan.");
      return;
    }

    if (planIsFull) {
      setToast("Today's plan can contain a maximum of 5 lifts.");
      return;
    }

    addToPlan(workout);
    setToast("Workout added to today's plan.");
  };

  const handleSave = () => {
    if (alreadySaved) {
      setToast("This workout is already saved.");
      return;
    }

    saveWorkout(workout);
    setToast("Workout saved for later.");
  };

  return (
    <>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">

        {/* Add To Plan */}
        <button
          type="button"
          onClick={handleAddToPlan}
          disabled={alreadyInPlan || planIsFull}
          className="btn h-12 min-h-12 flex-1 rounded-none border-0 bg-[#CCFF00] text-xs font-black uppercase tracking-[0.08em] text-black shadow-none hover:bg-[#d9ff4d] disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/10 disabled:text-white/30"
        >
          {alreadyInPlan ? (
            <>
              <Check size={17} />
              Added To Plan
            </>
          ) : (
            <>
              <Dumbbell size={17} />
              Add To Today's Plan
            </>
          )}
        </button>

        {/* Save */}
        <button
          type="button"
          onClick={handleSave}
          disabled={alreadySaved}
          className="btn h-12 min-h-12 flex-1 rounded-none border border-white/20 bg-transparent text-xs font-black uppercase tracking-[0.08em] text-white shadow-none hover:border-[#CCFF00] hover:bg-transparent hover:text-[#CCFF00] disabled:border-white/10 disabled:bg-transparent disabled:text-white/30"
        >
          {alreadySaved ? (
            <>
              <Check size={17} />
              Saved
            </>
          ) : (
            <>
              <BookmarkPlus size={17} />
              Save For Later
            </>
          )}
        </button>

      </div>

      {/* Toast Popup */}
      {toast && (
        <div className="toast toast-top toast-top z-[100]">
          <div className="alert border border-white/10 bg-[#161616] text-white shadow-2xl">
            <Check
              size={18}
              className="text-[#CCFF00]"
            />

            <span className="text-sm font-medium">
              {toast}
            </span>
          </div>
        </div>
      )}
    </>
  );
};


export default WorkoutActions;