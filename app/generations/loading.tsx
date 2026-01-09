import { ListPageLoading } from "../components/LoadingSkeleton";

export default function GenerationsLoading() {
  return <ListPageLoading title="Generations" skeletonCount={8} />;
}
