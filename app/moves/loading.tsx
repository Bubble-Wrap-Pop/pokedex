import { ListPageLoading } from "../components/LoadingSkeleton";

export default function MovesLoading() {
  return <ListPageLoading title="Moves" skeletonCount={12} />;
}
