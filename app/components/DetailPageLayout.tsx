import BackButton from "./BackButton";

interface DetailPageLayoutProps {
  title: string;
  subtitle?: React.ReactNode;
  accentColor?: string;
  children: React.ReactNode;
}

export default function DetailPageLayout({
  title,
  subtitle,
  accentColor,
  children,
}: DetailPageLayoutProps) {
  return (
    <>
      {accentColor && (
        <div className={`sticky top-[54px] z-40 h-2 bg-gradient-to-r ${accentColor} w-full`} />
      )}
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
    </>
  );
}
