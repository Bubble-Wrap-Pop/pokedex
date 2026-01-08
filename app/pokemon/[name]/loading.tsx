import DetailCard from "../../components/DetailCard";
import { SpriteSkeleton, StatBarSkeleton } from "../../components/LoadingSkeleton";
import BackButton from "../../components/BackButton";

export default function PokemonDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <BackButton />
      <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded w-48 mb-2 animate-pulse"></div>
      
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

      {/* Locations */}
      <DetailCard title="Locations" className="mb-8">
        <div className="h-32 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
      </DetailCard>

      {/* Moves */}
      <DetailCard title="Moves">
        <div className="h-32 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
      </DetailCard>
    </div>
  );
}
