"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabsNavigation() {
  const pathname = usePathname();

  const tabs = [
    { name: "Pokemon", href: "/pokemon" },
    { name: "Locations", href: "/locations" },
    { name: "Moves", href: "/moves" },
    { name: "Generations", href: "/generations" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-zinc-50 dark:bg-black border-b border-zinc-200 dark:border-zinc-800" aria-label="Main navigation">
      <div className="flex space-x-8 px-4 sm:px-6 lg:px-8" role="tablist">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href || (pathname === "/" && tab.href === "/pokemon");
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-t ${
                  isActive
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-300"
                }`}
                role="tab"
                aria-selected={isActive}
                aria-current={isActive ? "page" : undefined}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </nav>
  );
}
