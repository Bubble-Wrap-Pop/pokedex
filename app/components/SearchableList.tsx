"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface SearchableListProps {
  title: string;
  apiUrl: string;
  hrefPattern: string;
}

export default function SearchableList({
  title,
  apiUrl,
  hrefPattern,
}: SearchableListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, [apiUrl]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      const data = await response.json();
      setItems(data.results || []);
    } catch (error) {
      console.error(`Error fetching ${title}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter((item) => {
    const formattedName = item.name.replace(/-/g, " ");
    return formattedName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-zinc-50">{title}</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder={`Search ${title}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => {
            const formattedName = item.name.replace(/-/g, " ");
            const href = hrefPattern.replace("{name}", item.name)
            const content = (
              <h3 className="font-semibold text-lg capitalize text-black dark:text-zinc-50">
                {formattedName}
              </h3>
            );


            return (
              <Link
                key={item.name}
                href={href}
                className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 hover:shadow-lg transition-shadow cursor-pointer"
              >
                {content}
              </Link>
            );
          })}
        </div>
      )}

      {!loading && filteredItems.length === 0 && (
        <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">
          No {title} found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}
