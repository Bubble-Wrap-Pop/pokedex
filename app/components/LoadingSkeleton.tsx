interface LoadingSkeletonProps {
  className?: string;
}

export function CardSkeleton({ className = "" }: LoadingSkeletonProps) {
  return (
    <div
      className={`p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 animate-pulse ${className}`}
    >
      <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
    </div>
  );
}

export function ListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function SearchBarSkeleton() {
  return (
    <div className="mb-4 flex items-center justify-between gap-2">
      <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded-lg w-full animate-pulse"></div>
      <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-20 animate-pulse"></div>
    </div>
  );
}

export function StatBarSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i}>
          <div className="flex justify-between mb-1">
            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-24 animate-pulse"></div>
            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-8 animate-pulse"></div>
          </div>
          <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}

export function SpriteSkeleton() {
  return (
    <div className="w-40 h-40 bg-zinc-200 dark:bg-zinc-700 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 animate-pulse"></div>
  );
}

export function DetailCardSkeleton() {
  return (
    <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 animate-pulse">
      <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-32 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-full"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-5/6"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-4/6"></div>
      </div>
    </div>
  );
}

interface ListPageLoadingProps {
  title: string;
  skeletonCount?: number;
}

export function ListPageLoading({ 
  title, 
  skeletonCount = 12 
}: ListPageLoadingProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 capitalize text-black dark:text-zinc-50">
        {title}
      </h1>
      <SearchBarSkeleton />
      <ListSkeleton count={skeletonCount} />
    </div>
  );
}