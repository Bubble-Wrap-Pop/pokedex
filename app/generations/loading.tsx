import { ListSkeleton, SearchBarSkeleton } from "../components/LoadingSkeleton";

export default function GenerationsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 capitalize text-black dark:text-zinc-50">
        Generations
      </h1>
      <SearchBarSkeleton />
      <ListSkeleton count={8} />
    </div>
  );
}
