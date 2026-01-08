interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <p className="text-zinc-600 dark:text-zinc-400">{message}</p>
  );
}
