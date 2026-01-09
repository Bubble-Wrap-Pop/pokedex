"use client";

import { useState, useEffect, useMemo } from "react";
import { getItemColorFunction, DEFAULT_COLOR } from "./colors";

/**
 * Hook to get the appropriate color fetching function based on item type.
 * This is the client-side wrapper around the color logic in colors.ts.
 */
export function useItemColor(colorType?: string) {
  return useMemo(() => {
    return getItemColorFunction(colorType);
  }, [colorType]);
}

/**
 * Hook to batch fetch colors for a list of items.
 * Handles caching, loading states, and cancellation.
 */
export function useBatchItemColors(
  items: Array<{ name: string }>,
  getItemColor?: ((name: string) => Promise<string>) | undefined
) {
  const [colorMap, setColorMap] = useState<Record<string, string>>({});
  const [isLoadingColors, setIsLoadingColors] = useState(false);

  useEffect(() => {
    if (!getItemColor || items.length === 0) {
      return;
    }

    // Only fetch colors for items we don't already have
    const itemsToFetch = items.filter((item) => !colorMap[item.name]);
    
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
            return { name: item.name, color: DEFAULT_COLOR };
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
  }, [items, getItemColor, colorMap]);

  return { colorMap, isLoadingColors };
}
