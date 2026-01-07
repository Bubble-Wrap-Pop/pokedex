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
    <nav className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex space-x-8 px-4 sm:px-6 lg:px-8">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || (pathname === "/" && tab.href === "/pokemon");
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                isActive
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-300"
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
