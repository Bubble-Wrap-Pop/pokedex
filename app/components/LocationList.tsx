"use client";

import { useCallback } from "react";
import SearchableList from "./SearchableList";
import { getRegionColor } from "../lib/regionColors";
import { API_ENDPOINTS } from "../lib/constants";

type ListItem = { name: string };

interface LocationListProps {
  title: string;
  items: ListItem[];
  hrefPattern: string;
  titleSize?: "large" | "medium";
  itemsPerPage?: number;
}

export default function LocationList({
  title,
  items,
  hrefPattern,
  titleSize = "large",
  itemsPerPage,
}: LocationListProps) {
  const getLocationItemColor = useCallback(async (name: string): Promise<string> => {
    try {
      const response = await fetch(`${API_ENDPOINTS.LOCATION}/${name}`);
      if (!response.ok) {
        return "from-gray-400 to-gray-500";
      }
      
      const location = await response.json();
      
      // Get region from location data
      if (location.region && location.region.name) {
        return getRegionColor(location.region.name);
      }
      return "from-gray-400 to-gray-500";
    } catch {
      return "from-gray-400 to-gray-500";
    }
  }, []);

  return (
    <SearchableList
      title={title}
      items={items}
      hrefPattern={hrefPattern}
      titleSize={titleSize}
      itemsPerPage={itemsPerPage}
      getItemColor={getLocationItemColor}
    />
  );
}
