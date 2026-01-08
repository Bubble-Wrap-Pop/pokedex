import DetailCard from "../../components/DetailCard";
import { ListSkeleton, SearchBarSkeleton } from "../../components/LoadingSkeleton";
import BackButton from "../../components/BackButton";

export default function GenerationDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <BackButton />
      <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded w-48 mb-2 animate-pulse"></div>
      <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-64 mb-8 animate-pulse"></div>
      
      <DetailCard title="Pokemon Species">
        <SearchBarSkeleton />
        <ListSkeleton count={12} />
      </DetailCard>
    </div>
  );
}
