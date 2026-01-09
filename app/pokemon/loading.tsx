import { ListPageLoading } from "../components/LoadingSkeleton";

export default function PokemonLoading() {
  return <ListPageLoading title="Pokemon" skeletonCount={12} />;
}
