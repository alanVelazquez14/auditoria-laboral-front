"use client";

export function HomeLoadingState() {
  return (
    <div className="mx-10 max-w-7xl space-y-8">
      <div className="overflow-hidden rounded-[28px] border border-white/6 bg-[#111118] p-7 shadow-xl">
        <div className="h-3 w-40 animate-pulse rounded-full bg-white/10" />
        <div className="mt-5 h-10 w-2/3 animate-pulse rounded-2xl bg-white/8" />
        <div className="mt-3 h-4 w-3/4 animate-pulse rounded-full bg-white/8" />
        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_280px]">
          <div className="h-24 animate-pulse rounded-3xl bg-white/6" />
          <div className="h-24 animate-pulse rounded-3xl bg-white/6" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="min-h-35 animate-pulse rounded-2xl border border-white/5 bg-[#111118] p-6"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="h-[390px] animate-pulse rounded-2xl border border-white/5 bg-[#111118] lg:col-span-4" />
        <div className="h-[390px] animate-pulse rounded-2xl border border-white/5 bg-[#111118] lg:col-span-8" />
      </div>
    </div>
  );
}
