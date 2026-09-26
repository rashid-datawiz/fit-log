import Image from "next/image";
import Link from "next/link";
import {
    Clock3,
    Flame,
    Star,
    ArrowUpRight,
} from "lucide-react";

import { Workout } from "@/types/workout";

interface WorkoutCardProps {
    workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
    return (
        <Link
            href={`/workout/${workout.id}`}
            className="card group overflow-hidden rounded-none border border-white/10 bg-[#0B0B0B] shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
        >

            {/* Image */}
            <figure className="relative aspect-[16/10] overflow-hidden bg-[#151515]">
                <Image
                    src={workout.image}
                    alt={workout.name}
                    width={80}
                    height={120}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Difficulty */}
                <div className="absolute left-3 top-3">
                    <span className="badge rounded-none border border-black/20 bg-[#CCFF00] px-3 py-3 text-[10px] font-black uppercase tracking-wide text-black">
                        {workout.difficulty}
                    </span>
                </div>

                {/* Arrow */}
                <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center bg-black text-white transition group-hover:bg-[#CCFF00] group-hover:text-black">
                    <ArrowUpRight size={17} strokeWidth={2.5} />
                </div>
            </figure>

            {/* Content */}
            <div className="card-body gap-0 p-5">

                {/* Muscle Groups */}
                <div className="mb-3 flex flex-wrap gap-2">
                    {workout.muscleGroups.map((muscle) => (
                        <span
                            key={muscle}
                            className="badge rounded-none border border-white/10 bg-white/[0.04] px-2.5 py-3 text-[9px] font-bold uppercase tracking-[0.08em] text-white/55"
                        >
                            {muscle}
                        </span>
                    ))}
                </div>

                {/* Name */}
                <h3 className="text-xl font-black uppercase leading-tight tracking-[-0.025em] text-white transition-colors group-hover:text-[#CCFF00]">
                    {workout.name}
                </h3>

                {/* Equipment */}
                <p className="mt-2 text-xs font-medium text-white/40">
                    {workout.equipment}
                </p>

                {/* Stats */}
                <div className="mt-5 flex items-center gap-4 border-t border-white/10 pt-4">

                    <div className="flex items-center gap-1.5 text-white/50">
                        <Clock3 size={14} />
                        <span className="text-xs font-semibold">
                            {workout.duration} min
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-white/50">
                        <Flame size={14} />
                        <span className="text-xs font-semibold">
                            {workout.caloriesBurned} kcal
                        </span>
                    </div>

                    <div className="ml-auto flex items-center gap-1.5 text-[#CCFF00]">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-bold">
                            {workout.rating}
                        </span>
                    </div>

                </div>
            </div>
        </Link>
    );
};

export default WorkoutCard;