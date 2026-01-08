import { ListSkeleton, SearchBarSkeleton } from "../components/LoadingSkeleton";

export default function MovesLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 capitalize text-black dark:text-zinc-50">
        Moves
      </h1>
      <SearchBarSkeleton />
      <ListSkeleton count={12} />
    </div>
  );
}
