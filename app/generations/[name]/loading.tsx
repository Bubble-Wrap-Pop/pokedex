import DetailPageLayout from "../../components/DetailPageLayout";
import DetailCard from "../../components/DetailCard";
import { ListSkeleton, SearchBarSkeleton } from "../../components/LoadingSkeleton";

export default function GenerationDetailLoading() {
  return (
    <DetailPageLayout
      title="Loading..."
      subtitle={
        <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-64 animate-pulse" />
      }
      accentColor="from-gray-400 to-gray-500"
    >
      <DetailCard>
        <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-48 mb-4 animate-pulse" />
        <SearchBarSkeleton />
        <ListSkeleton count={12} />
      </DetailCard>
    </DetailPageLayout>
  );
}
