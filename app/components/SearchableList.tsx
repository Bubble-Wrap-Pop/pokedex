"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatName } from "../lib/format";
import { ITEMS_PER_PAGE } from "../lib/constants";

type ListItem = { name: string };

interface SearchableListProps {
  title: string;
  apiUrl?: string;
  items?: Array<ListItem>;
  hrefPattern: string;
  titleSize?: "large" | "medium";
  formatName?: (name: string) => string;
}

export default function SearchableList({
  title,
  apiUrl,
  items: itemsProp,
  hrefPattern,
  titleSize = "large",
  formatName: formatNameProp,
}: SearchableListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<Array<ListItem>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    if (itemsProp) {
      setItems(itemsProp);
      setLoading(false);
      setError(null);
    } else if (apiUrl) {
      fetchItems();
    } else {
      setLoading(false);
      setItems([]);
    }
  }, [apiUrl, itemsProp]);

  // Reset visible items when search query changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchQuery]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(apiUrl!);
      const data = await response.json();
      setItems(data.results || []);
    } catch (err) {
      setError("Unable to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatItemName = (name: string) => {
    if (formatNameProp) {
      return formatNameProp(name);
    }
    return formatName(name);
  };

  const filteredItems = items.filter((item) => {
    const formattedName = formatItemName(item.name);
    return formattedName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Show-more calculations
  const totalFiltered = filteredItems.length;
  const displayedEnd = Math.min(visibleCount, totalFiltered);
  const paginatedItems = filteredItems.slice(0, displayedEnd);

  const titleClassName =
    titleSize === "large"
      ? "text-3xl font-bold mb-6 capitalize text-black dark:text-zinc-50"
      : "text-2xl font-semibold mb-4 capitalize text-black dark:text-zinc-50";

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, totalFiltered));
  };

  return (
    <div className={titleSize === "large" ? "container mx-auto px-4 py-8 max-w-6xl" : ""}>
      {titleSize === "large" ? (
        <h1 className={titleClassName}>{title}</h1>
      ) : (
        <h2 className={titleClassName}>{title}</h2>
      )}

      <div className="mb-4 flex items-center justify-between gap-2">
        <label htmlFor={`search-${title.toLowerCase().replace(/\s+/g, "-")}`} className="sr-only">
          Search {title}
        </label>
        <input
          id={`search-${title.toLowerCase().replace(/\s+/g, "-")}`}
          type="search"
          placeholder={`Search ${title}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          aria-label={`Search ${title}`}
          aria-describedby={
            loading ? undefined : `search-results-${title.toLowerCase().replace(/\s+/g, "-")}`
          }
        />
        {!loading && (
          <span className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap" aria-live="polite">
            {searchQuery.trim().length > 0
              ? `${totalFiltered} of ${items.length}`
              : `${items.length}`}
          </span>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12 text-zinc-600 dark:text-zinc-400" role="status" aria-live="polite">
          Loading...
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-600 dark:text-red-400" role="status" aria-live="polite">
          {error}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-zinc-600 dark:text-zinc-400" role="status" aria-live="polite">
          No {title.toLowerCase()} available.
        </div>
      ) : (
        <>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            role="list"
            id={`search-results-${title.toLowerCase().replace(/\s+/g, "-")}`}
            aria-label={`${title} search results`}
          >
            {paginatedItems.map((item) => {
              const formattedName = formatItemName(item.name);
              const href = hrefPattern.replace("{name}", item.name);
              const content = (
                <h3
                  className={`font-semibold text-lg text-black dark:text-zinc-50 ${
                    formatNameProp ? "" : "capitalize"
                  }`}
                >
                  {formattedName}
                </h3>
              );

              return (
                <Link
                  key={item.name}
                  href={href}
                  className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
                  role="listitem"
                  aria-label={`View ${formattedName} details`}
                >
                  {content}
                </Link>
              );
            })}
          </div>

          {/* Show more control */}
          {displayedEnd < totalFiltered && (
            <div className="mt-8 flex items-center justify-center" role="navigation" aria-label="Show more">
              <button
                onClick={handleShowMore}
                className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                Show more
              </button>
            </div>
          )}
        </>
      )}

      {!loading && !error && items.length > 0 && filteredItems.length === 0 && (
        <div
          className="text-center py-12 text-zinc-600 dark:text-zinc-400"
          role="status"
          aria-live="polite"
        >
          No {title} found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}
