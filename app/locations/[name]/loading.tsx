import DetailCard from "../../components/DetailCard";
import { ListSkeleton, SearchBarSkeleton } from "../../components/LoadingSkeleton";
import BackButton from "../../components/BackButton";

export default function LocationDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <BackButton />
      <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded w-48 mb-2 animate-pulse"></div>
      
      <DetailCard title="Region" className="mb-8">
        <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-32 animate-pulse"></div>
      </DetailCard>

      <DetailCard title="Areas">
        <SearchBarSkeleton />
        <ListSkeleton count={8} />
      </DetailCard>
    </div>
  );
}
