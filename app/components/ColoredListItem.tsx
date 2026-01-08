"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ColoredListItemProps {
  name: string;
  href: string;
  formattedName: string;
  getItemColor: (name: string) => Promise<string>;
}

export default function ColoredListItem({
  name,
  href,
  formattedName,
  getItemColor,
}: ColoredListItemProps) {
  const [colorClass, setColorClass] = useState<string>("from-gray-400 to-gray-500");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchColor = async () => {
      try {
        const color = await getItemColor(name);
        if (!cancelled) {
          setColorClass(color);
          setIsLoading(false);
        }
      } catch {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchColor();

    return () => {
      cancelled = true;
    };
  }, [name, getItemColor]);

  return (
    <Link
      href={href}
      className={`p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-gradient-to-br ${colorClass} hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer ${
        isLoading ? "opacity-50" : ""
      }`}
      role="listitem"
      aria-label={`View ${formattedName} details`}
    >
      <h3 className="font-semibold text-lg text-white drop-shadow-sm">
        {formattedName}
      </h3>
    </Link>
  );
}
