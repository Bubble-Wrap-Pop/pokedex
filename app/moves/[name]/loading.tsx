import DetailPageLayout from "../../components/DetailPageLayout";
import DetailCard from "../../components/DetailCard";
import { ListSkeleton, SearchBarSkeleton } from "../../components/LoadingSkeleton";

export default function MoveDetailLoading() {
  return (
    <DetailPageLayout
      title="Loading..."
      accentColor="from-gray-400 to-gray-500"
    >
      {/* Type & Category */}
      <DetailCard title="Type & Category" className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-16 mb-2 animate-pulse"></div>
            <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded-lg w-24 animate-pulse"></div>
          </div>
          <div>
            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-24 mb-2 animate-pulse"></div>
            <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-32 animate-pulse"></div>
          </div>
        </div>
      </DetailCard>

      {/* Stats */}
      <DetailCard title="Stats" className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-20 mb-2 animate-pulse"></div>
              <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-16 animate-pulse"></div>
            </div>
          ))}
        </div>
      </DetailCard>

      {/* Flavor Text */}
      <DetailCard title="Flavor Text" className="mb-8">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded w-32 mb-2 animate-pulse"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </DetailCard>

      {/* Pokemon that can learn this move */}
      <DetailCard>
        <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-64 mb-4 animate-pulse" />
        <SearchBarSkeleton />
        <ListSkeleton count={8} />
      </DetailCard>
    </DetailPageLayout>
  );
}
