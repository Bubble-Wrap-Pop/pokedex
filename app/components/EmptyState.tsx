interface EmptyStateProps {
  message: string;
  title?: string;
}

export default function EmptyState({ message, title }: EmptyStateProps) {
  return (
    <>
      {title && (
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
          {title}
        </h2>
      )}
      <p className="text-zinc-600 dark:text-zinc-400">{message}</p>
    </>
  );
}
