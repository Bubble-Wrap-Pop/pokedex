import BackButton from "./BackButton";

interface DetailPageLayoutProps {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}

export default function DetailPageLayout({
  title,
  subtitle,
  children,
}: DetailPageLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <BackButton />
      <h1 className="text-4xl font-bold mb-2 text-black dark:text-zinc-50">
        {title}
      </h1>
      {subtitle && (
        <div className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
          {subtitle}
        </div>
      )}
      {children}
    </div>
  );
}
