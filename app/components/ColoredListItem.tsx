"use client";

import Link from "next/link";

interface ColoredListItemProps {
  name: string;
  href: string;
  formattedName: string;
  colorClass: string;
  isLoading?: boolean;
}

export default function ColoredListItem({
  name,
  href,
  formattedName,
  colorClass,
  isLoading = false,
}: ColoredListItemProps) {

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
