export default function Loading() {
  return (
    <main
      aria-label="Loading workout library"
      aria-busy="true"
      className="min-h-[60vh] bg-black"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
        <div className="mb-10 space-y-4">
          <div className="h-3 w-32 animate-pulse rounded bg-[#CCFF00]/40" />
          <div className="h-10 w-64 max-w-full animate-pulse rounded bg-white/10" />
          <div className="h-4 w-80 max-w-full animate-pulse rounded bg-white/10" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-56 animate-pulse rounded-lg border border-white/10 bg-white/[0.04]"
            />
          ))}
        </div>
        <span className="sr-only">Loading workouts...</span>
      </div>
    </main>
  );
}