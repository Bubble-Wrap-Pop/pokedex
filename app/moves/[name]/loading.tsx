import DetailCard from "../../components/DetailCard";
import { ListSkeleton, SearchBarSkeleton } from "../../components/LoadingSkeleton";
import BackButton from "../../components/BackButton";

export default function MoveDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <BackButton />
      <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded w-48 mb-2 animate-pulse"></div>
      
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

      <DetailCard title="Pokemon that can learn this move">
        <SearchBarSkeleton />
        <ListSkeleton count={8} />
      </DetailCard>
    </div>
  );
}
