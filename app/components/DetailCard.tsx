interface DetailCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function DetailCard({ title, children, className = "" }: DetailCardProps) {
  return (
    <div
      className={`bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800 ${className}`}
    >
      {title && (
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
