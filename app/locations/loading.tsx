import { ListPageLoading } from "../components/LoadingSkeleton";

export default function LocationsLoading() {
  return <ListPageLoading title="Locations" skeletonCount={12} />;
}
