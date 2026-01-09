"use client";

import { useMemo } from "react";
import { getItemColorFunction } from "./colors";

/**
 * Hook to get the appropriate color fetching function based on item type.
 * This is the client-side wrapper around the color logic in colors.ts.
 */
export function useItemColor(colorType?: string) {
  return useMemo(() => {
    return getItemColorFunction(colorType);
  }, [colorType]);
}
