"use client";

import { useState, useEffect, useMemo, useDeferredValue, useCallback } from "react";
import Link from "next/link";
import { formatName, formatGenerationName } from "../lib/format";
import { UI_CONFIG } from "../lib/constants";
import ColoredListItem from "./ColoredListItem";

type ListItem = { name: string };

interface SearchableListProps {
  title: string;
  items: Array<ListItem>;
  hrefPattern: string;
  titleSize?: "large" | "medium";
  formatType?: "default" | "generation";
  itemsPerPage?: number;
  getItemColor?: (name: string) => Promise<string>;
}

export default function SearchableList({
  title,
  items,
  hrefPattern,
  titleSize = "large",
  formatType = "default",
  itemsPerPage = UI_CONFIG.ITEMS_PER_PAGE,
  getItemColor,
}: SearchableListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);
  const [colorMap, setColorMap] = useState<Record<string, string>>({});
  const [isLoadingColors, setIsLoadingColors] = useState(false);

  // Defer search query for better performance
  const deferredSearchQuery = useDeferredValue(searchQuery);

  // Reset visible items when search query changes
  useEffect(() => {
    setVisibleCount(itemsPerPage);
  }, [searchQuery, itemsPerPage]);

  const formatItemName = useCallback(
    (name: string) => {
      if (formatType === "generation") {
        return formatGenerationName(name);
      }
      return formatName(name);
    },
    [formatType]
  );

  // Memoize filtered items for better performance
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const formattedName = formatItemName(item.name);
      return formattedName.toLowerCase().includes(deferredSearchQuery.toLowerCase());
    });
  }, [items, deferredSearchQuery, formatItemName]);

  // Show-more calculations
  const totalFiltered = filteredItems.length;
  const displayedEnd = Math.min(visibleCount, totalFiltered);
  const paginatedItems = filteredItems.slice(0, displayedEnd);

  // Batch fetch colors for visible items
  useEffect(() => {
    if (!getItemColor || paginatedItems.length === 0) {
      return;
    }

    // Only fetch colors for items we don't already have
    const itemsToFetch = paginatedItems.filter((item) => !colorMap[item.name]);
    
    if (itemsToFetch.length === 0) {
      setIsLoadingColors(false);
      return;
    }

    let cancelled = false;
    setIsLoadingColors(true);

    const fetchColors = async () => {
      try {
        // Fetch all colors in parallel
        const colorPromises = itemsToFetch.map(async (item) => {
          try {
            const color = await getItemColor(item.name);
            return { name: item.name, color };
          } catch {
            return { name: item.name, color: "from-gray-400 to-gray-500" };
          }
        });

        const results = await Promise.all(colorPromises);
        
        if (!cancelled) {
          const newColorMap: Record<string, string> = {};
          results.forEach(({ name, color }) => {
            newColorMap[name] = color;
          });
          setColorMap((prev) => ({ ...prev, ...newColorMap }));
          setIsLoadingColors(false);
        }
      } catch {
        if (!cancelled) {
          setIsLoadingColors(false);
        }
      }
    };

    fetchColors();

    return () => {
      cancelled = true;
    };
  }, [paginatedItems, getItemColor, colorMap]);

  const titleClassName =
    titleSize === "large"
      ? "text-3xl font-bold mb-6 capitalize text-black dark:text-zinc-50"
      : "text-2xl font-semibold mb-4 capitalize text-black dark:text-zinc-50";

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + itemsPerPage, totalFiltered));
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
          aria-describedby={`search-results-${title.toLowerCase().replace(/\s+/g, "-")}`}
        />
        <span className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap" aria-live="polite">
          {searchQuery.trim().length > 0
            ? `${totalFiltered} of ${items.length}`
            : `${items.length}`}
        </span>
      </div>

      {items.length === 0 ? (
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

              // Use ColoredListItem if getItemColor is provided
              if (getItemColor) {
                return (
                  <ColoredListItem
                    key={item.name}
                    name={item.name}
                    href={href}
                    formattedName={formattedName}
                    colorClass={colorMap[item.name] || "from-gray-400 to-gray-500"}
                    isLoading={!colorMap[item.name] && isLoadingColors}
                  />
                );
              }

              // Default styling without colors
              const content = (
                <h3 className="font-semibold text-lg text-black dark:text-zinc-50">
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

      {items.length > 0 && filteredItems.length === 0 && (
        <div
          className="text-center py-12 text-zinc-600 dark:text-zinc-400"
          role="status"
          aria-live="polite"
        >
          No {title} found matching "{deferredSearchQuery}"
        </div>
      )}
    </div>
  );
}
