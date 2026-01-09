import DetailPageLayout from "../../components/DetailPageLayout";
import DetailCard from "../../components/DetailCard";
import { ListSkeleton, SearchBarSkeleton } from "../../components/LoadingSkeleton";

export default function LocationDetailLoading() {
  return (
    <DetailPageLayout
      title="Loading..."
      subtitle={
        <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-64 animate-pulse" />
      }
      accentColor="from-gray-400 to-gray-500"
    >
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <DetailCard key={i}>
            <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-48 mb-4 animate-pulse" />
            <SearchBarSkeleton />
            <ListSkeleton count={6} />
          </DetailCard>
        ))}
      </div>
    </DetailPageLayout>
  );
}
