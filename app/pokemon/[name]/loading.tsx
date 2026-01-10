import DetailPageLayout from "../../components/DetailPageLayout";
import DetailCard from "../../components/DetailCard";
import { ListSkeleton, SearchBarSkeleton, SpriteSkeleton, StatBarSkeleton } from "../../components/LoadingSkeleton";

export default function PokemonDetailLoading() {
  return (
    <DetailPageLayout
      title="Loading..."
      accentColor="from-gray-400 to-gray-500"
    >
      {/* Types */}
      <DetailCard title="Types" className="mb-8">
        <div className="flex flex-wrap gap-3">
          <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded-lg w-24 animate-pulse"></div>
          <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded-lg w-24 animate-pulse"></div>
        </div>
      </DetailCard>

      {/* Abilities */}
      <DetailCard title="Abilities" className="mb-8">
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-14 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
          ))}
        </div>
      </DetailCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Sprites */}
        <DetailCard title="Sprites">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-16 mb-3 animate-pulse"></div>
              <SpriteSkeleton />
            </div>
            <div className="flex flex-col items-center">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-16 mb-3 animate-pulse"></div>
              <SpriteSkeleton />
            </div>
          </div>
        </DetailCard>

        {/* Stats */}
        <DetailCard title="Stats">
          <StatBarSkeleton />
        </DetailCard>
      </div>

      {/* Evolution Chain */}
      <DetailCard title="Evolution Chain" className="mb-8">
        <div className="flex flex-col items-center gap-4 md:gap-6">
          {/* Base Pokemon */}
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse"></div>
            <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded w-20 animate-pulse"></div>
            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-12 animate-pulse"></div>
          </div>
          {/* Arrow */}
          <div className="flex flex-col items-center text-zinc-400 dark:text-zinc-600">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
          </div>
          {/* Evolutions (can be linear or branching) */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse"></div>
                <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-12 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </DetailCard>

      {/* Locations */}
      <DetailCard className="mb-8">
        <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-32 mb-4 animate-pulse" />
        <SearchBarSkeleton />
        <ListSkeleton count={8} />
      </DetailCard>

      {/* Moves */}
      <DetailCard>
        <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-32 mb-4 animate-pulse" />
        <SearchBarSkeleton />
        <ListSkeleton count={8} />
      </DetailCard>
    </DetailPageLayout>
  );
}
