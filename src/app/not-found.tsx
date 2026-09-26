import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";

const NotFound = () => {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-black px-5">
      <div className="w-full max-w-xl text-center">
        {/* Small Brand Label */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center border border-[#CCFF00]/30 bg-[#CCFF00]/5">
            <Dumbbell
              size={24}
              className="text-[#CCFF00]"
              strokeWidth={2}
            />
          </div>
        </div>

        {/* 404 */}
        <p className="text-[100px] font-black leading-none tracking-[-0.08em] text-white sm:text-[140px]">
          404
        </p>

        <p className="mt-2 text-xs font-black uppercase tracking-[0.25em] text-[#CCFF00]">
          Page Not Found
        </p>

        <h1 className="mt-4 text-2xl font-black uppercase tracking-[-0.03em] text-white sm:text-3xl">
          This Workout Doesn't Exist
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/40">
          The page you're looking for doesn't exist or the workout may have
          been removed from the FitLog library.
        </p>

        {/* Back Button */}
        <Link
          href="/"
          className="btn mt-8 h-12 min-h-12 rounded-none border-0 bg-[#CCFF00] px-6 text-xs font-black uppercase tracking-[0.08em] text-black shadow-none hover:bg-[#d9ff4d]"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
          Back To Workouts
        </Link>
      </div>
    </main>
  );
};

export default NotFound;