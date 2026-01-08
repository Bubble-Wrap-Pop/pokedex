import EmptyState from "./EmptyState";

interface EmptyStateCardProps {
  title: string;
  message: string;
}

export default function EmptyStateCard({ title, message }: EmptyStateCardProps) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
        {title}
      </h2>
      <EmptyState message={message} />
    </>
  );
}
