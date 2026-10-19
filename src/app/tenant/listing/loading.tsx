export default function ListingLoading() {
  return (
    <main className="px-4 py-6 mt-8">
      {/* Gallery Skeleton */}
      <div className="w-full">
        <div className="flex h-[550px] w-full gap-2 overflow-hidden rounded-xl">

          {/* Cover image */}
          <div className="w-3/4 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

          {/* Right side */}
          <div className="flex w-1/4 flex-col gap-2">

            {/* Second image */}
            <div className="min-h-0 flex-1 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

            {/* Four smaller images */}
            <div className="grid min-h-0 flex-1 grid-cols-2 gap-2">

              <div className="animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

              <div className="animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

              <div className="animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

              <div className="animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

            </div>
          </div>
        </div>
      </div>

      {/* Listing information skeleton */}
      <div className="mt-8 space-y-4">

        <div className="h-7 w-2/3 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />

        <div className="h-5 w-1/3 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />

        <div className="h-20 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />

      </div>
    </main>
  );
}